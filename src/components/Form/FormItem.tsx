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

import React, { Children, Component, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/es/form';
import * as t from './types';
import { checkIsRequired } from './utils';

@observer
export default class FormItem extends Component<
  FormItemProps & { disabledValidate?: boolean }
> {
  public render(): ReactNode {
    let fieldOption: t.FieldOption | null = null;
    const children = Children.toArray(this.props.children);
    for (const child of children) {
      if (typeof child !== 'string' && typeof child !== 'number') {
        const childFieldOption = this.context.form.fieldOptions[
          child.props && child.props['data-field-name']
        ];
        if (childFieldOption && typeof childFieldOption === 'object') {
          fieldOption = childFieldOption;
          break;
        }
      }
    }

    const appendProps: FormItemProps = {};
    if (fieldOption) {
      const name = fieldOption.name;

      // display default label ?
      if (this.context.displayDefaultLabel && this.props.label === undefined) {
        appendProps.label = name;
      }

      // set validate status
      if (!this.props.disabledValidate) {
        const err = this.context.form.errors.get(name);
        if (err) {
          appendProps.validateStatus = err.length > 0 ? 'error' : 'success';
        }
        appendProps.required = checkIsRequired(fieldOption.rules);
        appendProps.help =
          appendProps.validateStatus === 'error' &&
          err.map(({ message }: any) => message).join(' ');
      }
    }

    return (
      <Form.Item
        {...this.context.defaultItemProps}
        {...appendProps}
        {...this.props}
      />
    );
  }
}
