import styled from 'styled-components';
const $module = 'modal';

const ModalContent = styled.div`
  display: flex;
  flex: 1;

  > .${$module}--Container {
    height: 100%;
  }
`;

export default ModalContent;
