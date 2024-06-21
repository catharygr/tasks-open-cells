import { RouteDefinition } from '@open-cells/core/types';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    name: 'home',
    component: 'home-page',
    action: async () => {
      await import('../pages/home/home-page.js');
    },
  },
  {
    path: '/login',
    name: 'login',
    component: 'login-page',
    action: async () => {
      await import('../pages/login/login-page.js');
    },
  },
  {
    path: '/tasks/add',
    name: 'add-task',
    component: 'add-tasks-page',
    action: async () => {
      await import('../pages/add-task/add-task-page.js');
    },
  },
  {
    path: '/tasks/edit/:taskId',
    name: 'edit-task',
    component: 'edit-tasks-page',
    action: async () => {
      await import('../pages/edit-task/edit-task-page.js');
    },
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: 'not-found-page',
    notFound: true,
    action: async () => {
      await import('../pages/not-found/not-found-page.js');
    },
  },
];
