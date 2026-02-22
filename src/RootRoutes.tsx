import { Navigate, Route, Routes } from 'react-router';
import AdminPage from './pages/AdminPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import MainPage from './pages/MainPage';
import CategoryPage from './pages/CategoryPage';
import EventPage from './pages/EventPage';
import EventDetailPage from './pages/EventDetailPage';
import ExperienceDetailPage from './pages/ExperienceDetailPage';
import ReviewDetailPage from './pages/ReviewDetailPage';
import MyPageApplied from './pages/MyPageApplied';
import MyPageLiked from './pages/MyPageLiked';
import MyPageAccount from './pages/MyPageAccount';
import MainLayout from './layouts/MainLayout';
import MyPageLayout from './layouts/MyPageLayout';
import AdminLayout from './layouts/AdminLayout';

export default function RootRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Auth */}
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        {/* 비번찾기(추후 구현 또는 삭제 예정) */}
        {/* Main */}
        <Route path="/" element={<MainPage />} />
        <Route path="/categories/:categoryId" element={<CategoryPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/experiences/:id" element={<ExperienceDetailPage />} />
        <Route path="/reviews/:id" element={<ReviewDetailPage />} />
      </Route>

      {/* MyPage */}
      <Route path="/my-page" element={<MyPageLayout />}>
        <Route index element={<Navigate to="applied" replace />} />
        <Route path="applied" element={<MyPageApplied />} />
        <Route path="liked" element={<MyPageLiked />} />
        <Route path="account" element={<MyPageAccount />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        {/* Admin */}
        <Route index element={<AdminPage />} />
      </Route>

      <Route path="*" element={<Navigate to={'/'} />}></Route>
    </Routes>
  );
}
