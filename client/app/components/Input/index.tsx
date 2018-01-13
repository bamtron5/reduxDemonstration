import * as React from 'react';
import { Children } from 'react';
import * as PropTypes from 'prop-types';

import Wrapper from './Wrapper';

interface InputProps {
  name: string;
  label: string;
  required?: boolean;
  type: string;
  onChange?: (evt: Event) => void;
}

const Input:React.StatelessComponent<InputProps> = (props: any) => {
  const attrs = {
    'aria-label': props.label,
    type: props.type,
    name: props.name,
    placeholder: props.label
  };

  props.required ? Object.defineProperty(attrs, 'required', { value: 'true' }) : () => null;
  const input = props.onChange ? <input {...attrs} onChange={props.onChange}/> : <input {...attrs} />;
  console.log(attrs);
  return (
    <Wrapper>
      <label>{props.label}</label>
      {input}
    </Wrapper>
  );
}

export default Input;
