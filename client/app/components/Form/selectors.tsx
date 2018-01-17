import { createSelector } from 'reselect';
import * as immutable from 'immutable';
import { IDispatchedForms} from './actions';

export interface IState extends immutable.Iterable<string, {}> {
  get: (k: string) => React.ComponentState
}

const selectForms = (state: IState) => state.get('forms');

const makeSelectForms = (state: IState) => createSelector(
  selectForms,
  (substate: immutable.Map<{}, IDispatchedForms>) => substate.toJS()
);

export {
  makeSelectForms
};
