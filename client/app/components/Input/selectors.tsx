import { createSelector } from 'reselect';
import * as immutable from 'immutable';

export interface IState extends immutable.Iterable<string, {}> {
  get: (k: string) => React.ComponentState
}

const selectInputs = (state: IState) => state.get('inputs');

const makeSelectInputs = (state: IState) => createSelector(
  selectInputs,
  (substate: any) => substate.toJS()
);

export {
  makeSelectInputs
};
