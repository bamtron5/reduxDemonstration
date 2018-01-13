import styled from 'styled-components';
import v from './../../theme/variables';
import m from './../../theme/mixins';

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 4em 0;
  > button {
    background-color: ${v.button.background};
    border-color: ${v.button.borderColor};
    border-radius: ${v.button.borderRadius};
    color: ${v.button.color};
    cursor: ${v.button.cursor};
    width: auto;
    font-weight: ${v.button.fontWeight};
    padding: ${v.button.padding};
    font-size: ${v.button.fontSize};
    ${m.boxShadow('0 1px 0 rgba(255,255,255,.25) inset')};
    outline: none;
    display: inline-block;

    .expand {
      width: ${v.button.width};
    }

    &:hover, &:focus {
      background-color: ${v.button.onHover.background};
    }
  }
`;

export default Wrapper;
