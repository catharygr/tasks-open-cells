import { LitElement, html, PropertyValueMap, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
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
  [x: string]: any;

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

  static inbounds = {
    editedTask: {
      channel: 'ch_edited_task',
      data: {} as Task,
    },
  };

  static outbounds = {
    editedTask: {
      channel: 'ch_edited_task',
      data: {} as Task,
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
      this.editedTask.type = (e.target as HTMLSelectElement).value;
      this.requestUpdate();
    });
    this._title.addEventListener('input', (e) => {
      this.editedTask.title = (e.target as HTMLInputElement).value;
      this.requestUpdate();
    });
    this._description.addEventListener('input', (e) => {
      this.editedTask.description = (e.target as HTMLInputElement).value;
      this.requestUpdate();
    });
    this._tags.addEventListener('input', (e) => {
      this.editedTask.tags = (e.target as HTMLInputElement).value.split(';');
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

  onpageEnter() {
    this.updateFormFields();
  }

  editOldTask(e: Event) {
    e.preventDefault();

    fetch(`http://localhost:3000/tasks/${this.editedTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.editedTask),
    })
      .then(() => {
        this.pageControler.navigate('home');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  updateFormFields() {
    if (this.editedTask) {
      this._type.value = this.editedTask.type || '';
      this._title.value = this.editedTask.title || '';
      this._description.value = this.editedTask.description || '';
      this._tags.value = this.editedTask.tags.join(';') || '';
    }
  }
}
