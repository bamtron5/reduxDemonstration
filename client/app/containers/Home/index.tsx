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
import { toggleModal } from './actions';
import reducer from './reducer';
import { makeSelectHomePage, IState } from './selectors';

// COMPONENTS
import Button from './../../components/Button';
import Modal from './../../components/Modal';
import Container from './../../components/Container';
import Form, { IFormData } from './../../components/Form';
import Input from './../../components/Input';
import DropDown from './../../components/DropDown';
import { Debounce } from 'react-throttle';

// TODO submit the form close and reopen, the form is missing but is still submissable
// For user event bound functions
let self = null;

declare interface IHomeDispatch {
  onToggleModal: (show: boolean) => Redux.Dispatch<() => void>
}

declare interface IHomeProps extends IHomeDispatch {
  homePage: {
    showModal: boolean;
  };
}

export class HomePage extends React.Component<IHomeProps> {
  public show: boolean = false;
  public formName: string = 'thisForm';
  public formJson: JSON | object = Object.create({});
  public formData: IFormData = formData;

  constructor(props: IHomeProps) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.watchField = this.watchField.bind(this);
    this.formData.name['onChange'] = this.watchField;
    self = this;
  }

  public toggleModal = () => {
    this.props.onToggleModal(!this.props.homePage.showModal);
  };

  submitForm(evt: Event) {
    evt.preventDefault();
    const form = document.forms.namedItem(self.formName);
    self.formToJson(new FormData(form));
  }

  formToJson(data: FormData) {
    data['forEach']((value, key) => {
      Object.defineProperty(this.formJson, key, { value });
    });
    console.log(this.formJson);
  }

  watchField(evt: Event) {
    evt.preventDefault();
    console.log(`${evt.target['name']}: ${evt.target['value']}`);
  }

  wrapDebounce(key: string, elem: IFormData[string]) {
    return (
      <Debounce key={key} time="700" handler="onChange">
        <Input {...elem} />
      </Debounce>
    );
  }

  printFormElement(key: string, elem: IFormData[string]) {
    const caseOne = (type: string) => ['text', 'tel', 'email'].some(v => v === type) ? type : false;
    const caseTwo = (type: string) => type === 'select' ? type : false;
    switch (elem.type) {
      case caseOne(elem.type):
        return (<Input key={key} {...elem} />);
      case caseTwo(elem.type):
        return (<DropDown key={key} {...elem} />);
      default:
        return;
    }
  }

  printForm() {
    return Object.keys(this.formData)
      .map((v) => {
          const key = `${this.formName}-${this.formData[v].name}`;
          const hasOnChange = Object.keys(this.formData[v]).some(k => k === 'onChange');
          const elem = (child: JSX.Element) => (
            <Col key={key} {...this.formData[v].flex} >
              {child}
            </Col>
          );
          const input = hasOnChange
            ? this.wrapDebounce(key, this.formData[v])
            : this.printFormElement(key, this.formData[v])
          return elem(input);
      });
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
            <Form name={this.formName} onFormSubmit={this.submitForm}>
              <Grid>
                <Row>
                  {this.printForm()}
                </Row>
              </Grid>
              <Button type="submit">Submit</Button>
            </Form>
          </Modal>

        </Container>
      </article>
    );
  }
}

const mapStateToProps = (state: IState) => createStructuredSelector({
  homePage: makeSelectHomePage(state)
});

function mapDispatchToProps(dispatch: any) {
  const dispatchToProps: IHomeDispatch = {
    onToggleModal: (show: boolean) => dispatch(toggleModal(show))
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
