import { fromJS } from 'immutable';
import * as Redux from 'redux';
import {ReducersMapObject} from 'redux';
import { InputAction } from './actions';

import {
  INPUT_CHANGE
} from './constants';

const initialState = fromJS({

});


function inputsReducer(state = initialState, action: { type: string; value: InputAction}): ReducersMapObject {
  switch (action.type) {
    case INPUT_CHANGE:
      return state
        .set(action.value.name, action.value);
    default:
      return state;
  }
}

export default inputsReducer;
