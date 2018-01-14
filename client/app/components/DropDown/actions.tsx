import { IOption } from './interface';

import {
  CHANGE_OPTION
} from './constants';

export function changeSelect(option: IOption) {
  return {
    type: CHANGE_OPTION,
    option
  };
}
