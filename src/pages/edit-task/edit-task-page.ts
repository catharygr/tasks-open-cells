import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../components/task-formulario.js';

@customElement('edit-tasks-page')
export class EditTasksPage extends LitElement {
  @property({ type: Object })
  params = {};

  render() {
    console;
    return html`
      <task-formulario isEditing .paramsTask=${this.params}></task-formulario>
    `;
  }
}
