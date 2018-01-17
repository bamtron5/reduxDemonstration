import * as React from 'react';
import * as Redux from 'redux';
import { Children } from 'react';
import * as PropTypes from 'prop-types';
import { isEmail, isMobilePhone } from 'validator';
import { createStructuredSelector } from 'reselect';

import { IFlex } from './../../theme/flexbox.interface';
import { IOption } from './../DropDown/interface';

import { InputAction } from './../Form/actions';

import Wrapper from './Wrapper';

export interface InputProps {
  flex?: IFlex;
  name: string;
  formName?: string;
  options: [{
    label: string;
    value: string | null | number | boolean;
  }];
  type: string;
  required?: boolean;
  onChange?: any; // string or method.  STRING OF METHOD to be specific e.g. 'watchField' for this.watchField
  placeholder?: string;
  onSelect?: (selectedOption: IOption) => Redux.Dispatch<() => void>;
  validation?: boolean;
  printedValidation?: JSX.Element | null;
  inputHandler?: any;
}

export class Input extends React.Component<InputProps> {
  onChange = null; // THIS IS THE COMBINED LISTENERS FROM PROPS AND VALIDATION
  initialValidation = true;
  delayedCallback: any;

  constructor(props) {
    super(props);
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
        <input {...attrs} onChange={this.props.inputHandler} required={this.props.required}/>
        {this.props.printedValidation}
      </Wrapper>
    );
  }
}

export default Input;
