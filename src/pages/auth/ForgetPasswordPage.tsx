import Logo from '../../components/assets/Logo';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import { Link } from 'react-router';

export default function ForgetPasswordPage() {
  return (
    <div className="w-full max-w-xl">
      <div className="rounded-2xl border-2 border-border/80 bg-card p-6 shadow-md">
        {/* 상단 로고 영역 */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-md bg-muted/70 px-10 py-4">
            <div className="flex justify-center scale-150">
              <Logo />
            </div>
          </div>
        </div>

        {/* 비밀번호 찾기 카드 */}
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold tracking-tight">
                비밀번호를 잊으셨나요?
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                이메일로 비밀번호를 재설정 할 수 있는 인증 링크를 보내드립니다.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
                className="h-11"
              />
            </div>

            <Button type="button" className="w-full h-11">
              인증 메일 요청하기
            </Button>

            <div className="pt-2">
              <Separator />
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link
                to="/login"
                className="text-muted-foreground hover:text-foreground hover:underline underline-offset-4"
              >
                로그인으로 돌아가기
              </Link>
              <Link
                to="/sign-up"
                className="font-medium hover:underline underline-offset-4"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
