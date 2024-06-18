import { LitElement,html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("add-tasks-page")
export class AddTasksPage extends LitElement {
  render () {
    return html`
      <h1>Add Tasks Page</h1>
      <p>This is the add tasks page</p>
    `;
  }
}