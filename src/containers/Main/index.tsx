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
import MainContainer from './MainContainer';

export interface IMainContainerProp {
  authStore: auth.AuthStore;
}

@inject('authStore')
@observer
export default class Main extends Component {
  private uiStore: MainStore;

  constructor(props: any) {
    super(props);
    this.uiStore = new MainStore();
    this.uiStore.setRootBreadcrumb({
      label: 'Home',
      to: '',
      icon: 'home',
      id: 'home',
    });
  }

  public render(): ReactNode {
    return (
      <Provider uiStore={this.uiStore}>
        <Route exact strict path="/" component={MainContainer} />
      </Provider>
    );
  }
}