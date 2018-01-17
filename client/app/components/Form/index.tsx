import * as React from 'react';
import * as Redux from 'redux';
import { Children } from 'react';
import * as PropTypes from 'prop-types';
import { v1 } from 'uuid';
import { Col, Row } from 'react-styled-flexboxgrid';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { debounce } from 'lodash';
import { isEmail, isMobilePhone } from 'validator';
import { fromJS, Map } from 'immutable';

import { IFlex } from './../../theme/flexbox.interface';
import { InputProps } from './../Input/index';
import { ISelectDispatch, IOption } from './../DropDown/interface';

import injectReducer from './../../util/injectReducer';

import Input from './../Input';
import DropDown from './../DropDown';
import Wrapper from './Wrapper';

import { FormAction, InputAction, IDispatchedForms, setup, checkValidation } from './actions';
import importsReducer from './reducer';
import { makeSelectForms, IState } from './selectors';
import reducer from './reducer';

interface FormDispatch {
  onSetup?: (value: Map<{}, FormAction>) => Redux.Dispatch<() => void>;
  forms?: IDispatchedForms; // FormAction [key:string]
  onKeyChange?: (value: InputAction) => Redux.Dispatch<() => void>;
}

export interface IFormData {
  [index: string]: InputProps;
}

export interface IFormSettings {
  name: string;
  onSubmit: string;
  data: IFormData;
}

export interface FormProps extends FormDispatch {
  settings: IFormSettings;
  instance: React.Component<{}>;
}

declare var Promise;
let self = null

export class Form extends React.Component<FormProps, {}> {
  parent: React.Component<{}>;
  submitMethod: null;
  onChange = null; // THIS IS THE COMBINED LISTENERS FROM PROPS AND VALIDATION
  initialValidation = true;
  delayedCallback: any;
  inputs = Object.create({});
  props: FormProps;

  constructor(props: FormProps) {
    super(props);
    self = this;
    this.inputHandler = this.inputHandler.bind(this);
    this.mapOnChangeMethods();
    this.setup();
  }

  setup() {
    Object.keys(this.props.settings.data)
      .forEach((v) => {
        this.inputs[v] = {
          isValid: false
        }
      });

    const initialState = Map({
      formName: this.props.settings.name,
      valid: false,
      inputs: fromJS(this.inputs)
    });
    this.props.onSetup(initialState);
  }

  componentDidMount() {
    this.delayedCallback = debounce((e) => {
      const field = e.target['name'];
      if (this.props.settings.data[field].onChange) {
        this.props.settings.data[field].onChange(e);
      }

      if (this.props.settings.data[field].validation) {
        this.checkValidators(e);
      }
    }, 700);
  }

  mapOnChangeMethods() {
    this.submitMethod = this.props.instance[this.props.settings.onSubmit];
    const keys = Object.keys(this.props.settings.data);
    keys.forEach((key: string) => {
      const selectedMethod = this.props.settings.data[key].onChange;
      if (selectedMethod && this.props.instance[selectedMethod]) {
        this.props.settings.data[key].onChange = this.props.instance[selectedMethod];
      }
    });
  }

  inputHandler(e: React.SyntheticEvent<InputProps>) {
    e.persist();
    this.delayedCallback(e);
  }

  checkValidators(e: React.SyntheticEvent<InputProps>) {
    const field = e.target['name'];
    switch (this.props.settings.data[field].type) {
      case 'email':
        this.emailValidator(e);
        break;
      case 'tel':
        this.phoneValidator(e);
      default:
        break;
    }
  }

  emailValidator(e: React.SyntheticEvent<InputProps>){
    this.props.onKeyChange({
      name: e.target['name'],
      value: e.target['value'],
      valid: isEmail(e.target['value']),
      message: `${e.target['value'] ? e.target['value'] : 'this'} is not a valid email`,
      formName: this.props.settings.name
    });
  }

  phoneValidator(e: React.SyntheticEvent<InputProps>) {
    this.props.onKeyChange({
      name: e.target['name'],
      value: e.target['value'],
      valid: isMobilePhone(e.target['value'], 'en-US'),
      message: `${e.target['value'] ? e.target['value'] : 'this'} is not a valid phone`,
      formName: this.props.settings.name
    });
  }

  printValidation(field: string) {
    const input = this.props.settings.data[field];
    const form = this.props.forms[this.props.settings.name];
    if (input.validation && form) {
      const stateInput = form.inputs[field];
      const msg = (<span className="warn validationMsg">{stateInput.message}</span>);
      return stateInput.valid ? null : msg;
    } else {
      return null;
    }
  }

  printFormElement(key: string, elem: IFormData[string]) {
    const caseOne = (type: string) => ['text', 'tel', 'email'].some(v => v === type) ? type : false;
    const caseTwo = (type: string) => type === 'select' ? type : false;
    elem.formName = this.props.settings.name;
    elem.printedValidation = this.printValidation(elem.name);
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
    return Object.keys(this.props.settings.data)
      .map((v) => {
          const cur = this.props.settings.data[v];
          const key = `${this.props.settings.name}-${cur.name}`;
          const hasOnChange = Object.keys(cur).some(k => k === 'onChange');

          if (hasOnChange || cur.validation) {
            cur.inputHandler = this.inputHandler;
          }
          const elem = (child: JSX.Element) => (
            <Col key={key} {...cur.flex} >
              {child}
            </Col>
          );
          const input = this.printFormElement(key, cur);
          return elem(input);
      });
  }

  render() {
    return (
      <form name={this.props.settings.name} onSubmit={this.submitMethod}>
        <Row>
          {this.printForm()}
        </Row>
        <input type="submit" id={this.props.settings.name + '_submit'} className="hidden" />
      </form>
    );
  }
}

const mapStateToProps = (state: IState) => createStructuredSelector({
  forms: makeSelectForms(state)
});

function mapDispatchToProps(dispatch: any) {
  const dispatchToProps: FormDispatch = {
    onSetup: (value: any) =>  dispatch(setup(value)),
    onKeyChange: (value: any) => dispatch(checkValidation(value))
  };
  return dispatchToProps;
}

const withReducer = injectReducer({ key: 'forms', reducer });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const composed = compose<React.ComponentClass<FormProps>>(
  withReducer,
  withConnect
);

export default composed(Form);

