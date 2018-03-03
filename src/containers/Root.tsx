import React, { Component, ReactNode } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import { AuthStore, IAuthStore } from '@/stores/auth';
import Main from '@/containers/Main';
import DevTools from '@/components/DevTools';

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
          <BrowserRouter>
            <Route exact strict path="/" component={Main} />
          </BrowserRouter>
        </Provider>
        <DevTools position={{bottom: 20, right: 20}} />
      </>
    );
  }
}
