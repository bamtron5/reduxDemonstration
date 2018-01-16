import * as React from 'react';
import * as Redux from 'redux';
import { Children } from 'react';
import * as PropTypes from 'prop-types';
import { v1 } from 'uuid';
import { Col, Row } from 'react-styled-flexboxgrid';

import { IFlex } from './../../theme/flexbox.interface';
import { InputProps } from './../Input/index';
import { ISelectDispatch, IOption } from './../DropDown/interface';

import Input from './../Input';
import DropDown from './../DropDown';

import Wrapper from './Wrapper';

export interface IFormData {
  [index: string]: InputProps;
}

export interface IFormSettings {
  name: string;
  onSubmit: string;
  data: IFormData;
}

export interface FormProps {
  settings: IFormSettings;
  instance: React.Component<{}>;
}

declare var Promise;
let self = null
export class Form extends React.Component<FormProps, {}> {
  parent: React.Component<{}>;
  submitMethod: null;
  constructor(props) {
    super(props);
    self = this;
    this.mapOnChangeMethods();
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
    return Object.keys(this.props.settings.data)
      .map((v) => {
          const key = `${this.props.settings.name}-${this.props.settings.data[v].name}`;
          const hasOnChange = Object.keys(this.props.settings.data[v]).some(k => k === 'onChange');
          const elem = (child: JSX.Element) => (
            <Col key={key} {...this.props.settings.data[v].flex} >
              {child}
            </Col>
          );
          const input = this.printFormElement(key, this.props.settings.data[v]);
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

export default Form;
