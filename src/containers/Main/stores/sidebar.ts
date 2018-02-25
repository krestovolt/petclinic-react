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

import { types } from 'mobx-state-tree';
import * as t from '@/types';
import { IMenu, Menu } from './menu';

export interface ISideBar {
  collapsed: boolean;
  items: IMenu[];
}

export interface ISideBarAction extends t.IKVFunc {
  toggle(): void;
  open(): void;
  collapse(): void;
}

export const SideBarStore: t.Store<ISideBar, ISideBarAction> = types
  .model('Sidebar', {
    collapsed: types.boolean,
    items: types.array(Menu),
  })
  .actions(self => ({
    toggle() {
      self.collapsed = !self.collapsed;
    },
    open() {
      self.collapsed = false;
    },
    collapse() {
      self.collapsed = true;
    },
  }));
