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

import { DescriptorObject, DescriptorFnObject } from 'async-validator';

const isTargetCheckbox = (inp: EventTarget): inp is HTMLInputElement => {
  return (inp as HTMLInputElement).type === 'checkbox';
};

export function getValueFromEvent(e?: any) {
  if (!e || !e.target) {
    return e;
  }
  const { target } = e;
  return isTargetCheckbox(target) ? target.checked : target.value;
}

export function checkIsRequired(
  rules?: DescriptorObject | Array<DescriptorFnObject & DescriptorObject>,
) {
  if (rules) {
    if (Array.isArray(rules)) {
      return rules.filter(({ required }) => required).length > 0;
    }
    return !!rules.required;
  }
  return false;
}
