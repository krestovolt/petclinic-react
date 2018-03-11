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

import { ComponentType, ComponentClass, ClassAttributes, Ref } from 'react';
import { InputProps } from 'antd/es/input';
import { CheckboxProps } from 'antd/es/checkbox';
import { DescriptorObject, DescriptorFnObject } from 'async-validator';

export interface FieldOption {
  [key: string]: any;
  rules?: DescriptorObject | Array<DescriptorFnObject & DescriptorObject>;
  validateTrigger?: string;
  appendProps?: InputProps | CheckboxProps;
  initialValue?: any;
  parseValue?(value: any): any;
}

export interface FieldOptions {
  [key: string]: FieldOption;
}

export interface FormStore {
  readonly __options?: {
    [key: string]: FieldOption;
  };
}

export interface CreateFormOption<S extends FormStore = FormStore> {
  store?: S;
  prefix?: string;
  defaultItemProps?: any;
  displayDefaultLabel?: boolean;
}

export interface FormHOCProps<S extends FormStore = FormStore> {
  form: WrappedForm<S>;
}

export interface FormHOCPropsExtra<S extends FormStore = FormStore> {
  store?: S;
  rootRef?: Ref<any>;
}

export interface WrappedForm<S extends FormStore = FormStore> {
  validateFields(callback?: (fields: any) => any): Promise<any>;
  getFieldError(name: string): any;
  getFieldsError(): any;
  getStore(): S;
  getFieldProps(name: string, customFieldOption?: FieldOption): any;
}

export interface WrappedFormClass<
  S extends FormStore = FormStore,
  P extends FormHOCProps<S> = FormHOCProps<S>
> extends ComponentClass<Omit<P, keyof FormHOCProps> & FormHOCPropsExtra<S>> {}

export type FormDecorator<
  S extends FormStore = FormStore,
  P extends FormHOCProps<S> = FormHOCProps<S>
> = (
  Component: ComponentType<P & ClassAttributes<any>>,
) => WrappedFormClass<S, P>;

export type CreateFormFn<
  S extends FormStore = FormStore,
  P extends FormHOCProps<S> = FormHOCProps<S>
> = (options?: CreateFormOption<S>) => FormDecorator<S, P>;
