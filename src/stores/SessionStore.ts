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
import * as t from '@/types';
import { subdomain } from '@/utils';

export interface ISessionStore extends t.ICommonStore, t.ICommonStoreAction {
  readonly authenticated: boolean;
  readonly current: t.ISession;
  load(): Promise<t.ISession>;
  login(payload: a.ILoginPayload): Promise<t.ISession>;
  logout(): Promise<void>;
  addOnLogoutListener(listener: OnLogoutListener): void;
  roleAuthorized(role: string): boolean;
}

export type OnLogoutListener = (res: IResponse<{}>) => void;

export default class SessionStore implements ISessionStore {
  public static DEFAULT_SESSION: t.ISession = {
    id: -1,
    email: '',
    role: '',
  };

  @observable public loading: boolean = false;

  @observable public authenticated = false;

  @observable public current: t.ISession = { ...SessionStore.DEFAULT_SESSION };

  private listeners: OnLogoutListener[] = [];

  private api: a.AuthApi;
  private user: a.UserApi;

  constructor(
    api: a.AuthApi = a.auth,
    user: a.UserApi = a.user,
  ) {
    this.api = api;
    this.user = user;
  }

  @action
  public loadingStart = () => {
    this.loading = true;
  };

  @action
  public loadingStop = () => {
    this.loading = false;
  };

  public load = async () => {
    console.info('AuthStore#loadSession');
    this.loadingStart();
    try {
      const result = await this.user.me();
      this.setSession(result);
      this.setAuthenticated();
      return result;
    } finally {
      this.loadingStop();
    }
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

  public roleAuthorized(role: string): boolean {
    if (this.current && this.authenticated) {
      const authorized = this.current.role === `ROLE_${role.toUpperCase()}`;
      if (process.env.NODE_ENV === 'production') {
        return authorized && subdomain() === role;
      }
      return authorized;
    }
    return false;
  }

  @action
  private setAuthenticated(val: boolean = true) {
    this.authenticated = val;
  }

  @action
  private setSession(session: t.ISession) {
    this.current = session;
  }

  @action
  private doLogout() {
    this.listeners = [];
    this.setSession({ ...SessionStore.DEFAULT_SESSION });
    this.setAuthenticated(false);
  }
}
