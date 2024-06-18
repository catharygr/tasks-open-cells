import { LitElement,html,css } from "lit";
import { customElement } from "lit/decorators.js";



@customElement("footer-component")
export class FooterComponent extends LitElement {
  static styles = css`
    footer {
      text-align: center;
      padding: 0.6rem;
        & p {
        margin: 0;
        font-weight: bold;
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