import { Navigate, useRoutes } from 'react-router';
import type { RouteObject } from 'react-router';

import { mainRoutes } from './main/mainRoutes';
import { myPageRoutes } from './mypage/myPageRoutes';
import { adminRoutes } from './admin/adminRoutes';
import GlobalLayout from '../layouts/GlobalLayout';
import { authRoutes } from './auth/authRoutes';

export default function RootRoutes() {
  const routes: RouteObject[] = [
    {
      element: <GlobalLayout />,
      children: [
        mainRoutes,
        myPageRoutes,
        adminRoutes,
        { path: '*', element: <Navigate to="/" replace /> },
      ],
    },
    authRoutes,
  ];

  return useRoutes(routes);
}
