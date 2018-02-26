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

function getDecorator(
  wa: boolean,
  name?: any,
  custom?: any,
): PropertyDecorator {
  return (
    target: any,
    property: string | symbol,
    description?: PropertyDescriptor,
  ) => {
    if (!wa) {
      name = undefined;
      custom = undefined;
    }

    if (typeof name !== 'string') {
      custom = name;
      name = undefined;
    }

    name = name || setterName(property.toString());

    Object.defineProperty(target, name, {
      value: action(name, function(this: any, val: any) {
        if (custom !== undefined) {
          val = typeof custom === 'function' ? custom.call(this, val) : custom;
        }
        this[property] = val;
      }),
    });

    return description && { ...description, configurable: true };
  };
}

export default function setter(name?: any, custom?: any) {
  const wa = invokedWithArgs(arguments);
  const decorator = getDecorator(wa, name, custom);
  return decorate(wa, decorator, arguments);
}
