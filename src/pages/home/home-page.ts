import { html, LitElement, PropertyValueMap, css } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement, state } from 'lit/decorators.js';
import { Task } from '../../utils/types.js';
import '@material/web/button/elevated-button.js';
import '@material/web/icon/icon.js';
import '../../components/task-card.js';
import '../../components/page-layout.js';

@customElement('home-page')
export class HomePage extends LitElement {
  [x: string]: any;
  pageController = new PageController(this);

  static styles = css`
    :host {
      position: relative;
    }
    .new-task {
      position: absolute;
      bottom: 4rem;
      right: 1.5rem;
      font-size: 2rem;
      padding: 1.2rem;
      cursor: pointer;
      --md-elevated-button-container-shape: 10px;
      --md-sys-color-surface-container-low: rgb(231, 223, 236);
    }
  `;

  static inbounds = {
    allTaks: { channel: 'ch_all_tasks' },
  };

  static outbounds = {
    allTaks: { channel: 'ch_all_tasks' },
  };

  @state()
  private errTask: String = '';

  onPageEnter() {
    this.fetchTasks();
  }

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    this.shadowRoot?.addEventListener('delete-task', (payload: any) => {
      this.deleteTask(payload.detail);
    });
    this.shadowRoot?.addEventListener('edit-task', (payload: any) => {
      this.editTask(payload.detail);
    });
    this.shadowRoot?.addEventListener('remove-tag', (payload: any) => {
      this.removeTag(payload.detail);
    });
  }

  render() {
    return html`
      <page-layout>
        ${this.errTask ? this.errTask : ''}
        ${this.allTaks?.map(
          (task: Task) => html`<task-card .task=${task}>}</task-card>`
        )}
        <md-elevated-button
          @click=${() => this.pageController.navigate('add-task')}
          class="new-task"
          ><md-icon>add</md-icon></md-elevated-button
        >
      </page-layout>
    `;
  }
  // Métodos

  fetchTasks() {
    fetch('http://localhost:3000/tasks')
      .then((response) => response.json())
      .then((data) => (this.allTaks = data))
      .catch(
        (error) => (this.errTask = error.message || 'Error fetching tasks')
      );
  }

  deleteTask(task: Task) {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        this.fetchTasks();
      })
      .catch(
        (error) => (this.errTask = error.message || 'Error deleting task')
      );
  }

  editTask(task: Task) {
    this.pageController.navigate('edit-task', { taskId: task.id, ...task });
  }
  removeTag(task: Task) {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(() => {
        this.fetchTasks();
      })
      .catch((error) => (this.errTask = error.message || 'Error removing tag'));
  }
}
