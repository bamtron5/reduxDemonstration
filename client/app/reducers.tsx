import * as immutable from 'immutable';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as Redux from 'redux';

import modalReducer from './containers/Home/reducer';
import formsReducer from './components/Form/reducer';
import dropDownReducer from './components/DropDown/reducer';

const routeInitialState = fromJS({
  location: null
});

function routeReducer(state = routeInitialState, action: Redux.AnyAction) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload
      });
    default:
      return state;
  }
}

export default function createReducer(injectedReducers?: Redux.ReducersMapObject) {
  return combineReducers({
    route: routeReducer,
    homePage: modalReducer,
    forms: formsReducer,
    dropDown: dropDownReducer
  });
}
