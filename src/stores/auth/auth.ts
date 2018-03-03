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

import { IResponse } from 'frest';
import { action, observable } from 'mobx';
import * as a from '@/api';
import { ICommonStore, ICommonStoreAction } from '@/types';

export interface IAuthStore extends ICommonStore, ICommonStoreAction {
  readonly authenticated: boolean;
  readonly session: a.ILoginResponse | null;
  login(payload: a.ILoginPayload): Promise<a.ILoginResponse>;
  logout(): Promise<void>;
  addOnLogoutListener(listener: OnLogoutListener): void;
}

export type OnLogoutListener = (res: IResponse<{}>) => void;

export class AuthStore implements IAuthStore {
  @observable public loading: boolean = false;

  @observable public authenticated = false;

  @observable public session: a.ILoginResponse | null = null;

  private listeners: OnLogoutListener[] = [];

  constructor(private api: a.AuthApi = a.auth) {}

  @action
  public loadingStart = () => {
    this.loading = true;
  };

  @action
  public loadingStop = () => {
    this.loading = false;
  };

  public login = async (payload: a.ILoginPayload) => {
    this.loadingStart();
    try {
      const result = await this.api.login(payload);
      this.setSession(result);
      this.setAuthenticated();
      return result;
    } finally {
      this.loadingStop();
    }
  };

  public logout = async () => {
    this.loadingStart();
    try {
      const res = await this.api.logout();
      this.listeners.forEach(listener => listener(res));
      this.doLogout();
    } finally {
      this.loadingStop();
    }
  };

  public addOnLogoutListener(listener: OnLogoutListener) {
    this.listeners.push(listener);
  }

  @action
  private setAuthenticated(val: boolean = true) {
    this.authenticated = val;
  }

  @action
  private setSession(session: a.ILoginResponse | null) {
    this.session = session;
  }

  @action
  private doLogout() {
    this.listeners = [];
    this.setSession(null);
    this.setAuthenticated(false);
  }
}
