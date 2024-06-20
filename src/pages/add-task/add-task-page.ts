import { LitElement,html, css} from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/task-formulario.ts"
import {t, updateWhenLocaleResourcesChange} from '@open-cells/localize';

@customElement("add-tasks-page")
export class AddTasksPage extends LitElement {
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


  render () {
    return html`
   
      <h2>${t("add-task-title")}</h2>
      <task-formulario></task-formulario>
     
    `;
  }
}