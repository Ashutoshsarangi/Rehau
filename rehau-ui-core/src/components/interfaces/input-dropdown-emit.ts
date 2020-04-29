import { ResultValidation } from '../../components/interfaces/forms';
import { DropdownElement } from '../../components/interfaces/dropdown-element';

export interface InputDropdownEmit {
  status?: ResultValidation;
  value: DropdownElement;
}
