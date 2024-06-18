import { LitElement,html,css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("login-page")
export class LoginPage extends LitElement {
  render () {
    return html`
      <h1>Login Page</h1>
      <p>This is the login page</p>
    `;
  }
}