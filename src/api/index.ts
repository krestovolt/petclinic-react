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
import * as json from 'frest-json';
import AuthApi from './auth';
import UserApi from './user';

export const frest = new Frest({
	base: '/api',
	interceptors: {
		before: [json.before()],
		after: [json.after()],
		error: [json.error()],
	},
});

export const auth = new AuthApi(frest);
export const user = new UserApi(frest);

export const withMock = (fetchFn: typeof fetch) => {
	frest.mergeConfig({ fetch: fetchFn });
};

export { ILoginPayload } from './auth';
export { AuthApi, UserApi };
