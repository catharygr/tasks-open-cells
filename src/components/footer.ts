import { LitElement,html,css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("footer-component")
export class FooterComponent extends LitElement {
  static styles = css`
    footer {
      text-align: center;
        & p {
        margin: 0;
     }
}
  `
  render() {
    
    return html`
      <footer>
        <p>&copy; ${new Date().getFullYear()} by Bubulazi</p>
      </footer>
    `;
  }
}