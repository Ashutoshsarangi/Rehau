import { Component, Prop, h, Element } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import mermaid from '../../../node_modules/mermaid/dist/mermaid.min';
import marked from '../../../node_modules/marked/marked.min';

@Component({
  tag: 'markdown-reader',
  styleUrl: 'markdown-reader.scss'
})
export class MarkdownReaderPage {
  @Prop() public history: RouterHistory;
  @Element() public element: HTMLElement;

  private id: string;
  private name: string;
  private md: string;

  public async componentWillLoad(): Promise<any> {
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

  public componentDidLoad(): void {
    this.element
      .querySelector('#md-container-section')
      .querySelectorAll('.mermaid, .language-mermaid')
      .forEach((elem, index) => {
        const innerText: string = elem.textContent;
        elem.id = `graph-${new Date().valueOf() + index}`;
        mermaid.render(elem.id, innerText, svgCode => {
          elem.innerHTML = svgCode;
        });
      });
  }

  public render(): any {
    return (
      <main class='main-container'>
        <header class='default-header'>
          <div class='default-header__content container-fluid'>
            <h1>{this.name}</h1>
          </div>
        </header>
        <section class='page container-fluid' id='md-container-section' innerHTML={this.md} />
      </main>
    );
  }
}
