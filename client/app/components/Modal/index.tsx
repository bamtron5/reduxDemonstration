// lib
import * as React from 'react';
import * as Redux from 'redux';
import * as PropTypes from 'prop-types';
import { Children, ComponentState } from 'react';

// components
import Backdrop from './Backdrop';
import ModalContent from './ModalContent';

export interface IModalState extends React.ComponentState {
  isOpen: boolean;
}

export interface IModalProps {
  children: PropTypes.Validator<any>;
  show: boolean;
}

export interface IModal {
  show?: boolean;
  propTypes?: IModalProps;
}

export class Modal extends React.Component<IModal, IModalState> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onToggleModal: PropTypes.func
  };

  state: IModalState;
  static show: boolean;

  constructor(
    props: IModal
  ) {
    super(props);
  }

  render() {
    return (
      <Backdrop show={this.props.show}>
        <ModalContent>
          {Children.toArray(this.props.children)}
        </ModalContent>
      </Backdrop>
    );
  }
}

export default Modal;
