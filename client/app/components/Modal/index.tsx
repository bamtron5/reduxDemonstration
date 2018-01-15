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
    if (this.props.show && !this.modalRoot.contains(this.el)) {
      this.modalRoot.appendChild(this.el);
    }

    if (!this.props.show && this.modalRoot.contains(this.el)) {
      this.modalRoot.removeChild(this.el);
    }

    // <Row className="modal--Close">
    //   <Col xs={12}>
    //     <Button onClick={this.props.onClose}>Close</Button>
    //   </Col>
    // </Row>
  }

  render() {
    const modal = (
      <Backdrop show={this.props.show} className="modal--Backdrop">
        <ModalContainer className="modal--Container">
          <ModalHeader className="modal--Header">
            <h2>Sign Up</h2>
            <ModalClose className="modal--Close">x</ModalClose>
          </ModalHeader>
          <ModalContent className="modal--Content">
            {Children.toArray(this.props.children)}
          </ModalContent>
          <ModalFooter>
          </ModalFooter>
        </ModalContainer>
      </Backdrop>
    );

    return ReactDOM.createPortal(
      modal,
      this.el
    );
  }
}

export default Modal;
