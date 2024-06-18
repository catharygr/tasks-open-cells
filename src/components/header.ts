import { LitElement,html,css } from "lit";
import { customElement } from "lit/decorators.js";
import "@material/web/icon/icon.js"

@customElement("header-component")
export class HeaderComponent extends LitElement {

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
        }
     
      }
  `;
  render () {
    return html`
      <header>
       <md-icon class="icon-arrow">arrow_back</md-icon>
        <h1>Tasker App</h1>
       <md-icon class="icon-language">language</md-icon>
      </header>
    `;
  }
}