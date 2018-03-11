import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './layout/Root';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Root />
    </AppContainer>,
    document.getElementById('app'),
  );
};

if (process.env.NODE_ENV !== 'production' && process.env.MOCK) {
  // This is only fixed in webpack 4
  // In webpack 3 it errors
  // import' and 'export' may only appear at the top level

  // import('./mock')
  //   .then(m => {
  //     console.info('loaded mock module', m);
  //     const fm = m.mock();
  //     // return import('./api').then(a => a.withMock(fm));
  //     return fm;
  //   })
  //   .then(render);

  // temporary solution
  // tslint:disable-next-line:no-var-requires
  const m = require('./mock');
  m.mock();
  render();
} else {
  render();
}

if ((module as any).hot) {
  (module as any).hot.accept('./layout/Root', render);
}
