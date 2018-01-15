import styled from 'styled-components';
import v from './../../theme/variables';
import m from './../../theme/mixins';
const $module = 'modal';

const ModalContainer = styled.div`
  font-size: 1.375rem;
  line-height: 1;
  position: absolute;
  top: .5rem;
  right: .6875rem;
  color: #aaa;
  font-weight: 700;
  cursor: pointer;
  font-weight: ${v.fontSize.weight.heavy};
  cursor: pointer;
`;

export default ModalContainer;
