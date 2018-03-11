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

import React, { Component, ReactNode, FormEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Button, Form, Icon, Input } from 'antd';
import { ILoginPayload } from '@/api';
import { ISessionStore } from '@/stores/SessionStore';
import { createForm, FormItem, FormHOCProps } from '@/components/Form';
import Loading from '@/components/Loading';
import LoginForm from './stores/LoginForm';

export interface LoginProps
  extends RouteComponentProps<any>,
    FormHOCProps<LoginForm> {
  session: ISessionStore;
}

export class Login extends Component<LoginProps> {
  public render(): ReactNode {
    const { session, form } = this.props;
    const { getFieldProps } = form;
    return (
      <Loading spinning={session.loading}>
        <Form
          className="pc-auth-form"
          layout="vertical"
          onSubmit={this.handleSubmit}
        >
          {/* <FormItem className="pc-auth-form-title">

          </FormItem> */}
          <FormItem className="pc-auth-form-item" label="Email" hasFeedback>
            <Input
              prefix={<Icon type="user" style={{ fontSize: 16 }} />}
              placeholder="Email"
              type="email"
              {...getFieldProps('email')}
            />
          </FormItem>
          <FormItem className="pc-auth-form-item" label="Password" hasFeedback>
            <Input
              prefix={<Icon type="lock" style={{ fontSize: 16 }} />}
              placeholder="Password"
              type="password"
              {...getFieldProps('password')}
            />
          </FormItem>
          <FormItem className="pc-auth-action-button">
            <Button
              className="pc-auth-form-button"
              type="primary"
              htmlType="submit"
              disabled={session.loading}
            >
              Login
            </Button>
          </FormItem>
        </Form>
      </Loading>
    );
  }

  private handleSubmit: FormEventHandler<any> = async e => {
    e.preventDefault();
    const { form, session } = this.props;
    const result = await form.validateFields<ILoginPayload>(fields =>
      console.log('error', fields),
    );
    session.login(result);
  };
}

export default inject('session')(
  createForm<LoginForm, LoginProps>({ store: new LoginForm() })(
    observer(Login),
  ),
);
