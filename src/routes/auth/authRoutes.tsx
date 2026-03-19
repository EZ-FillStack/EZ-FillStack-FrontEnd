import type { RouteObject } from 'react-router';
import AuthLayout from '@/layouts/AuthLayout';
import ForgetPasswordPage from '@/pages/auth/ForgetPasswordPage';
import LoginPage from '@/pages/auth/LoginPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import LoginSuccessPage from '@/pages/auth/LoginSuccessPage';

export const authRoutes: RouteObject = {
  element: <AuthLayout />,
  children: [
    { path: '/sign-up', element: <SignUpPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/forget-password', element: <ForgetPasswordPage /> },
    { path: '/login-success', element: <LoginSuccessPage /> },
  ],
};
