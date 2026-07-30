import { Link, useNavigate } from 'react-router';
import Logo from '@/components/assets/Logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { toast } from 'sonner';
import { useSignUp } from '@/hooks/mutations/auth/useSignUp';
import { generateErrorMessage } from '@/lib/error';

function validateSignUpForm(email: string, password: string, passwordConfirm: string) {
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

  if (passwordConfirm.trim() === '') {
    return '비밀번호 확인을 입력해주세요.';
  }

  if (password !== passwordConfirm) {
    return '비밀번호가 일치하지 않습니다.';
  }

  return null;
}

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다.', {
        position: 'top-center',
      });
      navigate('/login', { replace: true });
    },

    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: 'top-center',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationMessage = validateSignUpForm(email, password, passwordConfirm);

    if (validationMessage) {
      toast.error(validationMessage, {
        position: 'top-center',
      });
      return;
    }

    signUp({
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

        {/* 회원가입 카드 */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              disabled={isSignUpPending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="example@email.com"
              autoComplete="email"
              className="h-11"
            />
            <Input
              disabled={isSignUpPending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              autoComplete="new-password"
              className="h-11"
            />
            <Input
              disabled={isSignUpPending}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type="password"
              placeholder="confirm password"
              autoComplete="new-password"
              className="h-11"
            />

            <Button
              disabled={isSignUpPending}
              type="submit"
              className="w-full h-11"
            >
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
