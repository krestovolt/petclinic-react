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
import { Module } from 'react-universal-component';
import { ILoginResponse } from '@/api';
import { IAuthStore } from '@/stores/auth';

function subdomain() {
  const parts = window.location.host.split('.');
  return parts.length === 3 ? parts[0] : '';
}

function roleAuthorized(role: string, session: ILoginResponse) {
  const authorized = session.role === `ROLE_${role.toUpperCase()}`;
  if (process.env.NODE_ENV === 'production') {
    return authorized && subdomain() === role;
  }
  return authorized;
}

export default function mainLoader(
  authStore: IAuthStore,
): Promise<Module<RouteComponentProps<any>>> {
  console.info('loader - loading Layout component');
  if (authStore.session && authStore.authenticated) {
    console.info('loader - user authenticated, determining Layout to use');
    if (roleAuthorized('admin', authStore.session)) {
      console.info('loader - loading Admin component');
      return import('./layout/Admin').then(r => {
        console.info('loader - loaded Admin component');
        return r;
      });
    }
  }
  return Promise.reject('Not logged in');
}
