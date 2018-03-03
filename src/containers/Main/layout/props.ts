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

import { RouteComponentProps } from 'react-router-dom';
import { ClickParam } from 'antd/lib/menu';
import { ILoginResponse } from '@/api/auth';
import {IAuthStore} from '@/stores/auth';
import MainStore from '../store';

export interface IMainLayoutProps extends RouteComponentProps<any> {
  uiStore: MainStore;
  authStore: IAuthStore;
}

export interface ILayoutProps extends IMainLayoutProps {
  session: ILoginResponse;
  onMenuClick: (ev: ClickParam) => any;
}
