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
import { jsonRes } from './utils';

export const roles = [
  {
    id: 1,
    name: 'ROLE_ADMIN',
  },
  {
    id: 2,
    name: 'ROLE_VET',
  },
  {
    id: 3,
    name: 'ROLE_OWNER',
  },
];

export const mockRoles = (fm: typeof fetchMock) => {
  fm.get(path.ROLE, jsonRes(roles));
  roles.forEach(role => {
    fm.get(`${path.ROLE}/${role.id}`, jsonRes(role));
  });
};
