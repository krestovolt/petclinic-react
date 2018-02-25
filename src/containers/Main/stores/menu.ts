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

export interface IMenu {
  children?: IMenu[];
  className?: string;
  exact?: boolean;
  group?: boolean;
  key: string;
  label: ReactNode;
  to: string | Location;
}

export const Menu: t.Store<IMenu> = types.model('Menu', {
  children: types.array(types.late(() => Menu)),
  className: '',
  exact: true,
  group: false,
  key: '',
  label: '',
  to: '',
});
