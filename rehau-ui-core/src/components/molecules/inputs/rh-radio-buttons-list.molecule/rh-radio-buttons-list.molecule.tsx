import { Component, Prop, Event, h, EventEmitter, State } from '@stencil/core';

import { validateInput } from '../../../../utils/input-validators';

import { RadioButton } from '../../../interfaces/radio-button';
import { ControlProperties, ResultValidation } from '../../../interfaces/forms';

@Component({
  tag: 'rh-radio-buttons-list',
  styleUrl: 'rh-radio-buttons-list.molecule.scss',
  shadow: true
})
export class RhRadioButtonsListMolecule {
  @Prop({ attribute: 'title' }) public inputTitle: string;
  @Prop() public radioButtonList: RadioButton[];
  @Prop() public disabled: boolean = false;
  @Prop() public showDesktopCol: boolean = false;
  @Prop() public hasMargin: boolean = true;
  @Prop() public padding: boolean;
  @Prop() public radioPosition: string = 'left' || 'right';

  @Event() public radioCheck: EventEmitter;
  @Event() private changed: EventEmitter<ResultValidation>;

  // Form Inputs
  @Prop() public formController: ControlProperties;
  @Prop() public isFormComponent: boolean = false;

  private status: ResultValidation;

  constructor() {
    this.formController = {
      disabled: false,
      icon: '',
      id: '',
      label: '',
      placeholder: '',
      showAllErrors: false,
      type: 'radio',
      validators: []
    };
    this.status = {
      currentValue: '',
      errors: [],
      isPristine: true,
      valid: false
    };
  }

  public componentWillLoad(): void {
    const radioButton: RadioButton = this.radioButtonList.find(
      (singleRadioButton: RadioButton) => singleRadioButton.checked
    );
    if (radioButton && radioButton.value) this.handleChange(radioButton);

  }

  public handleChange(radioButton: RadioButton): void {
    this.radioCheck.emit(radioButton);
    if (this.isFormComponent) {
      this.status = validateInput(this.formController.validators, radioButton.value);
      this.status.isPristine = false;
      this.changed.emit(this.status);
    }
  }

  public emitSelectedRadioButton(radioButton: RadioButton): void {
    this.radioCheck.emit(radioButton);
  }

  public render(): any {

    const mainColumnClasses: { [s: string]: boolean } = {
      'main-column': true,
      'column-padding': this.padding,
      'col-xs-12 column-height': !this.showDesktopCol,
      'col-xs-6 small-tooltip': this.showDesktopCol,
      'no-desktop': !this.padding && !this.showDesktopCol
    };

    const disabled: { [s: string]: boolean } = {
      'disabled': this.disabled
    };

    return (
      <div class={{ 'grid': true  }}>
        {this.inputTitle && (
          <label class={{ 'label': true, 'title-no-margin': !this.hasMargin }}>{this.inputTitle}</label>
        )}
        <div class='row'>
          {this.radioButtonList.map((radioButton: RadioButton, index: number) => [
            <div class={mainColumnClasses}>
              <div class='row'>
              {this.radioPosition === 'left' && (<div class='col-xs-auto'>
                  <div class='radio-label radio-left'>
                    <input
                      type='radio'
                      // GET ID FROM FORM
                      id={radioButton.id.toString()}
                      checked={radioButton.checked}
                      disabled={this.disabled}
                      class={disabled}
                      name={this.formController.name ? this.formController.name : 'radio-button-list'}
                      value={radioButton.value}
                      onChange={() => {
                        this.handleChange(radioButton);
                      }}
                    />
                    <label htmlFor={radioButton.id.toString()}>
                      <span class="radio"></span>
                      <span class="text-label text-wrap">{radioButton.text}</span>
                    </label>
                  </div>
                </div>)}

                {this.radioPosition === 'right' && (<div class='col-xs-auto'>
                  <div class='radio-label radio-right'>
                    <input
                      type='radio'
                      // GET ID FROM FORM
                      id={radioButton.id.toString()}
                      checked={radioButton.checked}
                      disabled={radioButton.disabled}
                      class={disabled}
                      name={this.formController.name ? this.formController.name : 'radio-button-list'}
                      value={radioButton.value}
                      onChange={() => {
                        this.handleChange(radioButton);
                      }}
                    />
                    <label htmlFor={radioButton.id.toString()} />
                  </div>
                </div>)}
              </div>
            </div>
          ])}
        </div>
      </div>
    );
  }
}
