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

import React, { Component, ReactNode } from 'react';
import { /* Route,  */RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'antd';
import { ISessionStore } from '@/stores/SessionStore';

export interface AuthProps extends RouteComponentProps<any> {
  session: ISessionStore;
}

export class Auth extends Component<AuthProps> {
  public render(): ReactNode {
    return (
      <Row className="pc-auth" type="flex" justify="center" align="middle">
        <Col className="pc-auth-box" xs={24} sm={16} md={12} lg={10}>
          <h1>Hello</h1>
        </Col>
      </Row>
    );
  }
}

export default inject('session')(observer(Auth));
