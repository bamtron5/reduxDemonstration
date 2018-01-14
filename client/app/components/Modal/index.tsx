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
import Container from './../Container';
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
  }

  render() {
    const modal = (
      <Backdrop show={this.props.show} className="modal--Backdrop">
        <ModalContent className="modal--Content">
          <Container className="modal--Container">
            <Row className="modal--Close">
              <Button onClick={this.props.onClose}>Close</Button>
            </Row>
            {Children.toArray(this.props.children)}
          </Container>
        </ModalContent>
      </Backdrop>
    );

    return ReactDOM.createPortal(
      modal,
      this.el
    );
  }
}

export default Modal;
