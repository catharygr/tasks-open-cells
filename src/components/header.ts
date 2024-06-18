import { LitElement,html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("header-component")
export class HeaderComponent extends LitElement {
  render () {
    return html`
      <header>
        <h1>HeaderComponent</h1>
      </header>
    `;
  }
}