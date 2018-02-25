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

import { flow, types, getEnv } from 'mobx-state-tree';
import * as a from '@/api';
import * as t from '@/types';

import { Session } from './session';

export interface IAuth extends t.ICommonStore {
  isAuthenticated: boolean;
  session: a.ILoginResponse;
}

export interface IAuthAction extends t.ICommonStoreAction {
  login(payload: a.ILoginPayload): Promise<void>;
}

export interface IAuthEnv {
  api: a.AuthApi;
}

export const Auth: t.Store<Readonly<IAuth>, IAuthAction> = types
  .model({
    isAuthenticated: false,
    loading: false,
    session: Session,
  })
  .actions(self => {
    const { api } = getEnv<IAuthEnv>(self);
    const login = flow(function*(payload: a.ILoginPayload) {
      const result: a.ILoginResponse = yield api.login(payload);
      self.session = result;
    });

    return {
      setLoading(loading: boolean = true) {
        self.loading = loading;
      },
      login,
    };
  });
