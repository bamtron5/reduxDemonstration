import { fromJS } from 'immutable';
import * as Redux from 'redux';
import {ReducersMapObject} from 'redux';

import {
  TOGGLE_MODAL,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  showModal: false
});

export interface ModalActions extends Redux.Action {
  show: string;
}

function modalReducer(state = initialState, action: ModalActions): ReducersMapObject {
  switch (action.type) {
    case TOGGLE_MODAL:
      return state
        .set('showModal', action.show);
    default:
      return state;
  }
}

export default modalReducer;
