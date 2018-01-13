import * as styled from 'styled-components';

export namespace App.Components {
  export interface IBackdrop extends styled.StyledProps<{}> {
    show: boolean;
  }

  export const Backdrop:styled.StyledComponentClass<any, IBackdrop> = styled.default.div`
    width: 100%;
    text-align: center;
    margin: 4em 0;
    display: ${(p: IBackdrop) => p.show ? 'block' : 'none'};
  `;
}

export default App.Components.Backdrop;
