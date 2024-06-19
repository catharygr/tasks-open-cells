import { LitElement,html,css } from "lit";
import { customElement,query } from "lit/decorators.js";
import { PageController } from "@open-cells/page-controller";
import '@material/web/textfield/outlined-text-field';
import '@material/web/button/filled-button.js';
import '@material/web/icon/icon.js';

@customElement("login-page")
export class LoginPage extends LitElement {
  controller = new PageController(this);

  @query('#pass-field')
  private  passField!: HTMLInputElement;

  static styles = css`
    :host {
      padding: 1.5rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
 
    & .form-container {
       display: grid;
       place-items: center;
       height: 100%;
       width: 100%;
       max-width: 80%
   
   }
     & form {
       display: grid;
       gap: 1rem;
       width: 100%;
    
       }
      & .show-pass {
        cursor: pointer;
        }
    }
  `;

  showPassword () {
    this.passField.type = this.passField.type === "password" ? "text" : "password";
  }

  loginUser (e: Event) {
    e.preventDefault();
   sessionStorage.setItem("userToken", crypto.randomUUID());
    this.controller.navigate("home");
  }
  render () {
    return html`
      <h1>Login Page</h1>
      <div class="form-container">
        <form @submit=${this.loginUser}>
          <md-outlined-text-field supporting-text="*requerid" type="text" required minLength="3" label="Username"></md-outlined-text-field>
           <md-outlined-text-field id="pass-field" supporting-text="*requerid" type="password" iconTrailing="visibility" label="Password"  minLength="8" required>
            <md-icon @click=${this.showPassword} class="show-pass" slot="trailing-icon">visibility</md-icon>
          </md-outlined-text-field>
           <md-filled-button type="submit">Login</md-filled-button>
        </form>
      </div>

    `;
  }
}