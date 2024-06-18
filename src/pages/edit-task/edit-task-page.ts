import { LitElement,html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("edit-tasks-page")
export class EditTasksPage extends LitElement {
  render () {
    return html`
      <h1>Edit Tasks Page</h1>
      <p>This is the edit tasks page</p>
    `;
  }
}