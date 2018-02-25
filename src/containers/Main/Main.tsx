import React, { Component, ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import * as t from '@/types';
import * as stores from './stores';

export interface IMainProps extends RouteComponentProps<any> {
  mainStore: t.StoreInst<stores.IMain, stores.IMainAction>;
}

class Main extends Component<IMainProps> {
  public componentDidMount() {
    const { mainStore } = this.props;
    mainStore.setTitle('Hello');
  }

  public render(): ReactNode {
    return <h1>Hello</h1>;
  }
}

export { Main };
export default inject('mainStore')(observer(Main));
