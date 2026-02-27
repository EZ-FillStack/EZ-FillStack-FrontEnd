import { Input } from '../../components/ui/input';
import { Link } from 'react-router';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Separator } from '../../components/ui/separator';
import Logo from '../../components/assets/Logo';
import googleLogo from '../../assets/google.svg';
import kakaoLogo from '../../assets/kakaotalk.svg';
import naverLogo from '../../assets/naver.svg';

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        {/* 상단 사이트 이름/로고 영역 */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-md bg-muted px-10 py-4 text-2xl font-bold">
            <div className="flex justify-center scale-150">
              <Logo />
            </div>
          </div>
        </div>

        {/* 로그인 카드 */}
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
              autoComplete="current-password"
              className="h-11"
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <Checkbox />
                <span className="text-muted-foreground">자동로그인</span>
              </label>

              <Link
                to="/forget-password"
                className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                비밀번호 찾기
              </Link>
            </div>

            <Button type="submit" className="w-full h-11">
              로그인
            </Button>
          </form>

          <div className="my-6">
            <Separator />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-center text-sm text-muted-foreground">
              SNS 계정으로 시작하기
            </p>

            <div className="grid grid-cols-3 gap-3">
              {/* Google */}
              <Button
                type="button"
                variant="outline"
                className="h-11 justify-center gap-2 border-blue-300 border-2"
              >
                <img
                  src={googleLogo}
                  alt="google"
                  className="h-4 w-4 shrink-0"
                />
                구글
              </Button>

              {/* Kakao */}
              <Button
                type="button"
                variant="outline"
                className="h-11 justify-center gap-2 border-yellow-300 border-2"
              >
                <img src={kakaoLogo} alt="kakao" className="h-4 w-4 shrink-0" />
                카톡
              </Button>

              {/* Naver */}
              <Button
                type="button"
                variant="outline"
                className="h-11 justify-center gap-2 border-green-400 border-2"
              >
                <img src={naverLogo} alt="naver" className="h-4 w-4 shrink-0" />
                네이버
              </Button>
            </div>
          </div>
        </div>

        {/* 하단 회원가입 카드 */}
        <div className="mt-4 rounded-2xl border bg-card p-4 text-center text-sm">
          <span className="text-muted-foreground">계정이 없으신가요? </span>
          <Link
            to="/sign-up"
            className="font-medium hover:underline underline-offset-4"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
