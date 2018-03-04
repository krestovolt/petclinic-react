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

import fetchMock from 'fetch-mock';
import * as path from './path';
import { users } from './user';
import { jsonRes } from './utils';

let savedSession: any = null;

export const mockAuth = (fm: typeof fetchMock) => {
  fm
    .post(path.LOGIN, (_, o: RequestInit) => {
      if (o.body) {
        const body = JSON.parse(o.body as string);
        const _session = users.find(u => u.email === body.email);
        if (_session) {
          const session = { ..._session, role: _session.role.name };
          savedSession = session;
          return jsonRes(session);
        }
      }
      return jsonRes({ message: 'Invalid credentials' }, undefined, 401);
    })
    .post(path.LOGOUT, (_, __) => {
      savedSession = null;
      return { status: 200 };
    });
};

export const getSession = () => savedSession;
