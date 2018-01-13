import * as React from 'react';
import * as Redux from 'redux';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// UTIL
import injectReducer from './../../util/injectReducer';

// REDUX PARTS
import { toggleModal } from './actions';
import reducer from './reducer';
import { makeSelectHomePage, IState } from './selectors';

// COMPONENTS
import Button from './../../components/Button';
import Modal from './../../components/Modal';
import Container from './../../components/Container';
import Form from './../../components/Form';
import Input from './../../components/Input';

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
  public formData = {
    name: { name: 'name', label: 'Name', type: 'text', value: null, required: true },
    email: { name: 'email', label: 'Email', type: 'email', value: null, required: true },
    phone: { name: 'phone', label: 'Phone', type: 'phone', value: null, required: true },
    address: { name: 'address', label: 'Address', type: 'text', value: null, required: true },
    city: { name: 'city', label: 'City', type: 'text', value: null, required: true },
    state: { name: 'state', label: 'State', type: 'select', value: null, required: true },
    zipcode: { name: 'zipcode', label: 'Zipcode', type: 'text', value: null, required: true }
  };
  public formJson: JSON | object = Object.create({});

  constructor(props: IHomeProps) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.watchField = this.watchField.bind(this);
    self = this;
  }

  public toggleModal = () => {
    this.props.onToggleModal(!this.props.homePage.showModal);
  };

  submitForm(evt: Event) {
    evt.preventDefault();
    const form = document.forms.namedItem(self.formName);
    self.formData = new FormData(form);
    self.formToJson(self.formData);
  }

  formToJson(data: FormData) {
    data['forEach']((value, key) => {
      Object.defineProperty(this.formJson, key, { value });
    });

    console.log(this.formJson);
  }

  watchField(evt: Event) {
    evt.preventDefault();
    console.log(evt);
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <Container>
          <h1>Home Page</h1>
          <Button onClick={this.toggleModal}>Sign Up</Button>

          <Modal show={this.props.homePage.showModal} onClose={this.toggleModal}>

            <Form name={this.formName} onFormSubmit={this.submitForm}>

              <Input {...this.formData.name} onChange={this.watchField}/>
              <Input {...this.formData.email} />
              <Input {...this.formData.phone} />
              <Input {...this.formData.address} />
              <Input {...this.formData.city} />
              <Input {...this.formData.zipcode} />

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
