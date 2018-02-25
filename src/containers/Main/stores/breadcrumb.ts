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

import { ReactNode } from 'react';
import { types } from 'mobx-state-tree';
import { Location } from 'history';
import * as t from '@/types';

/**
 * Breadcrumb type.
 *
 * @author Panjie SW <panjie@panjiesw.com>
 * @export
 * @interface IBreadcrumb
 */
export interface IBreadcrumb {
  /**
   * CSS class name for this breadcrumb item
   */
  className?: string;
  /**
   * The icon to display alongside the label
   *
   */
  icon?: string;
  /**
   * The label of this breadcrumb item. It can be a react component/element
   *
   */
  label: ReactNode;
  /**
   * The location to navigate when this item is clicked.
   * Pass an empty string to render it as un-navigable item.
   */
  to: string | Location;
}

/**
 * Breadcrumb is used to show hierarchy of Main content. It's displayed
 * in the ContentTop component.
 *
 * This is the model of one breadcrumb item with type IBreadcrumb.
 *
 * Main store holds a collection of this instance as well as
 * methods to manipulate them.
 *
 * Sub route of Main will manipulate this via Main store to display
 * correct hierarchy.
 */
export const Breadcrumb: t.Store<Readonly<IBreadcrumb>> = types.model(
  'Breadcrumb',
  {
    className: '',
    icon: '',
    label: '',
    to: '',
  },
);
