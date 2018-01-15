import * as React from 'react';
import * as Redux from 'redux';
import { Children } from 'react';
import * as PropTypes from 'prop-types';
import { IFlex } from './../../theme/flexbox.interface';
import { InputProps } from './../Input/index';

import { ISelectDispatch, IOption } from './../DropDown/interface';

import Wrapper from './Wrapper';

export interface FormProps {
  onFormSubmit: (evt: Event) => void;
  name: string;
}

export interface IFormData {
  [index: string]: InputProps;
}

const Form:React.StatelessComponent<FormProps> = (props: any) => {
  return (
    <form name={props.name} onSubmit={props.onFormSubmit}>
      {Children.toArray(props.children)}
    </form>
  );
}

export default Form;
