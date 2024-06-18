import { LitElement,html,css } from "lit";
import { customElement } from "lit/decorators.js";
import '@material/web/textfield/outlined-text-field';
import '@material/web/button/filled-button.js';

@customElement("login-page")
export class LoginPage extends LitElement {

  static styles = css`
    :host {

    
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
  `;
  render () {
    return html`
      <h1>Login Page</h1>
      <form>
        <md-outlined-text-field label="username" required ></md-outlined-text-field>
         <md-outlined-text-field label="password" required></md-outlined-text-field>
         <md-filled-button>Login</md-filled-button>
      </form>

    `;
  }
}