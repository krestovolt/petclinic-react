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

import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ClickParam } from 'antd/lib/menu';
import { ISessionStore } from '@/stores/SessionStore';
import { AppStore } from './stores';
import UserMenuTitle from './components/UserMenuTitle';

export interface IAppProps<P = any> extends RouteComponentProps<P> {
	session: ISessionStore;
	onMenuClick: (ev: ClickParam) => any;
}

export default abstract class App<P = any, L extends IAppProps<P> = IAppProps<P>> extends Component<L> {
	protected app: AppStore;

	constructor(props: L, context?: any) {
		super(props, context);
		this.app = new AppStore();
		this.app.setRootBreadcrumb({
			label: 'Dashboard',
			to: '',
			icon: 'home',
			id: 'dashboard',
		});
		this.app.setTopbar([
			{
				id: 'header.user',
				to: '',
				label: <UserMenuTitle name="Foo Bar" role="Administrator" />,
				className: 'pc-user-menu',
				children: [
					{
						id: 'header.user.profile',
						to: '/user/profile',
						label: 'Profile',
					},
				],
			},
		]);
	}

	public componentDidMount() {
		const { session } = this.props;
		// subscribe to logout event
		session.addOnLogoutListener(this.logoutListener);
	}

	protected logoutListener = () => {
		// immediately go to login page when logged out
		this.props.history.replace('/auth/login');
	};

	protected onMenuClick = ({ key }: ClickParam) => {
		console.log('menu clicked', key);
	};
}
