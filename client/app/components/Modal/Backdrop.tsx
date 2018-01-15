import * as styled from 'styled-components';
import v from './../../theme/variables';

export namespace App.Components {
  export interface IBackdrop extends styled.StyledProps<{}> {
    show: boolean;
  }

  export const Backdrop:styled.StyledComponentClass<any, IBackdrop> = styled.default.div`
    text-align: center;
    display: flex;
    background: ${v.modal.backdrop};
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    display: ${(p: IBackdrop) => p.show ? 'flex' : 'none'};
    z-index: 999;
  `;
}

export default App.Components.Backdrop;
