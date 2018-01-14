import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as React from 'react';
import * as Redux from 'redux';
import { Children } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';

// INTERFACE
import { IOption, DropDownProps, ISelectDispatch } from './interface';

// UTIL
import injectReducer from './../../util/injectReducer';

// REDUX PARTS
import { changeSelect } from './actions';
import reducer from './reducer';
import { makeSelectDropDown, IState } from './selectors';

// COMPONENTS
import Wrapper from './Wrapper';

var self = null;
export class DropDown extends React.Component<DropDownProps> {
  constructor(props) {
    super(props);
    self = this;
  }

  changeHandler(option: IOption) {
    self.props.onSelect(option);
  }

  render() {
    return (
      <Wrapper>
        <Select
          value={this.props.selectedOption}
          placeholder={this.props.selectedOption || this.props.placeholder || `Choose an option...`}
          options={this.props.options}
          onChange={this.changeHandler}
        />
        <input type="hidden" name={this.props.name} value={this.props.selectedOption}/>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: IState) => createStructuredSelector({
  selectedOption: makeSelectDropDown(state)
});

function mapDispatchToProps(dispatch: any) {
  const dispatchToProps: ISelectDispatch = {
    onSelect: (option: IOption) => dispatch(changeSelect(option))
  };
  return dispatchToProps;
}

const withReducer = injectReducer({ key: 'dropDown', reducer });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const composed = compose<React.ComponentClass<DropDownProps>>(
  withReducer,
  withConnect
);

export default composed(DropDown);
