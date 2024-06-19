import { html, LitElement } from 'lit';
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
  fetch('http://localhost:3000/tasks')
  .then(response =>response.json())
  .then(data => this.allTaks = data)
  .catch(error => this.errTask = error.message || "Error fetching tasks");



 }

  render() {
    console.log(this.allTaks)
    return html`
    <p>${this.errTask ? this.errTask : ""}</p>
    ${this.allTaks?.map((task: any) => html`<task-card .task=${task}>}</task-card>`)}
      <button @click="${() => this.pageController.navigate('login')}">Go to login page</button>
    `;
  }
}
