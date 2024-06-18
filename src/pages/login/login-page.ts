import { LitElement,html,css } from "lit";
import { customElement } from "lit/decorators.js";
import '@material/web/textfield/outlined-text-field';
import '@material/web/button/filled-button.js';

@customElement("login-page")
export class LoginPage extends LitElement {

  static styles = css`
    :host {
    padding: 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    }
     & .form-container {
        display: grid;
        place-items: center;
        height: 100%;
        width: 100%;
        max-width: 80%
    }
    form {
        display: grid;
        gap: 1rem;
        width: 100%;
        }
  `;
  render () {
    return html`
      <h1>Login Page</h1>
      <div class="form-container">
        <form>
          <md-outlined-text-field supporting-text="*requerid" type="text"  label="Username"     required minLength="3" ></md-outlined-text-field>
           <md-outlined-text-field supporting-text="*requerid" type="text" iconTrailing="visibility" label="Password"  minLength="8" required>
            <md-icon slot="trailing-icon">visibility</md-icon>
          </md-outlined-text-field>
           <md-filled-button>Login</md-filled-button>
        </form>
      </div>

    `;
  }
}