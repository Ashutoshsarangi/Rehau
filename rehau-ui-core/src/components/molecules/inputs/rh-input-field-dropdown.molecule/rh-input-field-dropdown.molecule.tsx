import { Component, Prop, h, EventEmitter, Event, State, Listen } from '@stencil/core';
import { DropdownElement } from '../../../interfaces/dropdown-element';
import { ControlProperties, ResultValidation } from '../../../interfaces/forms';
import { validateInput } from '../../../../utils/input-validators';
import { InputDropdownEmit } from '../../../interfaces/input-dropdown-emit';

@Component({
  tag: 'rh-input-field-dropdown',
  styleUrl: 'rh-input-field-dropdown.molecule.scss',
  shadow: true
})
export class RhInputFieldDropdownMolecule {
  @Prop() public padding: boolean;
  @Prop() public label: string;
  @Prop() public opened: boolean;
  @Prop() public placeholder: string;
  @Prop() public value: string;
  @Prop() public elementlist: DropdownElement[];
  @Event({ eventName: 'update' }) public update: EventEmitter<InputDropdownEmit>;

  @Prop() public formController: ControlProperties;
  @Prop() public isFormComponent: boolean = false;
  private status: ResultValidation;

  @State() public containerSize: number;
  private dropdownField: HTMLElement;

  public componentDidLoad(): void {
    if (!!this.dropdownField) {
      this.containerSize = this.dropdownField.getBoundingClientRect().bottom;
      this.resize();
    }
  }

  public componentDidRender(): void {
    if (!!this.dropdownField) {
      this.resize();
    }
  }

  public componentDidUpdate(): void {
    this.resize();
  }

  @Listen('resize', { target: 'document' })
  private resize(): void {
    if (!!this.dropdownField) {
      this.containerSize = this.dropdownField.clientHeight;
      var windowHeight = window.innerHeight;
      var offsetVal = window.pageYOffset;
      var offsetVal2 = document.body.scrollTop;
    }
    // console.log("windowHeight: " + windowHeight + " containerSize : " + this.containerSize + " offsetVal2: " + offsetVal2);
  }

  constructor() {
    this.formController = {
      disabled: false,
      icon: '',
      id: '',
      label: '',
      placeholder: '',
      showAllErrors: true,
      type: 'text',
      validators: [{ type: 'required', priority: 1 }]
    };
    this.status = {
      currentValue: '',
      errors: [],
      isPristine: true,
      valid: false
    };
  }

  public selectedEvent(event: any): void {
    this.opened = !this.opened;
  }

  public onCheck(value: DropdownElement, emit?: boolean): void {
    if (emit) {
      this.status = validateInput(this.formController.validators, value);
      this.status.isPristine = false;
      this.update.emit({ status: this.status, value: value });
    } else {
      this.update.emit({ value: value });
    }
    this.value = value.titleUp;
    this.opened = false;
  }

  public render(): any {
    const paddingClass: { [s: string]: boolean } = {
      'box': !this.padding,
      'box-padding': this.padding
    };
    const label: { [s: string]: boolean } = {
      'label': true
    };
    const textBackground: { [s: string]: boolean } = {
      'label-placeholder': true
    };
    const labelClass: { [s: string]: boolean } = {
      'label-styling': true,
      'label-color': true
    };

    return (
      <div class={paddingClass} >
        <div>
          <div class='custom-label'>
            <label color='$primary' class={label}>
              {this.label}
            </label>
          </div>
          <div class='grid no-padding dropdown-field' ref={(el: HTMLElement) => (this.dropdownField = el)}>
            <div class='row no-padding dropdown-position'>
              <div class='col-xs no-padding col-height' onClick={(event: UIEvent) => this.selectedEvent(event)}>
                <input
                  class={textBackground}
                  placeholder={this.placeholder}
                  value={this.value}
                  type='text'
                  disabled
                ></input>
              </div>
              <div class='col-xs-2 no-padding right-aligned' onClick={(event: UIEvent) => this.selectedEvent(event)}>
                <div class='icon-positioning'>
                  <rh-icon
                    class='icon'
                    name={this.opened ? 'icon-next up' : 'icon-next down'}
                    color='var(--quaternaryColor, $quaternaryColor)'
                    size='18px'
                  ></rh-icon>
                </div>
              </div>
              <div class='col-xs-12 no-padding'>
                {this.opened && (
                  <div class='dropdown-open'>
                    <ol>
                      {
                        console.log("elementlist:   " + this.elementlist)
                      }
                      {this.elementlist.map((dropdown, index, elementlist) => (
                        <div
                          class='list-item'
                          onClick={() => {
                            this.onCheck(dropdown, this.isFormComponent);
                          }}
                        >
                          <div class='divider-label-distance'>
                            <label class={labelClass}>{dropdown.titleUp}</label>
                          </div>
                          {index !== elementlist.length - 1 && (
                            <div>
                            </div>
                          )}
                        </div>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
