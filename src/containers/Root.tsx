import React, { Component, ReactNode } from 'react';

export interface IRootState {
  message: string;
}

export default class Root extends Component<any, IRootState> {
  public state: IRootState = {
    message: 'Hi',
  }

  public render(): ReactNode {
    return (
      <h1>{this.state.message}</h1>
    )
  }
}
