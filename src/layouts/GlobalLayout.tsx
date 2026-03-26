import {Link, Outlet, useLocation} from 'react-router';
import Logo from '@/components/assets/Logo';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { categories } from '@/lib/categories';
// API 연결 예정
// import { useGetCategories } from '@/hooks/queries/categories/useGetCategories';
import { useEffect } from "react";
import HeaderAuthSection from '@/layouts/header/HeaderAuthSection';
import SupportFloatingButton from '@/components/actions/SupportFloatingButton';

export default function GlobalLayout() {
  const winLocation = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [winLocation.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        {/* 상단 줄: 로고 / 검색 / 버튼 */}
        <div className="mx-auto w-full max-w-6xl px-4 h-16 flex items-center gap-4">
          {/* Left: Logo */}
          <Link to="/" className="shrink-0 flex items-center">
            <Logo />
          </Link>

          {/* Center: 검색 */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="검색어를 입력하세요" className="pl-9" />
            </div>
          </div>

          {/* Right: 인증 영역 */}
          <HeaderAuthSection />
        </div>

        {/* 하단 줄: 카테고리 */}
        {/* API 연결 예정: const { data: categories = [] } = useGetCategories(); */}
        <div className="border-t">
          <nav className="mx-auto w-full max-w-6xl px-4 h-12 flex items-center gap-10">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="font-medium text-foreground/80 hover:text-primary hover:font-bold transition-colors"
              >
                {category.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-6">
          <Outlet />
        </div>
      </main>

      {/* 고객센터 플로팅 버튼 */}
      <div className="fixed bottom-6 right-6">
        <SupportFloatingButton />
      </div>

      <footer className="mt-16 border-t bg-zinc-300 text-zinc-600">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-muted-foreground">
          프로젝트 팀명 · 팀 멤버 · GitHub 링크
        </div>
      </footer>
    </div>
  );
}
