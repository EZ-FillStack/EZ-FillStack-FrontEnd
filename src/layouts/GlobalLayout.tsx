import { Link, Outlet } from 'react-router';
import Logo from '../components/assets/Logo';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search } from 'lucide-react';

const categories = [
  { label: '카테고리1', to: '/category/1' },
  { label: '카테고리2', to: '/category/2' },
  { label: '카테고리3', to: '/category/3' },
  { label: '카테고리4', to: '/category/4' },
];

export default function GlobalLayout() {
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

          {/* Right: 로그인 & 회원가입 */}
          <div className="shrink-0 flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">로그인</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/sign-up">회원가입</Link>
            </Button>
          </div>
        </div>

        {/* 하단 줄: 카테고리 */}
        <div className="border-t">
          <nav className="mx-auto w-full max-w-6xl px-4 h-12 flex items-center gap-6 text-sm">
            {categories.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {c.label}
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

      <footer className="mt-16 border-t bg-zinc-300 text-zinc-600">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-muted-foreground">
          프로젝트 팀명 · 팀 멤버 · GitHub 링크
        </div>
      </footer>
    </div>
  );
}
