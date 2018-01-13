import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ReducersMapObject } from 'redux';
const hoistNonReactStatics = require('hoist-non-react-statics');
import getInjectors from './reducerInjector';

declare interface IReducerInjecter {
  key: string;
  reducer: (state: {}, action: any) => ReducersMapObject;
}

export default ({ key, reducer }: IReducerInjecter) => (WrappedComponent: React.ComponentClass) => {
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
