import { fromJS, Map } from 'immutable';
import * as Redux from 'redux';
import * as React from 'react';
import {ReducersMapObject} from 'redux';
import { FormAction, InputAction } from './actions';

import {
  SETUP,
  INPUT_CHANGE
} from './constants';

const initialState = Map({

});

function formsReducer(state = initialState, action: { type: string; value: any}): any {
  switch (action.type) {
    case SETUP:
      return state
        .set(action.value.get('formName'), action.value);
    case INPUT_CHANGE:
      return state
        .setIn([action.value.formName, 'inputs', action.value.name], action.value);
    default:
      return state;
  }
}

export default formsReducer;
