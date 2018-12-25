import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import storeConfig from './storeConfig';
import * as emptyModule from './empty-module';

import App from './containers/App';

const history = createHistory();
const mount = document.getElementById('app');
const store = storeConfig({}, history);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  mount
);

if (process.env.NODE_ENV !== 'production') {
  const showDevTools = require('./util/showDevTools').default;
  showDevTools(store);
}