import { h } from "@stencil/core";
export class rhIoniconMolecule {
    render() {
        let className = '';
        if (this.name) {
            if (this.name.indexOf('rh-i') > -1) {
                className = this.name;
            }
            else {
                let firstSplit = this.name.split('-')[0];
                if (firstSplit === 'ion') {
                    className = this.name;
                }
                else if (firstSplit === 'ios' || firstSplit === 'md') {
                    className = 'ion-' + this.name;
                }
                else if (firstSplit === 'icon') {
                    className = this.name;
                }
                else if (!!firstSplit) {
                    className = 'ion-md-' + this.name;
                }
            }
        }
        const classes = {
            icon: this.name && this.name.indexOf('rh-i') < 0 ? false : true,
            [className]: true
        };
        const styles = {
            'color': this.color,
            'font-size': this.size
        };
        return h("i", { class: classes, style: styles });
    }
    static get is() { return "rh-icon"; }
    static get originalStyleUrls() { return {
        "$": ["rh-icon.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-icon.molecule.css"]
    }; }
    static get properties() { return {
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "name",
            "reflect": false
        },
        "size": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "size",
            "reflect": false
        },
        "color": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "color",
            "reflect": false
        }
    }; }
}
