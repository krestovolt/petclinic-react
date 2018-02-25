import React, { Component, ReactNode } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './containers/Main';

export default class App extends Component {

  public render(): ReactNode {
    return (
      <BrowserRouter>
        <Route exact strict path="/" component={Main} />
      </BrowserRouter>
    );
  }
}
