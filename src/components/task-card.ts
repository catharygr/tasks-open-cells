import { LitElement,html,css } from "lit";
import { customElement, property } from "lit/decorators.js";
import '@material/web/icon/icon.js';


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
        <h2>${this.task.title}</h2>
        <p>${this.task.description}</p>
        <div>
          <div>
            ${this.task.tags.map((tag: any) => html`<span>${tag}</span>`)}
          </div>
          <div>
            <button @click=${() => this.dispatchEvent(new CustomEvent('edit-task', { detail: this.task }))}>Edit</button>
            <button @click=${() => this.dispatchEvent(new CustomEvent('delete-task', { detail: this.task }))}>Delete</button>

          </div>

        </div>
      </div>
    `;
  }
}