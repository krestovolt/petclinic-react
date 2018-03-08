import React, { Component, ReactNode } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import { AuthStore, IAuthStore } from '@/stores/auth';
import DevTools from '@/components/DevTools';
import ProtectedRoute from '@/components/ProtectedRoute';
import LazyRoute from '@/components/LazyRoute';
import mainLoader from '@/containers/Main/loader';
import authLoader from '@/containers/Auth/loader';

useStrict(true);

export default class Root extends Component {
  private authStore: IAuthStore;

  constructor(props: any) {
    super(props);
    this.authStore = new AuthStore();
  }

  public render(): ReactNode {
    return (
      <>
        <Provider authStore={this.authStore}>
          <Router>
            <Switch>
              <LazyRoute exact strict path="/auth/login" loader={authLoader} />
              <ProtectedRoute
                exact
                strict
                path="/"
                authStore={this.authStore}
                loader={mainLoader}
              />
            </Switch>
          </Router>
        </Provider>
        <DevTools position={{ bottom: 20, right: 20 }} />
      </>
    );
  }
}
