import {
  INPUT_CHANGE
} from './constants';

export interface InputAction {
  name: string;
  value: (string | number | boolean);
  valid: boolean;
  message: string;
}

export function checkValidation(value: InputAction) {
  return {
    type: INPUT_CHANGE,
    value
  };
}
