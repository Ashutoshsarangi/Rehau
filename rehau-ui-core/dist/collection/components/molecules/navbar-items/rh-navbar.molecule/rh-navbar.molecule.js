import { h } from "@stencil/core";
export class RhNavbar {
    select(tab) {
        this.tabs.map((element) => (element.active = false));
        tab.active = !tab.active;
        this.tabs = [...this.tabs];
        this.onClick.emit(tab);
    }
    render() {
        const firstRow = {
            'row-element display-align': true
        };
        const firstLabel = {
            'label-element': true
        };
        return (h("div", null,
            this.tabs.length > 1 && (h("div", { class: 'container-element no-padding', ref: (el) => (this.containerTabs = el) },
                h("div", { class: firstRow }, this.tabs.map((tab) => (h("div", { class: {
                        'col-element': !tab.active,
                        'col-element-selected': tab.active,
                        'no-padding': true
                    }, onClick: () => this.select(tab) },
                    h("div", { style: { width: '100%' } },
                        h("label", { class: Object.assign(Object.assign({}, firstLabel), { 'tab-active': tab.active, 'left-padding': !tab.active }) },
                            h("span", { class: "label-text" }, tab.label),
                            h("rh-icon", { class: 'icon tab-icon', name: tab.active ? tab.iconactive : tab.icon, color: 'var(--primaryColor, $primaryColor)', size: '18px' }, tab.notification && h("div", { class: 'notification' })))))))))),
            this.tabs.map((tab) => (tab.active && (h("div", null,
                h("slot", { name: tab.name })))))));
    }
    static get is() { return "rh-navbar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-navbar.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-navbar.molecule.css"]
    }; }
    static get properties() { return {
        "tabs": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<HorizontalTabMenuModel>",
                "resolved": "HorizontalTabMenuModel[]",
                "references": {
                    "Array": {
                        "location": "global"
                    },
                    "HorizontalTabMenuModel": {
                        "location": "import",
                        "path": "../../../interfaces/horizontal-tab-menu-model"
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
    static get states() { return {
        "containerSize": {}
    }; }
    static get events() { return [{
            "method": "onClick",
            "name": "onClick",
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
