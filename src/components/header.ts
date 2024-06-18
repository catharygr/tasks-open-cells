import { LitElement,html,css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("header-component")
export class HeaderComponent extends LitElement {

  static styles = css`
    header {
      display: grid;
      grid-template-columns: repeat(3, 1fr);

       & h1 {
       text-align: center;
       font-size: 1rem;
       }
     
      }
  `;
  render () {
    return html`
      <header>
        <h1>HeaderComponent</h1>
        <h1>Toker</h1>
        <h1>HeaderComponent</h1>
      </header>
    `;
  }
}