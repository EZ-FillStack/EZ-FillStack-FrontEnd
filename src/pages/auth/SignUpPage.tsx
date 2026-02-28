import { Link } from 'react-router';
import Logo from '../../components/assets/Logo';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';

export default function SignUpPage() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        {/* 상단 로고 영역 */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-md bg-muted px-10 py-4">
            <div className="flex justify-center scale-150">
              <Logo />
            </div>
          </div>
        </div>

        {/* 회원가입 카드 */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <form className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="example@email.com"
              autoComplete="email"
              className="h-11"
            />
            <Input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              className="h-11"
            />

            <Button type="submit" className="w-full h-11">
              회원가입
            </Button>
          </form>

          <div className="my-6">
            <Separator />
          </div>
        </div>
      </div>

      {/* 하단 로그인 카드 */}
      <div className="mt-4 rounded-2xl border bg-card p-4 text-center text-sm">
        <span className="text-muted-foreground">이미 계정이 있다면? </span>
        <Link
          to="/login"
          className="font-medium hover:underline underline-offset-4"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
