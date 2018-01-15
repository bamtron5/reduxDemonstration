import { fromJS } from 'immutable';
import * as Redux from 'redux';
import {ReducersMapObject} from 'redux';

import {
  TOGGLE_MODAL,
  NAME_CHANGE
} from './constants';

const initialState = fromJS({
  showModal: false,
  name: ''
});

export interface ModalActions extends Redux.Action {
  show: string;
  name: string;
}

function modalReducer(state = initialState, action: ModalActions): ReducersMapObject {
  switch (action.type) {
    case TOGGLE_MODAL:
      return state
        .set('showModal', action.show);
    case NAME_CHANGE:
      return state
        .set('name', action.name)
    default:
      return state;
  }
}

export default modalReducer;
