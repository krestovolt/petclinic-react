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

import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { IAuthStore } from '@/stores/auth';
import LazyRoute, { LazyRouteProps } from './LazyRoute';

const RedirectLogin: any = withRouter((props: any) => {
  return (
    <Redirect
      to={{ pathname: '/auth/login', state: { from: props.location } }}
    />
  );
});

export interface ProtectedRouteProps extends LazyRouteProps {
  authStore: IAuthStore;
}

export default class ProtectedRoute extends LazyRoute<ProtectedRouteProps> {
  constructor(props: ProtectedRouteProps, context?: any) {
    super(props, context, () => {
      console.info('ProtectedRoute - loading protected component')
      return props.authStore
      .loadSession()
      .then(_ => props.loader(props.authStore))
      .catch(_ => RedirectLogin)
    },
    );
  }
}
