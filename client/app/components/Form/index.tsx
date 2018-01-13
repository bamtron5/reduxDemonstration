import * as React from 'react';
import { Children } from 'react';
import * as PropTypes from 'prop-types';

import Wrapper from './Wrapper';

interface FormProps {
  onFormSubmit: (evt: Event) => void;
  name: string;
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
