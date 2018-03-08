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
  loading?: ComponentType<RouteComponentProps<any>>;
  loader(...args: any[]): Promise<Module<RouteComponentProps<any>>>;
}

export default class LazyRoute<
  P extends LazyRouteProps = LazyRouteProps
> extends PureComponent<P> {
  protected LazyComponent: ComponentType<RouteComponentProps<any>>;

  constructor(
    props: P,
    context?: any,
    uniLoader = () => {
      console.info('LazyRoute - loading component')
      return props.loader();
    },
    opts = { minDelay: 200, loading: props.loading },
  ) {
    super(props, context);
    this.LazyComponent = universal<RouteComponentProps<any>>(uniLoader, opts);
  }

  public render(): ReactNode {
    const { loader, ...rest } = this.props as any;

    return <Route {...rest} render={this.doRender} />;
  }

  private doRender = (props: any) => <this.LazyComponent {...props} />;
}
