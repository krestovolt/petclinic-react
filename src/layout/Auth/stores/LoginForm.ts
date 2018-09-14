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

import { observable } from 'mobx';
// import { ICommonStore, ICommonStoreAction } from '@/types';
import { FormStore, FieldOptions } from '@/components/Form';

export default class LoginForm implements FormStore {
	@observable
	public email: string = '';
	@observable
	public password: string = '';

	public get __options(): FieldOptions {
		return {
			email: {
				rules: {
					type: 'email',
					required: true,
					message: 'Please input your valid email address',
				},
			},
			password: {
				rules: {
					type: 'string',
					required: true,
					message: 'Please input your password',
				},
			},
		};
	}
}
