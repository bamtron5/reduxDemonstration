import * as React from 'react';
import { Children } from 'react';
import * as PropTypes from 'prop-types';

import Wrapper from './Wrapper';

interface InputProps {
  name: string;
  options: [{
    label: string;
    value: string | null | number | boolean;
  }];
  required?: boolean;
  type: string;
  onChange?: (evt: Event) => void;
}

const Input:React.StatelessComponent<InputProps> = (props: any) => {
  const attrs = {
    'aria-label': props.options[0].label,
    type: props.type,
    name: props.name,
    placeholder: props.options[0].label
  };

  return (
    <Wrapper>
      <label>{props.label}</label>
      <input {...attrs} onChange={props.onChange} required={props.required}/>
    </Wrapper>
  );
}

export default Input;
