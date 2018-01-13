import * as Redux from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import * as History from 'history';
import createReducer from './reducers';
import DevTools from './containers/DevTools';

export default function configureStore(initialState = {}, history: History.History) {
  const middlewares = [
    routerMiddleware(history)
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    DevTools.instrument()
  ];

  const store:any = createStore(
    createReducer(),
    fromJS(initialState),
    compose(...enhancers)
  );

  store['injectedReducers'] = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
