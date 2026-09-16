import { Input } from '@/components/ui/input';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/assets/Logo';
import naverLogo from '@/assets/naver.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { generateErrorMessage } from '@/lib/error';
import { useLoginWithPassword } from '@/hooks/mutations/auth/useLoginWithPassword';
import { loginWithOAuth } from '@/api/auth';

function validateLoginForm(email: string, password: string) {
  const trimmedEmail = email.trim();

  if (trimmedEmail === '') {
    return '이메일을 입력해주세요.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return '올바른 이메일 형식을 입력해주세요.';
  }

  if (password.trim() === '') {
    return '비밀번호를 입력해주세요.';
  }

  if (password.length < 8) {
    return '비밀번호는 8자 이상 입력해주세요.';
  }

  if (password.length > 72) {
    return '비밀번호가 너무 깁니다.';
  }

  return null;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const navigate = useNavigate();

  const { mutate: loginWithPassword, isPending: isLoginWithPasswordPending } =
    useLoginWithPassword(
      {
        onSuccess: () => {
          navigate('/', { replace: true });
        },
        onError: (error) => {
          const message = generateErrorMessage(error, 'login');

          toast.error(message, {
            position: 'top-center',
          });
          setPassword('');
        },
      },
      autoLogin,
    );

  const handleLoginWithOAuth = (provider: 'google' | 'naver') => {
    loginWithOAuth(provider);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationMessage = validateLoginForm(email, password);

    if (validationMessage) {
      toast.error(validationMessage, {
        position: 'top-center',
      });
      return;
    }

    loginWithPassword({
      email: email.trim(),
      password,
    });
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        {/* 상단 로고 영역 */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-md px-10 py-4">
            <div className="flex justify-center scale-150">
              <Logo />
            </div>
          </div>
        </div>

        {/* 로그인 카드 */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoginWithPasswordPending}
              type="email"
              placeholder="example@email.com"
              autoComplete="email"
              className="h-11"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoginWithPasswordPending}
              type="password"
              placeholder="password"
              autoComplete="current-password"
              className="h-11"
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={autoLogin}
                  onCheckedChange={(checked) => setAutoLogin(checked === true)}
                />
                <span className="text-muted-foreground">자동로그인</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                비밀번호 찾기
              </Link>
            </div>

            <Button
              disabled={isLoginWithPasswordPending}
              type="submit"
              className="h-11 w-full"
            >
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

            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={() => handleLoginWithOAuth('google')}
                disabled={isLoginWithPasswordPending}
                type="button"
                size="icon"
                aria-label="구글 로그인"
                className="size-10 shrink-0 rounded-full border border-slate-200 bg-white p-0 shadow-md hover:bg-slate-50 hover:shadow-lg"
              >
                <svg className="size-5" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                      fill="#4285F4"
                      d="M19.6 10.23c0-.71-.06-1.4-.18-2.05H10v3.87h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.35Z"
                  />
                  <path
                      fill="#34A853"
                      d="M10 20c2.7 0 4.97-.9 6.62-2.42l-3.24-2.51c-.9.6-2.04.96-3.38.96-2.6 0-4.81-1.76-5.6-4.12H1.05v2.59A10 10 0 0 0 10 20Z"
                  />
                  <path
                      fill="#FBBC05"
                      d="M4.4 11.91a6.01 6.01 0 0 1 0-3.82V5.5H1.05a10 10 0 0 0 0 9l3.35-2.59Z"
                  />
                  <path
                      fill="#EA4335"
                      d="M10 3.97c1.47 0 2.8.5 3.84 1.5l2.86-2.87A9.61 9.61 0 0 0 10 0a10 10 0 0 0-8.95 5.5L4.4 8.09C5.19 5.73 7.4 3.97 10 3.97Z"
                  />
                </svg>
              </Button>

              <Button
                onClick={() => handleLoginWithOAuth('naver')}
                disabled={isLoginWithPasswordPending}
                type="button"
                size="icon"
                aria-label="네이버 로그인"
                className="size-10 shrink-0 rounded-full border-0 bg-naver p-0 hover:bg-naver-hover"
              >
                <img
                  src={naverLogo}
                  alt=""
                  className="size-4 brightness-0 invert"
                />
              </Button>
            </div>
          </div>
        </div>

        {/* 하단 회원가입 카드 */}
        <div className="mt-4 rounded-2xl border bg-card p-4 text-center text-sm">
          <span className="text-muted-foreground">계정이 없으신가요? </span>
          <Link
            to="/sign-up"
            className="font-medium underline-offset-4 hover:underline"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
