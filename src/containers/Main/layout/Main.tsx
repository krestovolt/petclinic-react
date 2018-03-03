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
import { inject, observer } from 'mobx-react';
// import { computed } from 'mobx';
import { Layout } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { ILoginResponse } from '@/api';
import { IMainLayoutProps } from './props';
import Admin from './Admin';

class MainLayout extends Component<IMainLayoutProps> {
  // @computed
  // get session(): ILoginResponse {
  //   return this.props.authStore.session as ILoginResponse;
  // }
  private session: ILoginResponse = {
    id: 1,
    email: 'foo@bar.com',
    firstName: 'Foo',
    lastName: 'Bar',
    role: 'ROLE_ADMIN',
  };

  public componentDidMount() {
    const { authStore } = this.props;
    // subscribe to logout event
    authStore.addOnLogoutListener(this.logoutListener);
  }

  public render(): ReactNode {
    return <Layout className="pc-main">{this.renderLayout()}</Layout>;
  }

  private renderLayout(): ReactNode {
    const { children, ...others } = this.props;
    console.log('this.isAdmin()', this.isAdmin());
    if (this.isAdmin()) {
      return (
        <Admin
          {...others}
          session={this.session}
          onMenuClick={this.onMenuClick}
        />
      );
    }
    return null;
  }

  private logoutListener = () => {
    // immediately go to login page when logged out
    this.props.history.replace('/auth/login');
  };

  private onMenuClick = ({ key }: ClickParam) => {
    console.log('menu clicked', key);
  };

  private isAdmin() {
    return this.url('admin');
  }

  private isVet() {
    return this.url('vet');
  }

  private isOwner() {
    return this.url('owner');
  }

  private url(role: string) {
    const { uiStore } = this.props;
    const authorized = this.session.role === `ROLE_${role.toUpperCase()}`;
    if (process.env.NODE_ENV === 'production') {
      return authorized && uiStore.subdomain() === 'admin';
    }
    return authorized;
  }
}

export { MainLayout };
export default inject('uiStore', 'authStore')(observer(MainLayout));
