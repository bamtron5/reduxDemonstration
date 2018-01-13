import * as React from 'react';
import { Children } from 'react';
import * as PropTypes from 'prop-types';

import Wrapper from './Wrapper';

interface ButtonProps {
  onClick?: () => void | string;
  children: React.ReactChild;
  type?: string;
}

const Button:React.StatelessComponent<ButtonProps> = (props: any) => {

  const button = (
    <button
      onClick={props.onClick ? props.onClick : () => null}
      type={props.type ? props.type : 'button'}
    >
      {Children.toArray(props.children)}
    </button>
  );

  return (
    <Wrapper>
      {button}
    </Wrapper>
  );
}

export default Button;
