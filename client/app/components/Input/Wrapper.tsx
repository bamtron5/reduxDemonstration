import styled from 'styled-components';
import v from './../../theme/variables';
import m from './../../theme/mixins';

const Wrapper = styled.div`
  display: flex;
  flex: 1;

  > input {
    display: flex;
    flex: 1;
    -webkit-appearance: none;
    background-color: #fff;
    font-family: inherit;
    border: 1px solid #ccc;
    -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
    box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
    color: rgba(0,0,0,.75);
    font-size: .875rem;
    margin: 0 0 1rem;
    padding: 8px;
    height: 2.3125rem;
    width: 100%;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: -webkit-box-shadow .45s,border-color .45s ease-in-out;
    -moz-transition: -moz-box-shadow .45s,border-color .45s ease-in-out;
    transition: box-shadow .45s,border-color .45s ease-in-out;

    ::placeholder {
      color: #d3d3d3;
    }

    &:focus {
      box-shadow: 0 0 5px #999;
      background: #fafafa;
      border-color: #999;
      outline: 0;
    }
  }
`;

export default Wrapper;
