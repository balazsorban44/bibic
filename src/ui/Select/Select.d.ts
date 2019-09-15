import * as React from 'react';
import { StandardProps } from '..';

//TODO:
export interface SelectProps extends React.HTMLAttributes<HTMLInputElement> {
  error: string
  label: string
  name: string
  required: boolean
  disabled: boolean 
  onChange: Function
  value: string
  selectProps: object
  className: string
  fullWidth: boolean
}

declare const Select: React.ComponentType<SelectProps>;

export default Select;
