import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Root />
    </AppContainer>,
    document.getElementById('app'),
  );
};

if (process.env.MOCK) {
  import('./mock')
    .then(m => {
      console.info('loaded mock module', m);
      const fm = m.mock();
      // return import('./api').then(a => a.withMock(fm));
      return fm;
    })
    .then(render);
} else {
  render();
}

if ((module as any).hot) {
  (module as any).hot.accept('./containers/Root', render);
}
