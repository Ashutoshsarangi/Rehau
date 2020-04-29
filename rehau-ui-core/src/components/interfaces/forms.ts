import { FormBuilder } from '../classes/form-builder';

export interface FormObject extends FormBuilder {
  controllers: FormController[];
  name: string;
}
export interface Validator {
  type:
    | string & 'required'
    | 'requiredTrue'
    | 'custom'
    | 'regex'
    | 'minLength'
    | 'maxLength'
    | 'min'
    | 'max'
    | 'email'
    | 'url';
  priority: number;
  errorMessage?: string;
  regex?: string | RegExp;
  customValidator?(value: any): boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
}

export interface ResultValidation {
  errors: string[];
  currentValue: any;
  valid: boolean;
  isPristine?: boolean;
}

export interface ControlProperties {
  validators?: Validator[];
  name?: string;
  hints?: string[];
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  showAllErrors?: boolean;
  id: string;
  icon?: string;
  type?: string & 'email' | 'password' | 'number' | 'date' | 'tel' | 'text' | 'checkbox' | 'radio';
}

export interface FormRow {
  rowProperties?: string;
  controls: FormController[];
}
export interface FormController {
  name: string;
  type: string & 'checkbox' | 'text' | 'select';
  columnProperties?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    colProperties?: string;
  };
  value?: any;
  properties: ControlProperties;
}
