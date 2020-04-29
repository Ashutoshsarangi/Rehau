import { h } from "@stencil/core";
export class RhHome {
    static get is() { return "rh-home"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-home.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-home.molecule.css"]
    }; }
}
