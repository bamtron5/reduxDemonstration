import * as styled from 'styled-components';

export namespace App.Components {
  export interface IBackdrop extends styled.StyledProps<{}> {
    show: boolean;
  }

  export const Backdrop:styled.StyledComponentClass<any, IBackdrop> = styled.default.div`
    text-align: center;
    display: flex;
    background: rgba(0, 0, 0, .8);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    display: ${(p: IBackdrop) => p.show ? 'flex' : 'none'};
  `;
}

export default App.Components.Backdrop;
