import * as React from 'react';
import { Children } from 'react';
import * as PropTypes from 'prop-types';

import Wrapper from './Wrapper';

interface ButtonProps {
  onClick: () => void,
  children: React.ReactChild
}

const Button:React.StatelessComponent<ButtonProps> = (props: any) => {

  const button = (
    <button onClick={props.onClick}>
      {Children.toArray(props.children)}
    </button>
  );

  return (
    <Wrapper>
      {button}
    </Wrapper>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
