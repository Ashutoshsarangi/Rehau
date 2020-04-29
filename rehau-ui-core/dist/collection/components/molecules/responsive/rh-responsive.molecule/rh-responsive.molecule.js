import { h } from "@stencil/core";
import { ResponsiveController } from '../responsive.controller';
export class MhResponsiveMolecule {
    constructor() { }
    componentWillLoad() {
        const responsiveController = new ResponsiveController();
        this.resizeSubscription = responsiveController.resizeDispatcher().subscribe(([breakpoint]) => {
            this.currentBreakpoint = breakpoint;
        });
    }
    componentDidUnload() {
        this.resizeSubscription.unsubscribe();
    }
    render() {
        return this.breakpoints.includes(this.currentBreakpoint[0]) ? h("slot", null) : {};
    }
    static get is() { return "rh-responsive"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-responsive.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-responsive.molecule.css"]
    }; }
    static get properties() { return {
        "breakpoints": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Breakpoints[]",
                "resolved": "(string | number)[]",
                "references": {
                    "Breakpoints": {
                        "location": "import",
                        "path": "../responsive.controller"
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
        "currentBreakpoint": {}
    }; }
}
