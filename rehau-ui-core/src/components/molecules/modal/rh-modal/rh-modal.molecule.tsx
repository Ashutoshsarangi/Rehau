import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'rh-modal',
  styleUrl: 'rh-modal.molecule.scss',
  shadow: true
})
export class RhModal {
  @Prop() public modalHeader: string;
  @Prop() public modalMessage: string;
  @Prop() public actionText: string;

  public render(): any {
    return (
      <div>
        <div class="modal-backdrop fade show"></div>
        <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-inner">
                <div class="modal-header">
                  <h3 class="modal-title">{this.modalHeader}</h3>
                </div>
                <div class="modal-body">
                  <p class="copy">{this.modalMessage}</p>
                </div>
              </div>
              <div class="modal-footer">
                <rh-primary-button
                  id='rh-primary-button_1'
                  text={this.actionText}
                  icon="icon-next"
                  transparentbutton={true}
                  disabled={false}
                />
              </div>
            </div>
          </div>
        </div> 
      </div>
    );
  }
}
