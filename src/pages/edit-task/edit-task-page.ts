import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
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

  @property({ type: Object })
  private params = {
    id: '',
    title: '',
    description: '',
    type: '',
    tags: '',
  };

  @query('#type')
  private _type!: HTMLSelectElement;
  @query('#title')
  private _title!: HTMLInputElement;
  @query('#description')
  private _description!: HTMLInputElement;
  @query('#tags')
  private _tags!: HTMLInputElement;

  updated(changedProperties: { has: (arg0: string) => any }) {
    if (changedProperties.has('params')) {
      this._type.value = this.params.type;
      this._title.value = this.params.title;
      this._description.value = this.params.description;
      this._tags.value = this.params.tags.replace(/,/g, ';');
    }
  }

  render() {
    return html`
      <page-layout>
        <form @submit=${this.editOldTask}>
          <md-outlined-select id="type">
            <md-select-option ?selected=${this.params?.type === ''} value=""
              ><div slot="headline">${t('form-select')}</div></md-select-option
            >
            <md-select-option
              ?selected=${this.params?.type === 'personal'}
              value="personal"
              ><div slot="headline">Personal</div></md-select-option
            >
            <md-select-option
              ?selected=${this.params?.type === 'work'}
              value="work"
              ><div slot="headline">Work</div></md-select-option
            >
            <md-select-option
              ?selected=${this.params?.type === 'shopping'}
              value="shopping"
              ><div slot="headline">Shopping</div></md-select-option
            >
          </md-outlined-select>
          <md-outlined-text-field
            id="title"
            type="text"
            label=${t('form-title')}
            required
          ></md-outlined-text-field>
          <md-outlined-text-field
            id="description"
            type="textarea"
            label=${t('form-description')}
            required
            rows="6"
          ></md-outlined-text-field>
          <md-outlined-text-field
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
    const taskToSend: Task = {
      id: this.params.id,
      title: this._title.value,
      description: this._description.value,
      type: this._type.value,
      tags: this._tags.value.split(';'),
    };
    fetch(`http://localhost:3000/tasks/${taskToSend.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskToSend),
    })
      .then(() => {
        this.pageControler.navigate('home');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
