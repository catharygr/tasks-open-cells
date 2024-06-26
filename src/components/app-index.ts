// @ts-nocheck
import { startApp } from '@open-cells/core';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../router/routes.js';
import { styles } from './app-index.css.js';
import type { NavigationWithParams } from '@open-cells/core/types';
import './header.ts';
import './footer.ts';

startApp({
  routes,
  mainNode: 'app-content',
  persistentPages: ['home'],
  interceptor: function (navigation: NavigationWithParams) {
    let intercept = false;
    let redirect;

    if (
      !sessionStorage.getItem('userToken') &&
      navigation.to?.page !== 'login'
    ) {
      intercept = true;
      redirect = { page: 'login', params: {} };
    }
    if (
      sessionStorage.getItem('userToken') &&
      navigation.to?.page === 'login'
    ) {
      intercept = true;
      redirect = { page: 'home', params: {} };
    }
    return { intercept, redirect };
  },
});

@customElement('app-index')
export class AppIndex extends LitElement {
  elementController = new ElementController(this);

  static styles = styles;

  render() {
    return html`
      <header-component></header-component>
      <main role="main" tabindex="-1">
        <slot></slot>
      </main>
      <footer-component></footer-component>
    `;
  }
}
