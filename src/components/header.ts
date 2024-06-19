import { LitElement,html,css } from "lit";
import { customElement } from "lit/decorators.js";
import "@material/web/icon/icon.js"
import {t, updateWhenLocaleResourcesChange, setLang} from '@open-cells/localize';

@customElement("header-component")
export class HeaderComponent extends LitElement {
  constructor() {
    super();
    // @ts-ignore
    updateWhenLocaleResourcesChange(this);
  }

  static styles = css`
    header {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 0.5rem 1rem;

       & h1 {
       text-align: center;
       font-size: 1rem;
       margin: 0;
       place-self: center;
       }

        & .icon-arrow {
        place-self: center start;
        }
        & .icon-language {
        place-self: center end;
        cursor: pointer;
        }
     
      }
  `;

  toggleLanguage() {
    setLang(document.documentElement.lang === 'en' ? 'es' : 'en')
  }

  render () {
    return html`
      <header>
       <md-icon class="icon-arrow">arrow_back</md-icon>
        <h1>${t('app-title') ?? "Taks App"}</h1>
       <md-icon @click=${this.toggleLanguage} class="icon-language">language</md-icon>
      </header>
    `;
  }
}