import { Navigate, Route, Routes } from 'react-router';
import AdminPage from './pages/admin/AdminPage.tsx';
import SignUpPage from './pages/auth/SignUpPage.tsx';
import LoginPage from './pages/auth/LoginPage.tsx';
import ForgetPasswordPage from './pages/auth/ForgetPasswordPage.tsx';
import MainPage from './pages/main/MainPage.tsx';
import CategoryPage from './pages/main/CategoryPage.tsx';
import EventPage from './pages/events/EventPage.tsx';
import EventDetailPage from './pages/events/EventDetailPage.tsx';
import ExperienceDetailPage from './pages/experiences/ExperienceDetailPage.tsx';
import ReviewDetailPage from './pages/reviews/ReviewDetailPage.tsx';
import MyPageApplied from './pages/mypage/MyPageApplied.tsx';
import MyPageLiked from './pages/mypage/MyPageLiked.tsx';
import MyPageAccount from './pages/mypage/MyPageAccount.tsx';
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
