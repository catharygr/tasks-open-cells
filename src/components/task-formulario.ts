import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, state, query, property } from 'lit/decorators.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/select/outlined-select.js';
import '@material/web/select/select-option.js';
import '@material/web/button/filled-button.js';
import { Task } from '../utils/types.js';
import { PageController } from '@open-cells/page-controller';

@customElement('task-formulario')
export class TaskFormulario extends LitElement {
  pageControler = new PageController(this);
  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0 1rem;
      & last-child {
        margin-top: 1rem;
      }
    }
  `;

  @state()
  private _task: Task = {
    id: 0,
    title: '',
    description: '',
    tags: [],
    type: '',
  };

  @property({ type: HTMLSelectElement })
  private _taskTypeSelect!: HTMLSelectElement;

  // @property({ type: Boolean })
  // private _isEditing = false;

  @query('#type')
  private _type!: HTMLSelectElement;
  @query('#title')
  private _title!: HTMLInputElement;
  @query('#description')
  private _description!: HTMLInputElement;
  @query('#tags')
  private _tags!: HTMLInputElement;

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    this._type.addEventListener('change', (e) => {
      this._task.type = (e.target as HTMLSelectElement).value;
      this.requestUpdate();
    });
    this._title.addEventListener('input', (e) => {
      this._task.title = (e.target as HTMLInputElement).value;
      this.requestUpdate();
    });
    this._description.addEventListener('input', (e) => {
      this._task.description = (e.target as HTMLInputElement).value;
      this.requestUpdate();
    });
    this._tags.addEventListener('input', (e) => {
      this._task.tags = (e.target as HTMLInputElement).value.split(';');
      this.requestUpdate();
    });
  }

  render() {
    console.log(this._task);
    return html`
      <form @submit=${this.sendTask}>
        <md-outlined-select
          id="type"
          label="Select a type"
          value=${this._task.type}
        >
          <md-select-option value="personal">Personal</md-select-option>
          <md-select-option value="work">Work</md-select-option>
          <md-select-option value="shopping">Shopping</md-select-option>
        </md-outlined-select>
        <md-outlined-text-field
          value=${this._task.title}
          id="title"
          type="text"
          label="Title"
          required
        ></md-outlined-text-field>
        <md-outlined-text-field
          value=${this._task.description}
          id="description"
          type="textarea"
          label="Description"
          required
          rows="6"
        ></md-outlined-text-field>
        <md-outlined-text-field
          value=${this._task.tags.join(';')}
          id="tags"
          type="text"
          label="Tags"
        ></md-outlined-text-field>
        <md-filled-button>Create</md-filled-button>
      </form>
    `;
  }

  sendTask(e: Event) {
    e.preventDefault();
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this._task),
    })
      .then(() => {
        this.pageControler.navigate('home');
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this._task = {
      id: 0,
      title: '',
      description: '',
      tags: [],
      type: '',
    };
    this._type.value = '';
    this._title.value = '';
    this._description.value = '';
    this._tags.value = '';
  }
}
