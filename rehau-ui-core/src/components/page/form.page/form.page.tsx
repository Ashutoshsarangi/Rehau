import { Component, Prop, h, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Environment } from '../../../envs/env.dev';

import * as logger from '../../../utils/logger-utils';

import { ControlProperties, FormController } from '../../interfaces/forms';
import { END_POINT } from './../../const/mock-end-points';
import { RadioButton } from './../../interfaces/radio-button';

import { FormBuilder } from './../../classes/form-builder';
import { DropdownElement } from '../../../components/interfaces/dropdown-element';

@Component({
  tag: 'form-page',
  styleUrl: 'form.page.scss',
  shadow: true
})
export class FormPage {
  @Prop() public history: RouterHistory;

  @State() private formValidity: boolean;
  @State() private showCustomError: boolean;

  private breadcrumbsArray: Array<string>;
  private form: FormBuilder;
  private inputText: string;
  private radioButtonList: RadioButton[] = [
    {
      id: 1,
      text: "mrs.",
      value: "one",
      checked: false,
      height: false,
      tooltipActive: false,
      disabled: false
    },
    {
      id: 2,
      text: "mr.",
      value: "one",
      checked: false,
      height: false,
      tooltipActive: false,
      disabled: false
    },
    {
      id: 3,
      text: "inactive",
      value: "one",
      checked: false,
      height: false,
      tooltipActive: false,
      disabled: false
    }
  ];

  private dropdownList: DropdownElement[] = [
    {
      titleUp: 'RAUTOOL A-one',
    },
    {
      titleUp: 'RAUTOOL A-light 2 Kombi'
    },
    {
      titleUp: 'RAUTOOL A-light2'
    },
    {
      titleUp: 'RAUTOOL Xpand QC'
    },
    {
      titleUp: 'RAUTOOL G2'
    },
    {
      titleUp: 'RAUTOOL K-Tools'
    },
    {
      titleUp: 'RAUTOOL M1'
    },
    {
      titleUp: 'RAUTOOL H/G1'
    }
  ];


  private formController: FormController = {
    type: 'checkbox',
    name: 'checkbox-error-handling',
    properties: {
      id: '',
      name: 'checkbox-error-handling',
      type: 'checkbox',
      validators: [
        {
          type: 'requiredTrue',
          errorMessage: 'This field is required',
          priority: 1
        }
      ]
    }
  };

  private inputFormController: FormController = {
    type: 'text',
    name: 'input',
    properties: {
      id: '',
      name: 'input',
      type: 'text',
      validators: [
        {
          type: 'required',
          errorMessage: 'This field is required',
          priority: 1
        },
        {
          type: 'minLength',
          minLength: 3,
          errorMessage: 'Minlegth problem',
          priority: 2
        }
      ]
    }
  };

  private dropdownFormController: FormController = {
    type: 'text',
    name: 'input-dropdown',
    properties: {
      id: '',
      name: 'input-dropdown',
      type: 'text',
      validators: [
        {
          type: 'required',
          errorMessage: 'This field is required',
          priority: 1
        }
      ]
    }
  };

  public async componentWillLoad(): Promise<any> {
    this.breadcrumbsArray = this.history.location.pathname.split('/').slice(1);

    // const responseRadio: Response = await fetch(`${END_POINT.MOCKS}radio-button-list.json`);
    // const dataRadio: any = await responseRadio.json();
    // this.radioButtonList = [...dataRadio.list1];

    const responseForm: Response = await fetch(`${END_POINT.MOCKS}radio-button-list.json`);
    const dataForm: any = await responseForm.json();
    dataForm.form[0].controls = [
      this.formController,
      ...dataForm.form[0].controls,
      this.inputFormController,
      this.dropdownFormController
    ];

    this.form = new FormBuilder('form', dataForm.form);

    return;
  }

  private navigateTo(event: any): void {
    if (event.detail !== null) {
      if (event.detail > 0) {
        this.history.push(`${Environment.basePathWeb}/ui-showcase/${this.breadcrumbsArray[event.detail]}`);
      } else if (event.detail === 0) {
        this.history.push(`${Environment.basePathWeb}/${this.breadcrumbsArray[0]}`);
      }
    } else {
      this.history.push(`${Environment.basePathWeb}/ui-showcase`);
    }
  }

  private handleChange(value: any, id: string): void {
    logger.consoleLog('value', value);
    this.form.updateValue(value, id);
    this.formValidity = this.form.states.groupValidity;
    this.showCustomError = false;
  }

  private checkControl(name: string): boolean {
    return name === 'input';
  }

  private checkEvent(ev: any): void {
    let value: string = ev._controllers[0].controls.filter((control: ControlProperties) =>
      this.checkControl(control.name)
    )[0].value;
    if (value !== 'api-response') this.showCustomError = true;
  }

  public render(): any {
    return (
      <main class='main-container'>
        <rh-breadcrumbs
          breadcrumbs={this.breadcrumbsArray}
          onGoBack={(event: any) => this.navigateTo(event)}
          onGoBackTo={(event: any) => this.navigateTo(event)}
        />

        <form name={this.form.name}>

          <rh-divider hrShow={true} background={false} fullWidth={true} />
          <rh-list-item-5
            id='rh-list-item-5_3'
            padding={true}
            titleGray={true}
            title='rh-radio-buttons-list'
            subtitle='Technical component'
          />
          <rh-divider logoText={true} padding={true} text='Radio Button List' />
          <rh-radio-buttons-list
            id='rh-radio-buttons-list_1'
            title='Show radio buttons on mobile devices'
            radioButtonList={this.radioButtonList}
            formController={this.form.controllers[1].properties}
            isFormComponent={true}
            padding={true}
            disabled={true}
            onRadioCheck={(event: any) => { }}
            onChanged={(event: CustomEvent<any>) =>
              this.handleChange(event.detail.currentValue, this.form.controllers[1].name)
            }
          />

          <rh-divider logoText={true} padding={true} text='Radio Button List' />
          <rh-radio-buttons-list
            id='rh-radio-buttons-list_2'
            title='Show radio buttons on Desktop'
            radioButtonList={this.radioButtonList}
            formController={this.form.controllers[1].properties}
            isFormComponent={true}
            padding={true}
            showDesktopCol={true}
            disabled={false}
            onRadioCheck={(event: any) => { }}
            onChanged={(event: CustomEvent<any>) =>
              this.handleChange(event.detail.currentValue, this.form.controllers[1].name)
            }
          />

          <rh-divider logoText={true} padding={true} text='rh-checkbox' />
          <rh-checkbox
            id='rh-rectangular-checkbox-form_1'
            left={true}
            padding={true}
            text="check me"
            disabled={false}
            isFormComponent={true}
            formController={this.form.controllers[0].properties}
            onChanged={(event: CustomEvent<any>) =>
              this.handleChange(event.detail.currentValue, this.form.controllers[0].name)
            }
          />

          <rh-checkbox
            id='rh-rectangular-checkbox-form_2'
            left={true}
            padding={true}
            text="click me"
            checked={true}
            disabled={false}
            textError='Please accept the terms of use in order to continue to the next steps.'
            isFormComponent={true}
            formController={this.form.controllers[0].properties}
            onChanged={(event: CustomEvent<any>) =>
              this.handleChange(event.detail.currentValue, this.form.controllers[0].name)
            }
          />

          <rh-checkbox
            id='rh-rectangular-checkbox-form_2'
            left={true}
            padding={true}
            text="click me"
            disabled={true}
            isFormComponent={true}
            formController={this.form.controllers[0].properties}
            onChanged={(event: CustomEvent<any>) =>
              this.handleChange(event.detail.currentValue, this.form.controllers[0].name)
            }
          />

          <rh-divider hrShow={true} background={false} fullWidth={true} />
          <rh-list-item-5
            id='rh-list-item-5_4'
            padding={true}
            titleGray={true}
            title='rh-input-field-dropdown'
            subtitle='Technical component'
          />

          <rh-divider logoText={true} padding={true} text='rh-textbox' />
          <rh-textbox
            id='rh-textbox_1'
            disabled={false}
            label='Name'
            type='text'
            isFormComponent={true}
            formController={this.inputFormController.properties}
            onUpdate={event => this.handleChange(event.detail, this.inputFormController.name)}
            showCustomError={this.showCustomError}
            errorText='the text should be "api-response"'
            error={false}
            placeholder='Insert your name'
            padding={true}
          />

          <rh-divider logoText={true} padding={true} text='04.03.13 Text area' />
          <rh-textarea
            id='rh-textarea_1'
            padding={true}
            title='Label'
            text='Mr Montanari cut the line at the roundabout trying to take over. I had to break and lost control of my Multipla, ending on the guard rail'
            onUpdatedText={(event: any) => this.checkEvent(event)}
            placeholder='Placeholder...'
          />
          
          <rh-divider logoText={true} padding={true} text='rh-input-dropdown-form' />
          <rh-input-field-dropdown
            id='rh-input-field-dropdown_1'
            padding={true}
            label='Label'
            value={this.inputText}
            elementlist={this.dropdownList}
            placeholder='Please select'
            isFormComponent={true}
            formController={this.dropdownFormController.properties}
            onUpdate={(event: CustomEvent<any>) =>
              this.handleChange(event.detail.value.titleUp, this.dropdownFormController.name)
            }
          />
        </form>
      </main>
    );
  }
}
