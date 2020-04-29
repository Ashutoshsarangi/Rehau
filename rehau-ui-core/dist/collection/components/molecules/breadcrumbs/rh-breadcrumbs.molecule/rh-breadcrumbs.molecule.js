import { h } from "@stencil/core";
import * as platform from '../../../../utils/platform-utils';
export class RhBreadcrumbsMolecule {
    constructor() {
        this.breadcrumbs = [];
    }
    componentWillLoad() {
        if (platform.isPlatform('browser')) {
            this.isWeb = true;
        }
        else {
            this.isWeb = false;
        }
    }
    goBackTo(index, last) {
        if (!last) {
            if (index !== 0)
                this.goBackToEmitter.emit(index);
            else
                this.goBack();
        }
    }
    goBackToRoot() {
        this.goBackToEmitter.emit(0);
    }
    goBack() {
        this.goBackEmitter.emit();
    }
    render() {
        return (h("div", null, this.breadcrumbs.length > 1 && this.isWeb && (h("div", { class: 'grid no-padding' },
            h("div", { class: 'row' },
                h("div", { class: 'breadcrumbs_container col-xs-12' },
                    h("rh-responsive", { breakpoints: ['L', 'XL'] },
                        this.breadcrumbs.length > 1 && (h("div", { class: 'crumbs_icon', onClick: () => this.goBack() },
                            h("rh-icon", { style: { 'cursor': 'pointer', 'margin-right': '7px' }, name: 'icon-next', size: '12px' }),
                            h("label", { class: 'prova' }, "Back"))),
                        h("div", { class: 'crumbs_icon' }, this.breadcrumbs.map((crumb, index, array) => (h("slot", null, index === 0 ? (h("slot", null,
                            h("label", { class: 'prova', onClick: () => this.goBackToRoot() }, crumb),
                            this.breadcrumbs.length >= 1 && (h("rh-icon", { name: 'icon-next', size: '12px' })))) : (h("slot", null,
                            h("label", { class: 'prova', onClick: () => this.goBackTo(index, index + 1 === array.length), style: {
                                    'font-weight': index + 1 === array.length ? 'bold' : 'normal',
                                    'cursor': index + 1 === array.length ? 'auto' : ''
                                } }, crumb),
                            this.breadcrumbs[index + 1] && (h("rh-icon", { name: 'icon-next', size: '12px' }))))))))),
                    h("rh-responsive", { breakpoints: ['S', 'M'] },
                        h("div", { class: 'sm-crumbs' },
                            h("rh-icon", { style: { 'margin-right': '7px' }, class: 'sm-back-icon', name: 'icon-next', size: '12px' }),
                            h("div", { class: 'sm-back-crumb', onClick: () => this.goBackTo(this.breadcrumbs.length - 2, false) },
                                h("label", null, this.breadcrumbs[this.breadcrumbs.length - 2])),
                            h("label", { class: 'crumbs-divider' }, "|"),
                            h("div", { class: 'sm-current-crumb' },
                                h("label", { class: 'label-SM text-wrap' }, this.breadcrumbs[this.breadcrumbs.length - 1]))))))))));
    }
    static get is() { return "rh-breadcrumbs"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-breadcrumbs.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-breadcrumbs.molecule.css"]
    }; }
    static get properties() { return {
        "breadcrumbs": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<string>",
                "resolved": "string[]",
                "references": {
                    "Array": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        }
    }; }
    static get events() { return [{
            "method": "goBackEmitter",
            "name": "goBack",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "goBackToEmitter",
            "name": "goBackTo",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
}
