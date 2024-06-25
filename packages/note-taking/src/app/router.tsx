import { createRouter, RouterProvider, RootRoute, Route } from '@tanstack/react-router';
import React from 'react';

import Create_note_page from './pages/create_note_page.tsx';
import Edit_note_page from './pages/edit_note_page.tsx';
import Home_page from './pages/home_page.tsx';
import Show_note_page from './pages/show_note_page.tsx';


// Définir les routes
const rootRoute = new RootRoute();

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home_page,
});

const createNoteRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: Create_note_page,
});

const showNoteRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/note/$noteId',
  component: Show_note_page,
});

const editNoteRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/note/$noteId/edit',
  component: Edit_note_page,
});

// Créer le routeur
const router = createRouter({
  routeTree: rootRoute.addChildren([
    homeRoute,
    createNoteRoute,
    showNoteRoute,
    editNoteRoute
  ]),
});

const AppRouter: React.FC = () => (
  <RouterProvider router={router} />
);

export default AppRouter;

