import { createSelector } from 'reselect';
import * as immutable from 'immutable';

export interface IState extends immutable.Iterable<string, {}> {
  get: (k: string) => React.ComponentState
}

const selectHomePage = (state: IState) => state.get('homePage');
const selectShow = (state: IState) => state.get('showModal');

const makeSelectHomePage = (state: IState) => createSelector(
  selectHomePage,
  (substate: any) => substate.toJS()
);

const makeSelectName = (state: IState) => createSelector(
  selectHomePage,
  (substate: any) => substate.toJS()
);

export {
  makeSelectHomePage,
  makeSelectName
};
