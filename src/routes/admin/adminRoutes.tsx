import type { RouteObject } from 'react-router';
import AdminLayout from '@/layouts/AdminLayout';
import AdminPage from '@/pages/admin/AdminPage';
import AdminApplicationsPage from '@/pages/admin/AdminApplicationsPage';
import AdminInquiriesPage from '@/pages/admin/AdminInquiriesPage';
import AdminReviewsPage from '@/pages/admin/AdminReviewsPage';
import AdminExperienceRegisterPage from '@/pages/admin/AdminExperienceRegisterPage';
import AdminExperienceManagePage from '@/pages/admin/AdminExperienceManagePage';

export const adminRoutes: RouteObject = {
  path: '/admin',
  element: <AdminLayout />,
  children: [
    { index: true, element: <AdminPage /> },
    { path: 'experiences/register', element: <AdminExperienceRegisterPage /> },
    { path: 'experiences/manage', element: <AdminExperienceManagePage /> },
    { path: 'applications', element: <AdminApplicationsPage /> },
    { path: 'inquiries', element: <AdminInquiriesPage /> },
    { path: 'reviews', element: <AdminReviewsPage /> },
  ],
};
