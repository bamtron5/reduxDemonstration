import * as Redux from 'redux';

export interface IOption {
  label: string;
  value: string | null | number | boolean;
}

export interface DropDownProps extends ISelectDispatch {
  key: string;
  name: string;
  options: [IOption];
  required?: boolean;
  type: string;
  onChange?: (option: IOption) => void;
  placeholder?: string;
  selectedOption?: string;
}

export interface ISelectDispatch {
  onSelect?: (selectedOption: IOption) => Redux.Dispatch<Redux.Action<any>>
}

export interface ISelectAction {
  type: string;
  option: IOption;
}