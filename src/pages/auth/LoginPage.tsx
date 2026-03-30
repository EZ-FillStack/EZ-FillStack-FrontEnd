import { Input } from '@/components/ui/input';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/assets/Logo';
import googleLogo from '@/assets/google.svg';
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
          const message = generateErrorMessage(error);

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
          <div className="rounded-md bg-muted px-10 py-4">
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

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleLoginWithOAuth('google')}
                disabled={isLoginWithPasswordPending}
                type="button"
                variant="outline"
                className="h-11 justify-center border-2 border-blue-400"
              >
                <img
                  src={googleLogo}
                  alt="google"
                  className="h-4 w-4 shrink-0"
                />
                구글
              </Button>

              <Button
                onClick={() => handleLoginWithOAuth('naver')}
                disabled={isLoginWithPasswordPending}
                type="button"
                variant="outline"
                className="h-11 justify-center border-2 border-green-400"
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
            className="font-medium underline-offset-4 hover:underline"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
