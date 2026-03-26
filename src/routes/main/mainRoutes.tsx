import type { RouteObject } from 'react-router';
import MainLayout from '@/layouts/MainLayout';

import MainPage from '@/pages/main/MainPage';
import CategoryPage from '@/pages/main/CategoryPage';
import EventPage from '@/pages/events/EventPage';
import ExperienceDetailPage from '@/pages/experiences/ExperienceDetailPage';
import ReviewPage from '@/pages/reviews/ReviewPage';
import SearchPage from '../../pages/main/SearchPage';

export const mainRoutes: RouteObject = {
  element: <MainLayout />,
  children: [
    { path: '/', element: <MainPage /> },
    { path: '/search', element: <SearchPage /> },
    { path: '/categories/:categoryId', element: <CategoryPage /> },
    { path: '/events', element: <EventPage /> },
    { path: '/experiences/:id', element: <ExperienceDetailPage /> },
    { path: '/reviews', element: <ReviewPage /> },
  ],
};
