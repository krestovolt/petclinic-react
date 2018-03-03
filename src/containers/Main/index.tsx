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
import { Route } from 'react-router-dom';
import { inject, observer, Provider } from 'mobx-react';
import * as auth from '@/stores/auth';
import MainStore from './store';
import UserMenuTitle from './components/UserMenuTitle';
import MainLayout from './layout/Main';
import './style';

export interface IMainProps {
  authStore: auth.AuthStore;
}

@inject('authStore')
@observer
export default class Main extends Component<IMainProps> {
  private uiStore: MainStore;

  constructor(props: IMainProps) {
    super(props);
    // const { authStore } = props;
    this.uiStore = new MainStore();
    this.uiStore.setRootBreadcrumb({
      label: 'Home',
      to: '',
      icon: 'home',
      id: 'home',
    });
    this.uiStore.setTopbar([
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

  public render(): ReactNode {
    return (
      <Provider uiStore={this.uiStore}>
        <Route exact strict path="/" component={MainLayout} />
      </Provider>
    );
  }
}
