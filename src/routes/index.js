import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePageComponent } from '../components/Home';
import { Dashboard } from '../components/Home/dashboard';
import { AuthPage } from '../components/Home/authenticationPage';

const routes = [
  {
    path: '/',
    exact: true,
    protected: false,
    element: <HomePageComponent />,
  },
  {
    path: '/login',
    exact: true,
    protected: false,
    element: <AuthPage />,
  },
  {
    path: '/dashboard',
    exact: true,
    protected: false,
    element: <Dashboard />,
  },
];

export function AllRoutes() {
  const renderRoute = (route) => (
    <Route
      exact={route.exact}
      path={route.path}
      element={route.element}
    />
  );

  return (
    <BrowserRouter>
      <Routes>{routes.map((route) => renderRoute(route))}</Routes>
    </BrowserRouter>
  );
}
