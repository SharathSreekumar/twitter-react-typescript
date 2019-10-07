import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './container/Root';
// import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/store';

const store = configureStore();

/* store.subscribe(() => {
}); */

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
