import type { RouteObject } from 'react-router';
import AdminLayout from '../../layouts/AdminLayout';
import AdminPage from '../../pages/admin/AdminPage';

export const adminRoutes: RouteObject = {
  path: '/admin',
  element: <AdminLayout />,
  children: [{ index: true, element: <AdminPage /> }],
};
