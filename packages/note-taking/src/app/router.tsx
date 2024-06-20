import { createRouter, RouterProvider, RootRoute, Route } from '@tanstack/react-router';
import React from 'react';
import HomePage from './pages/HomePage';
import CreateNotePage from './pages/CreateNotePage';
import ShowNotePage from './pages/ShowNotePage';
import EditNotePage from './pages/EditNotePage';


// Définir les routes
const rootRoute = new RootRoute();

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const createNoteRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CreateNotePage,
});

const showNoteRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/note/$noteId',
  component: ShowNotePage,
});

const editNoteRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/note/$noteId/edit',
  component: EditNotePage,
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

