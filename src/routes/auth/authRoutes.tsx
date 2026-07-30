import type { RouteObject } from 'react-router';
import AuthLayout from '@/layouts/AuthLayout';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import LoginPage from '@/pages/auth/LoginPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import LoginSuccessPage from '@/pages/auth/LoginSuccessPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';

export const authRoutes: RouteObject = {
  element: <AuthLayout />,
  children: [
    { path: '/sign-up', element: <SignUpPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/forgot-password', element: <ForgotPasswordPage /> },
    { path: '/reset-password', element: <ResetPasswordPage /> },
    { path: '/login-success', element: <LoginSuccessPage /> },
  ],
};
