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

import { Frest } from 'frest';
import { ISession } from '@/types';

export default class UserApi {
	private frest: Frest;

	constructor(frest: Frest) {
		this.frest = frest;
	}

	public me = async () => {
		const res = await this.frest.get<ISession>(this.path('me'));
		if (res.origin.ok && res.body) {
			return res.body;
		}
		throw new Error('Invalid response');
	};

	private path(sub: string = '') {
		return ['users', sub];
	}
}
