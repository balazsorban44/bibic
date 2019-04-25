import * as React from 'react';
import { StandardProps } from '..';
//TODO:
export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  /**The text to show when the input value fails validation */
  error?: string
  label?: string
  name: string
  type?: string,
  placeholder?: string
  required?: boolean
  disabled?: boolean 
  onChange?: Function
  value?: string
  inputProps?: object // REVIEW: rename?
  className?: string
}

declare const Input: React.ComponentType<InputProps>;

export default Input;
