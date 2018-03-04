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

export interface ILoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ILoginResponse {
  id: number;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

export default class AuthApi {
  constructor(private frest: Frest) {}

  public login = async (body: ILoginPayload) => {
    const res = await this.frest.post<ILoginResponse>(this.path('login'), {
      body,
    });
    if (res.origin.ok && res.body) {
      return res.body;
    }
    throw new Error('Invalid response');
  };

  public logout = () => this.frest.post<{}>(this.path('logout'));

  private path(sub: string = '') {
    return ['auth', sub];
  }
}
