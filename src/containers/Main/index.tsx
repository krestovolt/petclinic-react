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
import { Provider } from 'mobx-react';
import * as t from '@/types';
import * as stores from './stores';
import MainLayout from './Main';

export default class Main extends Component {
  private mainStore: t.StoreInst<stores.IMain, stores.IMainAction>;

  constructor(props: any) {
    super(props);
    this.mainStore = stores.Main.create({
      breadcrumb: [{ label: 'Home', to: '', icon: 'home' }],
      sidebar: { collapsed: false, items: [] },
    });
  }

  public render(): ReactNode {
    return (
      <Provider mainStore={this.mainStore}>
        <Route exact strict path="/" component={MainLayout} />
      </Provider>
    );
  }
}
