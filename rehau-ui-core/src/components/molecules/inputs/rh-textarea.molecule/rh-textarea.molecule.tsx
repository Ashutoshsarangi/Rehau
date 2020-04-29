import { Component, Prop, h, EventEmitter, Event, State, Element } from '@stencil/core';


@Component({
  tag: 'rh-textarea',
  styleUrl: 'rh-textarea.molecule.scss',
  shadow: true
})
export class MhFreeTextMolecule {
  @Element() private element: HTMLElement;

  @Prop({ attribute: 'title' }) public componentTitle: string;
  @Prop() public text: string = '';
  @Prop() public maxLenght: number;
  @Prop() public placeholder: string;
  @Prop() public padding: boolean;
  @State() private value: string;

  @Event({ eventName: 'updatedText' }) public updatedText: EventEmitter<any>;

  private savedText: string = '';

  public componentWillLoad(): void {
    this.value = this.text.substring(0, this.maxLenght).trim();
    this.savedText = this.value;
  }

  private keyPressed(): void {
    let textarea: HTMLTextAreaElement = this.element.shadowRoot.querySelector('textarea');
    this.value = textarea.value.substring(0, this.maxLenght).replace(/  +/g, ' ');
    textarea.value = this.value;
  }

  public render(): any {
    return (
      <div class={'grid main-grid' + (this.padding ? ' box-padding' : '')}>
          <div class='col-xs no-padding'>
            <label class='label'>{this.componentTitle}</label>
          </div>

        <div class='row middle-xs'>
          <div class='col-xs textarea-container'>
            <textarea
              placeholder={this.placeholder}
              maxlength={this.maxLenght}
              onKeyUp={() => this.keyPressed()}
              onKeyDown={() => this.keyPressed()}
            >
              {this.value}
            </textarea>
          </div>
        </div>
      </div>
    );
  }
}
