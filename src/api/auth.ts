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
import { subdomain } from '@/utils';

export interface ILoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}

export default class AuthApi {
  private frest: Frest;

  constructor(frest: Frest) {
    this.frest = frest;
  }

  public login = async (body: ILoginPayload) => {
    const sub = subdomain();
    const res = await this.frest.post<ISession>(
      this.path('login', sub === '' ? 'owner' : sub),
      {
        body,
      },
    );
    if (res.origin.ok && res.body) {
      return res.body;
    }
    throw new Error('Invalid response');
  };

  public logout = () => this.frest.post<{}>(this.path('logout'));

  private path(sub: string = '', ...rest: string[]) {
    return ['auth', sub, ...rest];
  }
}
