import { LitElement,html,css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("task-formulario")
export class TaskFormulario extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: 1rem;
    }
  `;
  render () {
    return html`
      <h1>Task Formulario</h1>
  
    `;
  }
}