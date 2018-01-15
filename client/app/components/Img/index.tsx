import * as React from 'react';
import { Children } from 'react';
import * as PropTypes from 'prop-types';

import Wrapper from './Wrapper';

interface ImgProps {
  src: string;
}

const Img:React.StatelessComponent<ImgProps> = (props: ImgProps) => {

  const img = (
    <img src={props.src} />
  );

  return (
    <Wrapper>
      {img}
    </Wrapper>
  );
}

Img.displayName = 'Img';
export default Img;
