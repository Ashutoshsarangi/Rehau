import { h } from "@stencil/core";
export class RhAccordianMolecule {
    constructor() {
        this.tabContainer = true;
        this.active = false;
    }
    componentDidLoad() {
        this.accordions.map((element) => {
            if (!element.active) {
                element.active = false;
            }
        });
    }
    select(accordion) {
        let index = this.accordions.indexOf(accordion);
        for (let i = 0; i < this.accordions.length; i++) {
            if (i === index) {
            }
            else {
                this.accordions[i].active = false;
            }
        }
        accordion.active = !accordion.active;
        this.accordions = [...this.accordions];
        this.onClick.emit(accordion);
    }
    handleScroll() {
        console.log('the body was scrolled');
    }
    render() {
        const tabContainerClass = {
            'tabContainer': true
        };
        return (h("div", null, this.accordions.length > 1 && (h("div", { ref: (el) => (this.containerAccordions = el) }, this.accordions.map((accordion) => (h("div", { class: { "tab tabOpen": accordion.active, "tab": !accordion.active }, onClick: () => this.select(accordion), ref: (el) => (this.scrollPosition = el) },
            h("label", { htmlFor: "chck", class: "tab-label", onClick: (event) => this.handleScroll() },
                h("h4", { class: "tab-title" },
                    accordion.accordTitle,
                    h("label", { class: { "label down-arrow": accordion.active, "label": !accordion.active } }, accordion.label)),
                h("span", { class: "tab-subtitle" },
                    accordion.subtitle,
                    accordion.badgeActive && (h("div", { class: 'col no-padding no-margin badgde-align' },
                        h("rh-badges", { badgetitle: accordion.badgetitle, badgeBgColor: accordion.badgeBgColor, badgeStatus: accordion.badgeStatus }))))),
            h("label", { class: Object.assign(Object.assign({}, tabContainerClass), { 'tab-active active-content': accordion.active }) }, accordion.active && h("span", { class: "tab-content" }, accordion.content)),
            h("rh-divider", { padding: false, hrShow: true, background: false, fullWidth: true }))))))));
    }
    static get is() { return "rh-accordian"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-accordian.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-accordian.molecule.css"]
    }; }
    static get properties() { return {
        "accordions": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<BasicAccordionModel>",
                "resolved": "BasicAccordionModel[]",
                "references": {
                    "Array": {
                        "location": "global"
                    },
                    "BasicAccordionModel": {
                        "location": "import",
                        "path": "../../../interfaces/basic-accordion-model"
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
    static get listeners() { return [{
            "name": "scroll",
            "method": "handleScroll",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
