import { createSelector } from 'reselect';
import * as immutable from 'immutable';

export interface IState extends immutable.Iterable<string, {}> {
  get: (k: string) => React.ComponentState
}

const selectDropDown = (state: IState) => state.get('dropDown');
const selectOption = (state: IState) => state.get('selectedOption');

const makeSelectDropDown = (state: IState) => {
  return createSelector(
    selectDropDown,
    selectOption,
    (substate: any) => {
      return substate.toJS().selectedOption;
    }
  );
}

export {
  makeSelectDropDown
};
