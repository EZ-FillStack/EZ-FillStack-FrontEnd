import type { RouteObject } from 'react-router';
import MainLayout from '../../layouts/MainLayout';

import MainPage from '../../pages/main/MainPage';
import CategoryPage from '../../pages/main/CategoryPage';
import EventPage from '../../pages/events/EventPage';
import EventDetailPage from '../../pages/events/EventDetailPage';
import ExperienceDetailPage from '../../pages/experiences/ExperienceDetailPage';
import ReviewDetailPage from '../../pages/reviews/ReviewDetailPage';

export const mainRoutes: RouteObject = {
  element: <MainLayout />,
  children: [
    { path: '/', element: <MainPage /> },
    { path: '/categories/:categoryId', element: <CategoryPage /> },
    { path: '/events', element: <EventPage /> },
    { path: '/events/:id', element: <EventDetailPage /> },
    { path: '/experiences/:id', element: <ExperienceDetailPage /> },
    { path: '/reviews/:id', element: <ReviewDetailPage /> },
  ],
};
