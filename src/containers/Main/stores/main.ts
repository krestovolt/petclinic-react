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
import { Breadcrumb, IBreadcrumb } from './breadcrumb';
import { ISideBar, ISideBarAction, SideBarStore } from './sidebar';

export interface IMain {
  breadcrumb: IBreadcrumb[];
  sidebar: t.StoreInst<ISideBar, ISideBarAction>;
  title: string;
}

export interface IMainAction {
  setTitle(title?: string): void;
  pushBreadcrumb(item: IBreadcrumb): void;
  popBreadcrumb(): void;
  setRootBreadcrumb(item: IBreadcrumb): void;
}

export const MainStore: t.Store<IMain, IMainAction> = types
  .model('Main', {
    breadcrumb: types.array(Breadcrumb),
    sidebar: SideBarStore,
    title: '',
  })
  .actions(self => ({
    setTitle(title: string = '') {
      self.title = title;
      document.title = `Pet Clinic${title.length === 0 ? '' : ' - '}${title}`;
    },

    pushBreadcrumb(item: IBreadcrumb) {
      self.breadcrumb.push(Breadcrumb.create(item));
    },

    popBreadcrumb() {
      if (self.breadcrumb.length > 1) {
        self.breadcrumb.pop();
      }
    },

    setRootBreadcrumb(item: IBreadcrumb) {
      self.breadcrumb[0] = Breadcrumb.create(item);
    },
  }));

// var MyModel = types.model({
//   hello: types.array(
//     types.model({
//       foo: types.model({
//         bar: types.string,
//         doh: types.string
//       }).actions(self => ({
//         fooDah() {}
//       })),
//       type: types.number,
//       longitude: types.number,
//       tags: types.array(types.string),
//       friends: types.array(
//         types.model({
//           id: types.number,
//           name: types.string
//         })
//       )
//     })
//   )
// });

// MyModel.create({}).hello[0].foo.
