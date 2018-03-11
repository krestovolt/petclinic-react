/**
 *    Copyright 2018 Panjie Setiawan Wicaksono
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

import React, {
  Component,
  ComponentType,
  ReactNode,
  ChildContextProvider,
  ClassAttributes,
  ValidationMap,
} from 'react';
import PropTypes from 'prop-types';
import { toJS, extendObservable, action, runInAction, observable } from 'mobx';
import AsyncValidator, {
  Descriptor,
  DescriptorObject,
  DescriptorFnObject,
  ValidatorCb,
  ValidationError,
} from 'async-validator';
import set from 'lodash/set';
import get from 'lodash/get';
import has from 'lodash/has';
import { getValueFromEvent } from './utils';
import * as t from './types';

const DEFAULT_VALIDATE_TRIGGER = 'onChange';
const DEFAULT_TRIGGER = DEFAULT_VALIDATE_TRIGGER;

export interface FormContext {
  form: t.WrappedForm;
  defaultItemProps: any;
  displayDefaultLabel: boolean;
}

export function createForm<
  S extends t.FormStore = t.FormStore,
  P extends t.FormHOCProps<S> = t.FormHOCProps<S>
>(opts: t.CreateFormOption<S> = {}): t.FormDecorator<S, P> {
  const {
    store: gStore,
    prefix = '',
    defaultItemProps = {},
    displayDefaultLabel = true,
  } = opts;

  return (WrappedComponent: ComponentType<P & ClassAttributes<any>>) =>
    class WrapForm extends Component<
      Omit<P, keyof t.FormHOCProps> & t.FormHOCPropsExtra<S>
    > implements t.WrappedForm<S>, ChildContextProvider<FormContext> {
      public static childContextTypes: ValidationMap<any> = {
        form: PropTypes.object,
        defaultItemProps: PropTypes.object,
        displayDefaultLabel: PropTypes.bool,
      };

      private store: t.FormStore = {};
      private errors = observable.map<ValidationError[]>();
      private fieldOptions: t.FieldOptions = {};

      public render(): ReactNode {
        this.fieldOptions = {};
        return (
          <WrappedComponent
            {...this.props}
            form={this}
            ref={this.props.rootRef}
          />
        );
      }

      public validateFields = (
        callback?: (fields: any) => any,
      ): Promise<any> => {
        const needValidateName: string[] = [];
        const descriptor: Descriptor = Object.keys(this.fieldOptions).reduce(
          (o, name) => {
            const { rules } = this.fieldOptions[name];
            if (rules) {
              needValidateName.push(name);
              o[name] = rules;
            }
            return o;
          },
          {},
        );
        const validator = new AsyncValidator(descriptor);
        return new Promise((res, rej) => {
          const values = toJS(this.getTargetFields());
          // flatten values that need validate
          const flattenValue = needValidateName.reduce((o, cur) => {
            o[cur] = this.getField(cur);
            return o;
          }, {});
          validator.validate(
            flattenValue,
            action<ValidatorCb>('validateFields', (_, fields) => {
              this.errors.merge(fields);
              if (fields) {
                callback ? callback(fields) : rej(fields);
              } else {
                res(values);
              }
            }),
          );
        });
      };

      public getFieldError = (name: string): any => {
        return this.errors.get(name);
      };

      public getFieldsError = (): any => {
        return this.errors.toJS();
      };

      public getStore = (): S => {
        return (this.props.store as any) || gStore || this.store;
      };

      public getFieldProps = (name: string, custom: t.FieldOption = {}) => {
        const store = this.getStore();
        const options = (store.__options && store.__options[name]) || {};
        const fieldOption = {
          valueFromEvent: getValueFromEvent,
          name,
          valuePropName: 'value',
          trigger: DEFAULT_TRIGGER,
          validateTrigger: DEFAULT_VALIDATE_TRIGGER,
          appendProps: {},
          ...options,
          ...custom,
        };

        const {
          trigger,
          validateTrigger,
          valuePropName,
          parseValue,
          appendProps,
          initialValue,
        } = fieldOption;

        const path = prefix ? `${prefix}.${name}` : name;

        if (!has(store, path)) {
          extendObservable(store, set({}, path, initialValue));
        }

        const value = this.getField(name);
        this.fieldOptions[name] = fieldOption;

        const props = {
          [valuePropName]: parseValue ? parseValue(value) : toJS(value),
          [trigger]: this.createHandler(
            fieldOption,
            validateTrigger === trigger,
          ),
          ['data-field-name']: name,
          ...appendProps,
        };

        if (validateTrigger !== trigger) {
          props[validateTrigger] = this.createValidateHandler(fieldOption);
        }
        return props;
      };

      public getResetErrors = () => {
        return this.errors.keys().reduce((o, name) => {
          o[name] = [];
          return o;
        }, {});
      };

      public getChildContext = (): FormContext => {
        return { form: this, defaultItemProps, displayDefaultLabel };
      };

      private getTargetFields = () => {
        const store = this.getStore();
        return prefix ? get(store, prefix) : store;
      };

      private getField = (path: string, defaultValue?: any) => {
        const store = this.getStore();
        return get(store, prefix ? `${prefix}.${path}` : path, defaultValue);
      };

      private setField = (path: string, value: any) => {
        const store = this.getStore();
        return runInAction('setField', () =>
          set(store, prefix ? `${prefix}.${path}` : path, value),
        );
      };

      private validateField = (
        name: string,
        value: any,
        rules?: DescriptorObject | Array<DescriptorFnObject & DescriptorObject>,
      ) => {
        if (!rules) {
          return;
        }
        const validator = new AsyncValidator({ [name]: rules });
        validator.validate(
          { [name]: value },
          action<ValidatorCb>('validateField', (err, _) => {
            this.errors.set(name, err || []);
          }),
        );
      };

      private createHandler = (
        { name, onChange, rules, valueFromEvent }: t.FieldOption,
        needValidate = false,
      ) => {
        return (...params: any[]) => {
          const value = valueFromEvent(...params);
          if (onChange) {
            onChange(value);
          }
          if (needValidate) {
            this.validateField(name, value, rules);
          }
          this.setField(name, value);
        };
      };

      private createValidateHandler = ({
        name,
        rules,
        valueFromEvent,
      }: t.FieldOption) => {
        return (...params: any[]) => {
          const value = valueFromEvent(...params);
          this.validateField(name, value, rules);
        };
      };
    };
}
