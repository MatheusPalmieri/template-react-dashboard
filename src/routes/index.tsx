import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { PrivateLayout } from '@/components/layouts';
import { AuthLayout } from '@/features/auth';

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const AuthCallbackPage = lazy(() => import('@/pages/auth/AuthCallbackPage'));
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'));
const UserEditPage = lazy(() => import('@/pages/user/UserEditPage'));

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
      {
        path: 'user/edit',
        element: <UserEditPage />,
      },
    ],
  },
]);
