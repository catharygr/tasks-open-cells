import { html, LitElement, PropertyValueMap } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement, state } from 'lit/decorators.js';
import "../../components/task-card.ts";


@customElement('home-page')
export class HomePage extends LitElement {
  [x: string]: any;
  pageController = new PageController(this);

  static inbounds = {
    allTaks: {channel: 'ch_all_tasks'}
  };

 static outbounds = {
  allTaks: {channel: 'ch_all_tasks'}
 };

 @state()
 private errTask: String = '';

 onPageEnter() {
   this.fetchTasks();
}

protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
  this.shadowRoot?.addEventListener('delete-task', (payload: any) => {
    this.deleteTask(payload.detail);
  }
  )
  this.shadowRoot?.addEventListener('edit-task', (payload: any) => {
    this.editTask(payload.detail);
  }
  )
  
}

render() {
  console.log(this.allTaks)
  return html`
    <p>${this.errTask ? this.errTask : ""}</p>
    ${this.allTaks?.map((task: any) => html`<task-card .task=${task}>}</task-card>`)}
    <button @click="${() => this.pageController.navigate('not-found')}">Go to not page</button>
    `;
  }
  // Métodos
  
  fetchTasks() {
      fetch('http://localhost:3000/tasks')
      .then(response =>response.json())
      .then(data => this.allTaks = data)
      .catch(error => this.errTask = error.message || "Error fetching tasks");
    }

    deleteTask(task: any) {
      fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'DELETE',
      })
      .then(() => {
        this.fetchTasks();
      })
      .catch(error => this.errTask = error.message || "Error deleting task");
    }

    editTask(task: any) {
      console.log(task);
    }

}
