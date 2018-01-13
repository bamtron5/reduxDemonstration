import * as styled from 'styled-components';
import v from './../../theme/variables';
import m from './../../theme/mixins';
import {IModalProps} from './../../components/Modal';


export const ModalRoot:styled.StyledComponentClass<any, IModalProps> = styled.default.div`
  > div {
    text-align: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
  }
`;

export default ModalRoot;