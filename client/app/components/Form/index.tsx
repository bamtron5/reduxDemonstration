import * as React from 'react';
import * as Redux from 'redux';
import { Children } from 'react';
import * as PropTypes from 'prop-types';
import { IFlex } from './../../theme/flexbox.interface';

import { ISelectDispatch, IOption } from './../DropDown/interface';

import Wrapper from './Wrapper';

export interface FormProps {
  onFormSubmit: (evt: Event) => void;
  name: string;
}

export interface InputProps {
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
}

export interface IFormData {
  [index: string]: InputProps;
}

const Form:React.StatelessComponent<FormProps> = (props: any) => {
  return (
    <Wrapper>
      <form name={props.name} onSubmit={props.onFormSubmit}>
        {Children.toArray(props.children)}
      </form>
    </Wrapper>
  );
}

export default Form;
