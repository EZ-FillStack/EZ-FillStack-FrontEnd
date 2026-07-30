import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import Logo from '@/components/assets/Logo';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { categories } from '@/lib/categories';
import { useEffect, useState } from 'react';
import HeaderAuthSection from '@/layouts/header/HeaderAuthSection';
import SupportFloatingButton from '@/components/actions/SupportFloatingButton';

export default function GlobalLayout() {
  const winLocation = useLocation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [winLocation.pathname]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = keyword.trim();
    navigate(`/search?keyword=${encodeURIComponent(next)}&page=1`);
  };

  const searchForm = (
    <form className="relative w-full max-w-xl" onSubmit={handleSearch}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="검색어를 입력하세요"
        className="pl-9"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </form>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        {/* 상단 줄: 로고 / 검색(데스크탑) / 버튼 */}
        <div className="mx-auto w-full max-w-6xl px-4 h-16 flex items-center gap-3 sm:gap-4">
          {/* Left: Logo */}
          <Link to="/" className="shrink-0 flex items-center">
            <Logo />
          </Link>

          {/* Center: 검색 (데스크탑만 인라인 노출) */}
          <div className="hidden md:flex flex-1 justify-center">
            {searchForm}
          </div>

          {/* Right: 인증 영역 */}
          <div className="ml-auto md:ml-0 shrink-0">
            <HeaderAuthSection />
          </div>
        </div>

        {/* 모바일 전용 검색 줄 */}
        <div className="border-t px-4 py-2 md:hidden">{searchForm}</div>

        {/* 하단 줄: 카테고리 (모바일에서 가로 스크롤) */}
        <div className="border-t">
          <nav className="mx-auto flex h-12 w-full max-w-6xl items-center justify-around gap-5 overflow-x-auto whitespace-nowrap px-4 sm:justify-start sm:gap-10 [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="shrink-0 font-medium text-foreground/80 transition-colors hover:font-bold hover:text-primary"
              >
                {category.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 overflow-x-hidden">
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
