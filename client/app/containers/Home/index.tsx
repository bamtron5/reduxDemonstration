import * as React from 'react';
import * as Redux from 'redux';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import { Children } from 'react';

// UTIL
import injectReducer from './../../util/injectReducer';
import formData from './formData';

// REDUX PARTS
import { toggleModal, nameChange } from './actions';
import reducer from './reducer';
import { makeSelectHomePage, makeSelectName, IState } from './selectors';

// COMPONENTS
import Button from './../../components/Button';
import Modal from './../../components/Modal';
import Container from './../../components/Container';
import Form, { IFormData, IFormSettings } from './../../components/Form';
import Input from './../../components/Input';
import DropDown from './../../components/DropDown';
import { Debounce } from 'react-throttle';
import Img from './../../components/Img';
import {AB, Variation} from './../AB';

// ASSETS
const screenOne = require('./assets/screen1.png');
const screenTwo = require('./assets/screen2.png');

let self = null;

declare interface IHomeDispatch {
  onToggleModal: (show: boolean) => Redux.Dispatch<() => void>;
  onNameChange: (name: string) => Redux.Dispatch<() => void>;
}

declare interface IHomeProps extends IHomeDispatch {
  homePage: {
    showModal: boolean;
    name: string;
  };
}

export class HomePage extends React.Component<IHomeProps> {
  public show: boolean = false;
  public formName: string = formData.name;
  public formJson: JSON | object = Object.create({});
  public formData = formData;
  public eventName: string | null = null;

  constructor(props: IHomeProps) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.watchField = this.watchField.bind(this);
    self = this;
  }

  public toggleModal = () => {
    this.props.onToggleModal(!this.props.homePage.showModal);
  };

  componentDidUpdate() {
    this.printName();
  }

  printName() {
    if (this.props.homePage.name !== this.eventName) {
      this.eventName = this.props.homePage.name
      console.log(this.props.homePage.name);
    }
  }

  watchField(e: React.SyntheticEvent<IFormData>) {
    // INPUTS ARE ALREADY DEBOUNCED AND PERSISTED
    self.props.onNameChange(e.target['value']);
  }

  submitForm(evt: Event) {
    evt.preventDefault();
    const form = document.forms.namedItem(self.formName);
    const inputs = form.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name.length) {
        Object.defineProperty(this.formJson, inputs[i].name, {
          value: inputs[i].value
        });
      }
    }

    console.log(this.formJson);
    this.formJson = Object.create({});
    this.toggleModal();
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Home Page" />
        </Helmet>
        <Container>
          <h1>Home Page</h1>
          <Button onClick={this.toggleModal}>Sign Up</Button>

          <Modal show={this.props.homePage.showModal} onClose={this.toggleModal}>
            <Row>
              <Col xs={12} sm={6}>
                <Form settings={this.formData} instance={this}/>
              </Col>
              <Col xs={12} sm={6}>
                <AB experiment="modalImage">
                  <Variation selector="screenOne">
                    <Img src={screenOne} />
                  </Variation>
                  <Variation selector="screenTwo">
                    <Img src={screenTwo} />
                  </Variation>
                </AB>
                <Button>
                  <label htmlFor={this.formData.name + '_submit'}>Submit</label>
                </Button>
              </Col>
            </Row>
          </Modal>
        </Container>
      </article>
    );
  }
}

const mapStateToProps = (state: IState) => createStructuredSelector({
  homePage: makeSelectHomePage(state),
  name: makeSelectName(state)
});

function mapDispatchToProps(dispatch: any) {
  const dispatchToProps: IHomeDispatch = {
    onToggleModal: (show: boolean) => dispatch(toggleModal(show)),
    onNameChange: (name: string) => dispatch(nameChange(name))
  };
  return dispatchToProps;
}

const withReducer = injectReducer({ key: 'homePage', reducer });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const composed = compose<React.ComponentClass<IHomeProps>>(
  withReducer,
  withConnect
);

export default composed(HomePage);
