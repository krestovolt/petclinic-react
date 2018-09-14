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
import { strings } from '@/utils';

export function invokedWithArgs(args: any) {
	return args.length !== 3 || typeof args[0] !== 'object' || typeof args[1] !== 'string' || typeof args[2] !== 'object';
}

export function decorate(wa: boolean, decorator: any, args: any) {
	return wa ? decorator : decorator(...args);
}

export function setterName(property: string, prefix: string = 'set') {
	return `${prefix}${strings.capitalize(property)}`;
}
