import React, { Component, ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import * as auth from '@/stores/auth';
import MainStore from './store';

export interface IMainContainer extends RouteComponentProps<any> {
  uiStore: MainStore;
  authStore: auth.IAuthStore;
}

class MainContainer extends Component<IMainContainer> {
  public componentDidMount() {
    const { authStore, uiStore } = this.props;
    uiStore.setTitle('Hello');
    setTimeout(() => {
      authStore.loadingStart();
    }, 3000);
  }

  public render(): ReactNode {
    return <h1>Hello, auth loading: {`${this.props.authStore.loading}`}</h1>;
  }
}

export { MainContainer };
export default inject('uiStore', 'authStore')(observer(MainContainer));
