import { LitElement,html,css } from "lit";
import { customElement } from "lit/decorators.js";
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/select/outlined-select.js';
import '@material/web/select/select-option.js';
import '@material/web/button/filled-button.js';

@customElement("task-formulario")
export class TaskFormulario extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0 1rem;
        & last-child {
          margin-top: 1rem;
          }
    }
  `;
  render () {
    return html`

      <md-outlined-select label="Select a type">
        <md-select-option value="personal">Personal</md-select-option>
        <md-select-option value="work">Work</md-select-option>
        <md-select-option value="shopping">Shopping</md-select-option>
      </md-outlined-select>
      <md-outlined-text-field type="text" label="Title" required></md-outlined-text-field>
      <md-outlined-text-field type="textarea" label="Description" required rows="6"></md-outlined-text-field>
      <md-outlined-text-field type="text" label="Tags" ></md-outlined-text-field>
      <md-filled-button>Create</md-filled-button>
    `;
  }
}