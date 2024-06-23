import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { t, updateWhenLocaleResourcesChange } from '@open-cells/localize';
import { Task } from '../../utils/types.js';
import { PageController } from '@open-cells/page-controller';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/select/outlined-select.js';
import '@material/web/select/select-option.js';
import '@material/web/button/filled-button.js';
import '../../components/page-layout.js';

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
        <h2>${t('add-task-title')}</h2>
        <form @submit=${this.sendTask}>
          <md-outlined-select id="type">
            <md-select-option value="" selected
              ><div slot="headline">${t('form-select')}</div></md-select-option
            >
            <md-select-option value="personal"
              ><div slot="headline">Personal</div></md-select-option
            >
            <md-select-option value="work"
              ><div slot="headline">Work</div></md-select-option
            >
            <md-select-option value="shopping"
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
          <md-filled-button>${t('form-btn-add')}</md-filled-button>
        </form>
      </page-layout>
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
  }
}
