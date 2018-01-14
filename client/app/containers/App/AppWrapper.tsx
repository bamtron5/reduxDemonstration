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
    font-family: ${v.fonts.primary};
  }

  //FORM RESET
  textarea, select, input[type="date"],
  input[type="datetime"],
  input[type="datetime-local"],
  input[type="email"],
  input[type="month"],
  input[type="number"],
  input[type="password"],
  input[type="search"],
  input[type="tel"],
  input[type="text"],
  input[type="time"],
  input[type="url"],
  input[type="week"]{
    -webkit-appearance: none;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    padding: 1px;
    border-width: 0px;
    border-style: inset;
    border-color: initial;
    border-image: initial;

    &:focus {
      outline: none;
    }
  }
`;

export default AppWrapper;