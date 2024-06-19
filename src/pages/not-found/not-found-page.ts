import { LitElement,html,css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import '@material/web/button/filled-button.js';
import {t, updateWhenLocaleResourcesChange} from '@open-cells/localize';


@customElement("not-found-page")
export class NotFound extends LitElement {
  constructor() {
    super();
    // @ts-ignore
    updateWhenLocaleResourcesChange(this);
  }

  @property({type: String}) public language = 'en';

  @state()
  private _imageName = 'not-found-en.png';
  private _alt = 'Images of droids';
  private _cacheBuster = Date.now();




  static styles = css `
  .container-no-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: rem;
    padding: 1.6rem;

      & .btn-not-found {
        align-self: flex-start;
    
        }
        img {
            width: 100%;
            max-width: 500px;
            margin-top: 2rem;
          }
  `;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('language')) {
      this._imageName = this.language === 'es' ? 'not-found-es.png' : 'not-found-en.png';
      this._alt = this.language === 'es' ? 'Imágenes de droides' : 'Images of droids';
      this._cacheBuster = Date.now();
    }
  }

  setLanguage(newLanguage: string) {
    this.language = newLanguage;
    this.requestUpdate();
  }


  render() {
    return html`
    <div class="container-no-found">
      <h2>${t('not-title')}</h2>
      <md-filled-button class="btn-not-found" @click=${() => window.location.href = '/'}>HOME</md-filled-button>
      <img src="/images/${this._imageName}?${this._cacheBuster}" alt=${this._alt}/>
    </div>
    `;
  }
}


