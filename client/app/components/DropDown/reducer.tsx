import { fromJS } from 'immutable';
import * as Redux from 'redux';
import {ReducersMapObject} from 'redux';
import { IOption, ISelectAction } from './interface';

import {
  CHANGE_OPTION,
} from './constants';

const initialState = fromJS({
  selectedOption: ''
});

function dropDownReducer(state = initialState, action: ISelectAction): ReducersMapObject {
  switch (action.type) {
    case CHANGE_OPTION:
      return state
        .set('selectedOption', action.option.label);
    default:
      return state;
  }
}

export default dropDownReducer;
