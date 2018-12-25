import { createSelector } from 'reselect';
import { Iterable, Map } from 'immutable-js';
import { IDispatchedForms} from './actions';

export interface IState extends Iterable<string, {}> {
  get: (k: string) => React.ComponentState
}

const selectForms = (state: IState) => state.get('forms');

const makeSelectForms = (state: IState) => createSelector(
  selectForms,
  (substate: Map<{}, IDispatchedForms>) => substate.toJS()
);

export {
  makeSelectForms
};
