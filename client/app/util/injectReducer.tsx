import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ReducersMapObject } from 'redux';
const hoistNonReactStatics = require('hoist-non-react-statics');
import getInjectors from './reducerInjector';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, reducer }: {key: string; reducer: (state: {}, action: any) => ReducersMapObject}) => (WrappedComponent: React.ComponentClass) => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    static displayName = `withReducer(${(WrappedComponent.displayName || 'Component')})`;

    componentWillMount() {
      const { injectReducer } = this.injectors;

      injectReducer(key, reducer);
    }

    injectors = getInjectors(this.context.store);

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
