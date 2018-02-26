import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';

ReactDOM.render(
  <AppContainer>
    <Root />
  </AppContainer>,
  document.getElementById('app'),
);

if ((module as any).hot) {
  (module as any).hot.accept('./containers/Root', () => {
    ReactDOM.render(
      <AppContainer>
        <Root />
      </AppContainer>,
      document.getElementById('app'),
    );
  });
}
