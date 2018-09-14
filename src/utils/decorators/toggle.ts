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

import { action } from 'mobx';
import { decorate, invokedWithArgs, setterName } from './utils';

function getDecorator(wa: boolean, custom?: any): PropertyDecorator {
	return (target: any, property: string | symbol, description?: PropertyDescriptor) => {
		const fnName = (wa && custom) || setterName(property.toString(), 'toggle');

		Object.defineProperty(target, fnName, {
			value: action(fnName, function(this: any) {
				this[property] = !this[property];
			}),
		});

		return description && { ...description, configurable: true };
	};
}

export default function setter(custom?: any) {
	const wa = invokedWithArgs(arguments);
	const decorator = getDecorator(wa, custom);
	return decorate(wa, decorator, arguments);
}
