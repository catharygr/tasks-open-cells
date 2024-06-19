import { LitElement,html,css } from "lit";
import { customElement } from "lit/decorators.js";
import {t, updateWhenLocaleResourcesChange} from '@open-cells/localize';



@customElement("footer-component")
export class FooterComponent extends LitElement {
  constructor() {
    super();
    // @ts-ignore
    updateWhenLocaleResourcesChange(this);
  }
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
        <p>&copy; ${new Date().getFullYear()} ${t('footer-by')} Bubulazi</p>
      </footer>
    `;
  }
}