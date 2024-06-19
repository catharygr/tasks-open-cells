import { LitElement,html,css } from "lit";
import { customElement, state } from "lit/decorators.js";
import '@material/web/button/filled-button.js';
import {t, updateWhenLocaleResourcesChange} from '@open-cells/localize';


@customElement("not-found-page")
export class NotFound extends LitElement {
  constructor() {
    super();
    // @ts-ignore
    updateWhenLocaleResourcesChange(this);
  }

  @state()
  private _lenguage = '';
  private _alt = 'en';


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


  render () {
    const imageName = this._lenguage === 'es' ? 'not-found-es.png' : 'not-found-en.png';
    const altName = this._alt === 'es' ? 'Imágenes de droides' : 'Images of droids';
    return html`
    <div class="container-no-found">
      <h2>${t('not-title')}</h2>
      <md-filled-button class="btn-not-found" @click=${() => window.location.href = '/'}>HOME</md-filled-button>
      <img src="/images/${imageName}" alt=${altName}/>
    </div>
    `;
  }
}


// Estos no son los droides que estás buscando.
// We're sorry, we couldn't find that page. You can go back to the home page: