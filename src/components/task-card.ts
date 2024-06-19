import { LitElement,html,css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("task-card")
export class TaskCard extends LitElement {

  @property({ type: Object }) task: any;
  static styles = css`
    .task-card {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      margin: 10px;
    }
  `;

  render () {
    return html`
      <div class="task-card">
        <h2>Task Card</h2>
        <p>This is a task card</p>
      </div>
    `;
  }
}