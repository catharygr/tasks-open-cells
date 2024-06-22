import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@material/web/icon/icon.js';
import {
  t,
  updateWhenLocaleResourcesChange,
  setLang,
} from '@open-cells/localize';

@customElement('header-component')
export class HeaderComponent extends LitElement {
  [x: string]: any;
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

  static inbounds = {
    currentPage: { channel: '__oc_app' },
  };

  toggleLanguage() {
    setLang(document.documentElement.lang === 'en' ? 'es' : 'en');
  }

  render() {
    console.log(this.currentPage?.value.currentPage);
    return html`
      <header>
        <md-icon class="icon-arrow">arrow_back</md-icon>
        <h1>${t('app-title') ?? 'Taks App'}</h1>
        <md-icon @click=${this.toggleLanguage} class="icon-language"
          >language</md-icon
        >
      </header>
    `;
  }
}
