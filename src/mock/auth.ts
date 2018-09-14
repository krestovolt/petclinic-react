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
import { ROLE_OWNER } from '@/stores';
import { subdomain } from '@/utils';
import * as path from './path';
import { users } from './user';
import { jsonRes } from './utils';

let savedSession: any = null;

export const mockAuth = (fm: typeof fetchMock) => {
	fm
		.post(`${path.LOGIN}/${subdomain()}`, (url, opts: RequestInit) => {
			if (opts.body) {
				const body = JSON.parse(opts.body as string);
				let role = subdomain();
				role = role.length === 0 ? ROLE_OWNER : role;
				const _session = users.find(u => u.email === body.email && u.role === role);
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
