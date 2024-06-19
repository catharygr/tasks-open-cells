import { LitElement,html,css } from "lit";
import { customElement } from "lit/decorators.js";
import '@material/web/button/filled-button.js';


@customElement("not-found-page")
export class NotFound extends LitElement {


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
    return html`
    <div class="container-no-found">
      <h2>Lo sentimos, no hemos encontrado esa página, puedes volver a la home: </h2>
      <md-filled-button class="btn-not-found" @click=${() => window.location.href = '/'}>HOME</md-filled-button>
      <img src="/images/not-found.png" alt="Imagen de error"/>
    </div>
    `;
  }
}