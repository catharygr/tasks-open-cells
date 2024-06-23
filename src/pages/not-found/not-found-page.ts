import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@material/web/button/filled-button.js';
import '../../components/page-layout.js';
import { t, updateWhenLocaleResourcesChange } from '@open-cells/localize';
import { PageController } from '@open-cells/page-controller';

@customElement('not-found-page')
export class NotFound extends LitElement {
  constructor() {
    super();
    // @ts-ignore
    updateWhenLocaleResourcesChange(this);
  }

  pageController = new PageController(this);

  static styles = css`
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
            margin-top: 1rem;
          }
            .not-description  {
              font-size: 2rem;
              font-weight: 900;
              }
  `;
  render() {
    return html`
      <page-layout>
        <div class="container-no-found">
          <h2>${t('not-title')}</h2>
          <md-filled-button
            class="btn-not-found"
            @click=${() => this.pageController.navigate('home')}
            >HOME</md-filled-button
          >
          <div class="all-together">
            <p class="not-description">${t('not-description')}</p>
            <img src="/images/not-found.jpeg" alt="Imagen de error" />
          </div>
        </div>
      </page-layout>
    `;
  }
}
