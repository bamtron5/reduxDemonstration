import {
  TOGGLE_MODAL,
  NAME_CHANGE
} from './constants';

export function toggleModal(show: boolean) {
  return {
    type: TOGGLE_MODAL,
    show
  };
}

export function nameChange(name: string) {
  return {
    type: NAME_CHANGE,
    name
  }
}
