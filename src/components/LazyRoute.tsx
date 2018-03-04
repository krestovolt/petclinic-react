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

import React, { ComponentType, PureComponent, ReactNode } from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import universal, { Module } from 'react-universal-component';

export interface LazyRouteProps extends RouteProps {
  loading?: ComponentType<any>;
  loader(): Promise<Module<RouteComponentProps<any>>>;
}

export default class LazyRoute extends PureComponent<LazyRouteProps> {
  private LazyComponent: ComponentType<RouteComponentProps<any>>;

  constructor(props: LazyRouteProps, context?: any) {
    super(props, context);
    const { loader, loading } = this.props;

    this.LazyComponent = universal<RouteComponentProps<any>, any>(
      () => loader(),
      {
        minDelay: 200,
        loading,
      },
    );
  }

  public render(): ReactNode {
    const { loader, ...rest } = this.props;

    return <Route {...rest} render={this.doRender} />;
  }

  private doRender = (props: any) => <this.LazyComponent {...props} />;
}
