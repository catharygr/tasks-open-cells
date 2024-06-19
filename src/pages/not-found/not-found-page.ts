import { LitElement,html } from "lit";
import { customElement } from "lit/decorators.js";
import { PageController } from "@open-cells/page-controller";

@customElement("not-found-page")
export class NotFound extends LitElement {
  pageController = new PageController(this);
  render () {
    return html`
      <h2>Lo sentimos,no hemos encontrado esa página, puedes volver a la home: </h2>
     <button @click=${() => this.pageController.navigate("home")}>Home</button>
      img
    `;
  }
}