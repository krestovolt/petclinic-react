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

// various utility interfaces

import { IModelType, ISnapshottable, IStateTreeNode } from 'mobx-state-tree';

export interface IKV<V = any> {
  [index: string]: V;
}

// tslint:disable-next-line:ban-types
export interface IKVFunc extends IKV<Function> {}

export type Store<M = any, A = M> = IModelType<
  Partial<{ [K in keyof M]: any }>,
  A & M
>;

export type StoreInst<M = any, A = M> = A &
  M &
  IStateTreeNode &
  ISnapshottable<Partial<M>>;
