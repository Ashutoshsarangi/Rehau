import { h } from "@stencil/core";
export class RhListItemCheckMolecule {
    selectedChecked(item) {
        const index = this.itemList.indexOf(item);
        for (let i = 0; i < this.itemList.length; i++) {
            if (i == index) {
                this.itemList[i].active = true;
            }
            else {
                this.itemList[i].active = false;
            }
        }
        this.itemList = [...this.itemList];
        this.checked.emit(event);
    }
    render() {
        const divClass = {
            'shape-padding row no-margin': true
        };
        const divStyle = {
            'box-sizing': 'border-box',
            'background-color': '#FFFFFF'
        };
        const firstLabelDiv = {
            'col-xs main-column no-padding': true
        };
        const labelStyle = {
            'text-wrap no-padding title-with-padding1': true,
        };
        const rightIconClass = {
            'icon': true
        };
        return (h("div", null, this.itemList.length > 1 && (h("div", { ref: (el) => (this.containerItemList = el) }, this.itemList.map((item, index) => (h("div", { class: divClass, style: divStyle, onClick: () => this.selectedChecked(item) },
            h("div", { class: firstLabelDiv },
                h("label", { class: labelStyle }, item.title)),
            item.active && (h("div", { class: 'col-1 no-margin' },
                h("rh-icon", { class: rightIconClass, name: 'icon-checkmark', size: '18px', color: 'var(--primaryColor, $primaryColor)' }))))))))));
    }
    static get is() { return "rh-list-item-check"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-list-item-check.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-list-item-check.molecule.css"]
    }; }
    static get properties() { return {
        "itemList": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<ListItemVariation3>",
                "resolved": "ListItemVariation3[]",
                "references": {
                    "Array": {
                        "location": "global"
                    },
                    "ListItemVariation3": {
                        "location": "import",
                        "path": "../../../interfaces/list-item-variation3"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
    static get events() { return [{
            "method": "checked",
            "name": "checkEvent",
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
            "method": "fire",
            "name": "statusUpdate",
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
