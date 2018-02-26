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

import { action, observable } from 'mobx';
import { ICommonStore, ICommonStoreAction } from '@/types';
import { setter, toggle } from '@/utils/decorators';
import { IBreadcrumb } from './breadcrumb';
import { IMenu } from './menu';

export interface IUIStore extends ICommonStore {
  readonly breadcrumb: IBreadcrumb[];
  readonly sidebar: IMenu[];
  readonly sidebarCollapsed: boolean;
  readonly title: string;
  breadcrumbPop(): void;
  breadcrumbAdd(item: IBreadcrumb): void;
  setRootBreadcrumb(item: IBreadcrumb): void;
  setTitle(title?: string): void;
}

class UIStore implements IUIStore {
  @setter('loadingStart', true)
  @setter('loadingStop', false)
  @observable
  public loading: boolean = false;

  @setter
  @observable
  public breadcrumb: IBreadcrumb[] = [];

  @setter
  @observable
  public sidebar: IMenu[] = [];

  @toggle('sidebarToggle')
  @setter('sidebarOpen', false)
  @setter('sidebarCollapse', true)
  @observable
  public sidebarCollapsed: boolean = false;

  @observable public title: string = '';

  @action
  public breadcrumbPop = () => {
    this.breadcrumb.pop();
  };

  @action
  public breadcrumbAdd = (item: IBreadcrumb) => {
    this.breadcrumb.push(item);
  };

  @action
  public setRootBreadcrumb = (item: IBreadcrumb) => {
    this.breadcrumb[0] = item;
  };

  @action
  public setTitle = (title: string = '') => {
    this.title = title;
  };
}

interface UIStore extends IUIStore, ICommonStoreAction {
  setBreadcrumb(breadcrumbs: IBreadcrumb[]): void;
  setSidebar(sidebar: IMenu[]): void;
  sidebarToggle(): void;
  sidebarOpen(): void;
  sidebarCollapse(): void;
}

export { UIStore };
