import styled from 'styled-components';
import v from './../../theme/variables';
import m from './../../theme/mixins';
// USE this to set base styles

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
  font-size: ${v.fontSize.base};
  font-family: ${v.fonts.primary};
  color: ${v.color.base};

  *, *:after, *:before {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    ${m.transition('all 0.5s ease')};
  }
`;

export default AppWrapper;