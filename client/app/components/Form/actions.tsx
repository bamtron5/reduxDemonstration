import {
  SETUP,
  INPUT_CHANGE
} from './constants';

import * as immutable from 'immutable';

export interface InputAction {
  name: string;
  value: (string | number | boolean);
  valid: boolean;
  message: string;
  formName: string;
}

export interface InputState {
  [name: string]: InputAction;
}

export interface FormAction {
  formName: string;
  valid: boolean;
  inputs: Map<{}, InputAction>;
}

export interface IDispatchedForms {
  [index: string]: FormAction;
}

export function setup (value: any) {
  return {
    type: SETUP,
    value
  };
}

export function checkValidation(value: any) {
  return {
    type: INPUT_CHANGE,
    value
  };
}
