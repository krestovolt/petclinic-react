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
import { Route, RouteComponentProps } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'antd';
import { ISessionStore } from '@/stores/SessionStore';
import Login from './Login';
import './style';

export interface AuthProps extends RouteComponentProps<any> {
	session: ISessionStore;
}

export class Auth extends Component<AuthProps> {
	public render(): ReactNode {
		const { match } = this.props;
		return (
			<Row className="pc-auth" type="flex" justify="center" align="middle">
				<Col className="pc-auth-box" xs={24} sm={16} md={12} lg={8}>
					<Route exact strict path={`${match.url}/login`} component={Login} />
				</Col>
			</Row>
		);
	}
}

export default hot(module)(inject('session')(observer(Auth)));
