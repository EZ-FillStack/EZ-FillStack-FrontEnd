import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import useAppStore from '@/stores/useAppStore';
import defaultAvatar from '@/assets/default-avatar.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function HeaderAuthSection() {
  // const user = useAppStore((state) => state.user);
  // const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  // 프로필 작업하기 위해 임시로 넣어둠

  const logout = useAppStore((state) => state.logout);

  const user = {
    id: 1,
    username: 'kang',
    nickname: '강이',
    profileImageUrl: '',
  };

  const isAuthenticated = true;

  if (isAuthenticated && user) {
    return (
      <div className="shrink-0 flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="사용자 메뉴 열기"
              className="rounded-full focus:outline-none"
            >
              <Avatar className="h-9 w-9 cursor-pointer ring-1 ring-slate-200 transition hover:ring-slate-300">
                <AvatarImage
                  src={user.profileImageUrl || defaultAvatar}
                  alt={user.nickname}
                />
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-44 rounded-xl border-slate-200 p-1"
          >
            <DropdownMenuItem asChild className="cursor-pointer rounded-md">
              <Link to="/my-page">마이페이지</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer rounded-md">
              <Link to="/my-page/applied">내 신청 내역</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer rounded-md">
              <Link to="/my-page/liked">내 찜 목록</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer rounded-md text-red-600 focus:text-red-600"
            >
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="shrink-0 flex items-center gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link to="/login">로그인</Link>
      </Button>
      <Button size="sm" asChild>
        <Link to="/sign-up">회원가입</Link>
      </Button>
    </div>
  );
}
