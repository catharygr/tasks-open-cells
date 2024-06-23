import { LitElement, html, PropertyValueMap, css } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/select/outlined-select.js';
import '@material/web/select/select-option.js';
import '@material/web/button/filled-button.js';
import { Task } from '../../utils/types.js';
import { PageController } from '@open-cells/page-controller';
import { t, updateWhenLocaleResourcesChange } from '@open-cells/localize';
import '../../components/page-layout.js';

@customElement('edit-tasks-page')
export class EditTasksPage extends LitElement {
  pageControler = new PageController(this);
  editedTask: any;

  constructor() {
    super();
    // @ts-ignore
    updateWhenLocaleResourcesChange(this);
  }

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
      <page-layout>
        <form @submit=${this.editOldTask}>
          <md-outlined-select id="type">
            <md-select-option ?selected=${this.editedTask?.type === ''} value=""
              ><div slot="headline">${t('form-select')}</div></md-select-option
            >
            <md-select-option
              ?selected=${this.editedTask?.type === 'personal'}
              value="personal"
              ><div slot="headline">Personal</div></md-select-option
            >
            <md-select-option
              ?selected=${this.editedTask?.type === 'work'}
              value="work"
              ><div slot="headline">Work</div></md-select-option
            >
            <md-select-option
              ?selected=${this.editedTask?.type === 'shopping'}
              value="shopping"
              ><div slot="headline">Shopping</div></md-select-option
            >
          </md-outlined-select>
          <md-outlined-text-field
            value=${this.editedTask?.title}
            id="title"
            type="text"
            label=${t('form-title')}
            required
          ></md-outlined-text-field>
          <md-outlined-text-field
            value=${this.editedTask?.description}
            id="description"
            type="textarea"
            label=${t('form-description')}
            required
            rows="6"
          ></md-outlined-text-field>
          <md-outlined-text-field
            value=${this.editedTask?.tags.join(';')}
            id="tags"
            type="text"
            label=${t('form-tags')}
          ></md-outlined-text-field>
          <md-filled-button>${t('form-btn-edit')}</md-filled-button>
        </form>
      </page-layout>
    `;
  }

  editOldTask(e: Event) {
    e.preventDefault();
    this._task.id = this.editedTask?.id;
    this._task.type = this._type.value;
    this._task.title = this._title.value;
    this._task.description = this._description.value;
    this._task.tags = this._tags.value.split(';');

    fetch(`http://localhost:3000/tasks/${this._task.id}`, {
      method: 'PUT',
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
  }
}
