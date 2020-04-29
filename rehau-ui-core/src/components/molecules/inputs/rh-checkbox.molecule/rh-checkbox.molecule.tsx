import { Component, Prop, h, EventEmitter, Event } from '@stencil/core';

import { ControlProperties, ResultValidation } from '../../../interfaces/forms';

import { isPlatform } from '../../../../utils/platform-utils';
import { validateInput } from '../../../../utils/input-validators';

@Component({
  tag: 'rh-checkbox',
  styleUrl: 'rh-checkbox.molecule.scss',
  shadow: true
})
export class RhCheckboxMolecule {
  @Prop() public text: string
  @Prop() public textError: string;
  @Prop() public left: boolean = true;
  @Prop({ mutable: true }) public checked: boolean;
  @Prop() public disabled: boolean = false;
  @Prop() public padding: boolean = false;

  @Event() public onChange: EventEmitter<any>;

  @Prop() public isFormComponent: boolean = false;
  @Prop() public formController: ControlProperties;
  @Event() public changed: EventEmitter;

  // Input elements
  private inputField: HTMLInputElement;
  private formInputElement: HTMLInputElement;

  private status: ResultValidation;

  constructor() {
    this.formController = {
      disabled: true,
      icon: '',
      id: '',
      label: '',
      placeholder: '',
      showAllErrors: false,
      type: 'checkbox',
      validators: []
    };
    this.status = {
      currentValue: '',
      errors: [],
      isPristine: true,
      valid: false
    };
  }

  public componentWillLoad(): any {
    if (this.isFormComponent) {
      this.status = validateInput(this.formController.validators, this.checked);
      this.status.isPristine = true;
    }
  }

  public componentWillUpdate(): any {
    if (this.isFormComponent) {
      this.status = { ...this.status, ...validateInput(this.formController.validators, this.checked) };
    }
  }

  private handleChange(noEmit?: boolean): void {
    this.checked = this.formInputElement.checked as boolean;
    this.status = validateInput(this.formController.validators, this.checked);
    this.status.isPristine = false;
    if (!noEmit) {
      this.changed.emit(this.status);
    }
  }

  private checkmarkClicked(): void {
    this.checked = this.inputField.checked as boolean;
    this.onChange.emit(this.checked);
  }

  public render(): any {
    const checkMarkClasses: { [s: string]: boolean } = {
      'checkmark': true
    };

    const messageClasses: { [s: string]: boolean } = {
      'message-container': true,
    };

    const disabled: { [s: string]: boolean } = {
      'disabled': this.disabled
    };

    if (!this.isFormComponent)
      return (
        <div class={'grid' + (this.padding ? ' shape-padding' : '')}>
          <div class='row'>
            <div class={'col-xs-auto checkbox-container' + (this.left ? ' first-xs' : '')}>
              <label class='checkbox-label'>
                <input
                  type='checkbox'
                  checked={this.checked}
                  disabled={this.disabled}
                  class={disabled}
                  ref={(element: any) => this.inputField = element as HTMLInputElement}
                  onClick={() => this.checkmarkClicked()}
                />
                <span class={checkMarkClasses} />
                <span class={messageClasses}>{this.text}</span>
              </label>
              {this.textError && !this.checked && (
                <div class='row error-container'>
                  <label>{this.textError}</label>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    else {
      return (
        <div class={'grid' + (this.padding ? ' shape-padding' : '')}>
          <div class='row'>
            <div class={'col-xs-auto checkbox-container' + (this.left ? ' first-xs' : '')}>
              <label class='checkbox-label'>
                <input
                  id={this.formController.id}
                  name={this.formController.name ? this.formController.name : 'checkbox-error-handling'}
                  disabled={this.disabled}
                  class={disabled}
                  type='checkbox'
                  checked={this.checked}
                  ref={(element) => this.formInputElement = element as HTMLInputElement}
                  onClick={(event: any) => this.handleChange()}
                />
                <span class={checkMarkClasses} />
                <span class={messageClasses}>{this.text}</span>
              </label>
              {this.textError && this.status.errors.length > 0 && (
                <div class='row error-container'>
                  <label>{this.textError}</label>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}
