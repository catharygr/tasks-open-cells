import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('page-layout')
export class PageLayout extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      owerflow: hidden;
      height: 100%;
    }

    .scroller {
      heigth: 100%;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      // border: 4px solid black;
    }
  `;

  render() {
    return html`
      <div class="scroller">
        <slot></slot>
      </div>
    `;
  }
}
