import { Navigate, useRoutes } from 'react-router';
import type { RouteObject } from 'react-router';

import { mainRoutes } from './main/mainRoutes';
import { myPageRoutes } from './mypage/myPageRoutes';
import { adminRoutes } from './admin/adminRoutes';

export default function RootRoutes() {
  const routes: RouteObject[] = [
    mainRoutes,
    myPageRoutes,
    adminRoutes,
    { path: '*', element: <Navigate to="/" replace /> },
  ];

  return useRoutes(routes);
}
