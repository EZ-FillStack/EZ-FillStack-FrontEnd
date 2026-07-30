import { Navigate, Outlet } from 'react-router';
import MyPageProfileSection from '@/components/mypage/MyPageProfileSection';
import MyPageSidebar from '@/components/mypage/MyPageSidebar';
import FullPageLoader from '@/components/feedback/FullPageLoader';
import useAppStore from '@/stores/useAppStore';

export default function MyPageLayout() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const authLoading = useAppStore((state) => state.authLoading);

  // 새로고침 시 저장된 토큰으로 프로필을 복구하는 중일 수 있어,
  // 인증 확인이 끝나기 전에는 리다이렉트하지 않습니다.
  if (authLoading) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 text-sm">
      {/* 상단 프로필 영역 */}
      <MyPageProfileSection />

      {/* 하단 영역 */}
      <div className="mt-6 flex gap-6 items-stretch">
        {/* 왼쪽 메뉴 */}
        <aside className="w-56 shrink-0">
          <MyPageSidebar />
        </aside>

        {/* 오른쪽 본문 */}
        <section className="min-h-screen flex-1 rounded-2xl border border-slate-200 bg-white p-5">
          <Outlet />
        </section>
      </div>
    </main>
  );
}