import { Navigate } from 'react-router';
import type { RouteObject } from 'react-router';

import MyPageLayout from '../../layouts/MyPageLayout';
import MyPageApplied from '../../pages/mypage/MyPageApplied';
import MyPageLiked from '../../pages/mypage/MyPageLiked';
import MyPageAccount from '../../pages/mypage/MyPageAccount';

export const myPageRoutes: RouteObject = {
  path: '/my-page',
  element: <MyPageLayout />,
  children: [
    { index: true, element: <Navigate to="applied" replace /> },
    { path: 'applied', element: <MyPageApplied /> },
    { path: 'liked', element: <MyPageLiked /> },
    { path: 'account', element: <MyPageAccount /> },
  ],
};
