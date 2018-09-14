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
import faker from 'faker';
import * as path from './path';
import { roles } from './role';
import { jsonRes } from './utils';
import { getSession } from './auth';

export const users: any[] = [
	{
		id: 1,
		email: 'admin@example.com',
		role: roles[0],
		firstName: faker.name.firstName(0),
		lastName: faker.name.lastName(0),
	},
	{
		id: 2,
		email: 'vet@example.com',
		role: roles[1],
		firstName: faker.name.firstName(0),
		lastName: faker.name.lastName(0),
	},
	{
		id: 3,
		email: 'owner@example.com',
		role: roles[2],
		firstName: faker.name.firstName(0),
		lastName: faker.name.lastName(0),
	},
];

export const mockUsers = (fm: typeof fetchMock) => {
	fm.get(path.USER, jsonRes(roles));
	roles.forEach(user => {
		fm.get(`${path.USER}/${user.id}`, jsonRes(user));
	});
	fm.get(`${path.USER}/me`, () => {
		const session = getSession();
		if (session) {
			return jsonRes(session);
		}
		return { status: 401 };
	});
};
