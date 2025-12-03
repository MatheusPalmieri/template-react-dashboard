import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { PrivateLayout } from '@/components/layouts';
import { AuthLayout } from '@/features/auth';

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const AuthCallbackPage = lazy(() => import('@/pages/auth/AuthCallbackPage'));
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'));

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
        path: 'dashboard',
        element: <DashboardPage />,
      },
    ],
  },
]);
