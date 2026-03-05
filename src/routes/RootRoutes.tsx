import { Navigate, useRoutes } from 'react-router';
import type { RouteObject } from 'react-router';

import { mainRoutes } from '@/routes/main/mainRoutes';
import { myPageRoutes } from '@/routes/mypage/myPageRoutes';
import { adminRoutes } from '@/routes/admin/adminRoutes';
import GlobalLayout from '@/layouts/GlobalLayout';
import { authRoutes } from '@/routes/auth/authRoutes';

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
