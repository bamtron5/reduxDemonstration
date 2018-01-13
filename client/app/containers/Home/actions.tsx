import {
  TOGGLE_MODAL
} from './constants';

export function toggleModal(show: boolean) {
  return {
    type: TOGGLE_MODAL,
    show
  };
}
