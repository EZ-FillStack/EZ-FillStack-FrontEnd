import { Outlet } from 'react-router';
import MyPageProfileSection from '@/components/mypage/MyPageProfileSection';
import MyPageSidebar from '@/components/mypage/MyPageSidebar';

export default function MyPageLayout() {
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