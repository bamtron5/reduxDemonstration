import * as React from 'react';
import * as Redux from 'redux';
import { Children } from 'react';
import * as PropTypes from 'prop-types';
import { isEmail } from 'validator';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { IFlex } from './../../theme/flexbox.interface';
import { IOption } from './../DropDown/interface';
import { IState } from './selectors';

import injectReducer from './../../util/injectReducer';

import { checkValidation, InputAction } from './actions';
import { makeSelectInputs } from './selectors';
import reducer from './reducer';

import Wrapper from './Wrapper';

interface InputDispatch {
  onKeyChange?: (value: InputAction) => Redux.Dispatch<() => void>;
  inputs?: any; // InputAction [key:string]
}

export interface InputProps extends InputDispatch {
  flex?: IFlex;
  name: string;
  options: [{
    label: string;
    value: string | null | number | boolean;
  }];
  type: string;
  required?: boolean;
  onChange?: (evt: any) => void;
  placeholder?: string;
  onSelect?: (selectedOption: IOption) => Redux.Dispatch<() => void>;
  validation?: boolean;
}

interface IValidator {
  message: string;
  isValid: boolean;
}


export class Input extends React.Component<InputProps> {
  onChange = null; // THIS IS THE COMBINED LISTENERS FROM PROPS AND VALIDATION
  initialValidation = true;

  constructor(props) {
    super(props);
    this.inputHandler = this.inputHandler.bind(this);
    this.setup();
  }

  setup() {
    if (this.props.validation) {
      this.onChange = this.inputHandler;
    } else if (this.props.onChange) {
      this.onChange = this.props.onChange;
    }
  }

  inputHandler(e: React.SyntheticEvent<InputProps>){
    const evt = e;
    if (this.props.onChange) {
      this.props.onChange(evt);
    }

    switch (this.props.type) {
      case 'email':
        this.emailValidator(evt);
        break;
      default:
        break;
    }
  }

  emailValidator(e: React.SyntheticEvent<InputProps>){
    this.props.onKeyChange({
      name: e.target['name'],
      value: e.target['value'],
      valid: isEmail(e.target['value']),
      message: `${e.target['value'] ? e.target['value'] : 'this'} is not a valid email`
    });
  }

  printValidation() {
    if (this.props.validation && this.props.inputs[this.props.name]) {
      const msg = (<span className="warn validationMsg">{this.props.inputs[this.props.name].message}</span>);
      return this.props.inputs[this.props.name].valid ? null : msg;
    } else {
      return;
    }
  }

  render() {
    const attrs = {
      'aria-label': this.props.options[0].label,
      type: this.props.type,
      name: this.props.name,
      placeholder: this.props.options[0].label
    };

    return (
      <Wrapper>
        <input {...attrs} onChange={this.onChange} required={this.props.required}/>
        {this.printValidation()}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: IState) => createStructuredSelector({
  inputs: makeSelectInputs(state)
});

function mapDispatchToProps(dispatch: any) {
  const dispatchToProps: InputDispatch = {
    onKeyChange: (value: InputAction) => dispatch(checkValidation(value))
  };
  return dispatchToProps;
}

const withReducer = injectReducer({ key: 'inputs', reducer });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const composed = compose<React.ComponentClass<InputProps>>(
  withReducer,
  withConnect
);

export default composed(Input);
