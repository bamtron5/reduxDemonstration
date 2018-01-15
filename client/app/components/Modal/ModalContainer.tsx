import styled from 'styled-components';
import v from './../../theme/variables';
import m from './../../theme/mixins';
const $module = 'modal';

const ModalContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: ${v.modal.width};
  margin: auto;
  position: absolute;
  top: 14%;
  left: 0;
  right: 0;
  background: ${v.modal.background};
  ${m.boxShadow('0 0 10px rgba(0,0,0,.4)')};
  flex-direction: column;
  z-index: 1000;

  @media (max-width: ${v.modal.width}) {
    margin: 0 1.2rem 30px 1.2rem;
    top: 7%;
  }

`;

export default ModalContainer;
