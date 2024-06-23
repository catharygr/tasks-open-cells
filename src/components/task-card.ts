import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/web/icon/icon.js';
import { Task } from '../utils/types.js';

@customElement('task-card')
export class TaskCard extends LitElement {
  @property({ type: Object })
  task!: Task;

  static styles = css`
    .task-card {
      border: 1px solid #ccc;
      background-color: rgb(232, 231, 209);
      border-radius: 5px;
      padding: 0.8rem;
      margin: 0.5rem 1rem;
      & :first-child {
        margin-top: 0;
      }
      & h2 {
        font-size: 1rem;
        font-weight: 900;
      }
    }
    .ctrl-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #ccc;
      padding-top: 0.6rem;

      & .ctrl-task {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;

        & span {
          --md-icon-size: 0.75rem;
          border: 1px solid #ccc;
          padding: 0.25rem 0.5rem;
          border-radius: 5px;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        & md-icon {
          cursor: pointer;
        }
      }
    }
    .ctrl-btn {
      display: flex;
      gap: 0.8rem;

      & md-icon {
        cursor: pointer;
      }
    }
  `;

  render() {
    return html`
      <div class="task-card">
        <h2>${this.task.title}</h2>
        <p>${this.task.description}</p>
        <div class="ctrl-container">
          <div class="ctrl-task">
            ${this.task.tags.map(
              (tag: any) => html`<span>${tag} <md-icon>close</md-icon></span>`
            )}
          </div>
          <div class="ctrl-btn">
            <md-icon
              @click=${() =>
                this.dispatchEvent(
                  new CustomEvent('delete-task', {
                    detail: this.task,
                    bubbles: true,
                    composed: true,
                  })
                )}
              >delete</md-icon
            >
            <md-icon
              @click=${() =>
                this.dispatchEvent(
                  new CustomEvent('edit-task', {
                    detail: this.task,
                    bubbles: true,
                    composed: true,
                  })
                )}
              >edit</md-icon
            >
          </div>
        </div>
      </div>
    `;
  }
}
