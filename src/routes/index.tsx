import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { AuthLayout, PrivateLayout } from '@/components/layouts';

const HomePage = lazy(() => import('@/pages/home'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const AuthCallbackPage = lazy(() => import('@/pages/auth/AuthCallbackPage'));

export const router = createBrowserRouter([
  {
    path: '',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'auth/callback',
        element: <AuthCallbackPage />,
      },
    ],
  },
  {
    path: '',
    element: <PrivateLayout />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
    ],
  },
]);
