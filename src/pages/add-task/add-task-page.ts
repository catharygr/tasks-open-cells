import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { t, updateWhenLocaleResourcesChange } from '@open-cells/localize';
import { Task } from '../../utils/types.js';
import { PageController } from '@open-cells/page-controller';

@customElement('add-tasks-page')
export class AddTasksPage extends LitElement {
  pageControler = new PageController(this);
  constructor() {
    super();
    // @ts-ignore
    updateWhenLocaleResourcesChange(this);
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      & h2 {
        text-align: center;
        font-size: 1rem;
        margin-top: 0;
      }
    }
  `;

  @state()
  private _task: Task = {
    id: '',
    title: '',
    description: '',
    tags: [],
    type: '',
  };

  static inbounds = {
    editedTask: {
      channel: 'ch_edited_task',
    },
  };

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
    return html`
      <form @submit=${!this.isEditing ? this.editOldTask : this.sendTask}>
        <md-outlined-select id="type">
          <md-select-option value="" selected></md-select-option>
          <md-select-option value="personal">Personal</md-select-option>
          <md-select-option value="work">Work</md-select-option>
          <md-select-option value="shopping">Shopping</md-select-option>
        </md-outlined-select>
        <md-outlined-text-field
          value=${this.isEditing ? this.editedTask?.title : this._task.title}
          id="title"
          type="text"
          label=${t('form-title')}
          required
        ></md-outlined-text-field>
        <md-outlined-text-field
          value=${this.isEditing
            ? this.editedTask?.description
            : this._task.description}
          id="description"
          type="textarea"
          label=${t('form-description')}
          required
          rows="6"
        ></md-outlined-text-field>
        <md-outlined-text-field
          value=${this.isEditing
            ? this.editedTask?.tags
            : this._task.tags.join(';')}
          id="tags"
          type="text"
          label=${t('form-tags')}
        ></md-outlined-text-field>
        <md-filled-button>${t('form-btn-create')}</md-filled-button>
      </form>
    `;
  }

  sendTask(e: Event) {
    e.preventDefault();
    this._task.id = crypto.randomUUID();
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this._task),
    })
      .then(() => {
        this._task = {
          id: '',
          title: '',
          description: '',
          tags: [],
          type: '',
        };
        this._type.value = '';
        this._title.value = '';
        this._description.value = '';
        this._tags.value = '';
        this.pageControler.navigate('home');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.isEditing = false;
  }

  // render() {
  //   return html` <h2>${t('add-task-title')}</h2> `;
  // }
}
