import { LitElement,html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("not-found-page")
export class NotFound extends LitElement {
  render () {
    return html`
      <h1>404 Page</h1>
      <p>This is the 404 page</p>
    `;
  }
}