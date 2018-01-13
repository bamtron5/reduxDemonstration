import * as immutable from 'immutable';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as Redux from 'redux';

const routeInitialState = fromJS({
  location: null
});

function routeReducer(state = routeInitialState, action: Redux.AnyAction) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

export default function createReducer(injectedReducers?: Redux.ReducersMapObject) {
  return combineReducers({
    route: routeReducer,
    ...injectedReducers
  });
}
