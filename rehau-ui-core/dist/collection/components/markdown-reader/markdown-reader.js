import { h } from "@stencil/core";
import mermaid from '../../../node_modules/mermaid/dist/mermaid.min';
export class MarkdownReaderPage {
    async componentWillLoad() {
        // mermaid.initialize({ startOnLoad: true });
        // this.id = this.history.location.query.id;
        // await import('../../assets/mocks/readmes.json').then((readmes: any) => {
        //   const json: { [key: string]: { name: string; md: string } } = readmes.default;
        //   if (json[this.id]) {
        //     this.name = json[this.id].name;
        //     this.md = marked(json[this.id].md);
        //   }
        // });
    }
    componentDidLoad() {
        this.element
            .querySelector('#md-container-section')
            .querySelectorAll('.mermaid, .language-mermaid')
            .forEach((elem, index) => {
            const innerText = elem.textContent;
            elem.id = `graph-${new Date().valueOf() + index}`;
            mermaid.render(elem.id, innerText, svgCode => {
                elem.innerHTML = svgCode;
            });
        });
    }
    render() {
        return (h("main", { class: 'main-container' },
            h("header", { class: 'default-header' },
                h("div", { class: 'default-header__content container-fluid' },
                    h("h1", null, this.name))),
            h("section", { class: 'page container-fluid', id: 'md-container-section', innerHTML: this.md })));
    }
    static get is() { return "markdown-reader"; }
    static get originalStyleUrls() { return {
        "$": ["markdown-reader.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["markdown-reader.css"]
    }; }
    static get properties() { return {
        "history": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "RouterHistory",
                "resolved": "RouterHistory",
                "references": {
                    "RouterHistory": {
                        "location": "import",
                        "path": "@stencil/router"
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
    static get elementRef() { return "element"; }
}
