// lib
import * as React from 'react';
import * as Redux from 'redux';
import * as PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import { Children, ComponentState } from 'react';
import { Row, Grid, Col } from 'react-styled-flexboxgrid';

// components
import Backdrop from './Backdrop';
import ModalContent from './ModalContent';
import ModalContainer from './ModalContainer';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import ModalClose from './ModalClose';
import Button from './../Button';
import ModalScroll from './ModalScroll';

export interface IModalState extends React.ComponentState {
  isOpen: boolean;
}

export interface IModalProps {
  children: PropTypes.Validator<any>;
  show: boolean;
  id: string;
}

export interface IModal {
  show: boolean;
  onClose: () => void;
}

export class Modal extends React.Component<IModal, IModalState> {
  public el: HTMLDivElement;
  public modalRoot: HTMLElement;

  state: IModalState;
  static show: boolean;

  constructor(
    props: IModal
  ) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.modalRoot = document.getElementById('modalRoot');
    this.toggleModal();
  }

  componentDidUpdate() {
    this.toggleModal();
  }

  toggleModal() {
    const body = document.getElementsByTagName('body')[0];
    if (this.props.show && !this.modalRoot.contains(this.el)) {
      body.style.overflow = 'hidden';
      this.modalRoot.appendChild(this.el);
    }

    if (!this.props.show && this.modalRoot.contains(this.el)) {
      body.style.overflow = 'visible';
      this.modalRoot.removeChild(this.el);
    }
  }

  render() {
    const modal = (
      <Backdrop show={this.props.show} className="modal--Backdrop">
        <ModalScroll>
          <ModalContainer className="modal--Container">
            <ModalHeader className="modal--Header">
              <h2>Sign Up</h2>
              <ModalClose className="modal--Close" onClick={this.props.onClose}>x</ModalClose>
            </ModalHeader>
            <ModalContent className="modal--Content">
              {Children.toArray(this.props.children)}
            </ModalContent>
            <ModalFooter>
            </ModalFooter>
          </ModalContainer>
        </ModalScroll>
      </Backdrop>
    );

    return ReactDOM.createPortal(
      modal,
      this.el
    );
  }
}

export default Modal;
