import * as invariant from 'invariant';
import {Store, Reducer, ReducersMapObject} from 'redux';
import { isObject, isFunction, conformsTo , isString, isEmpty } from 'lodash';

import checkStore from './checkStore';
import createReducer from '../reducers';

// TODO Polyfill core-js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
// No support IE or safari
declare var Reflect:any;

declare interface IStore extends Store<{}>{
  injectedReducers: ReducersMapObject;
}

export function injectReducerFactory(store: IStore, isValid: boolean) {
  return function injectReducer(key: string, reducer: Reducer<{}>) {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function'
    );

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export default function getInjectors(store: IStore) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
