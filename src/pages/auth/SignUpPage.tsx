import { Link } from 'react-router';
import Logo from '@/components/assets/Logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { toast } from 'sonner';
import { useSignUp } from '@/hooks/mutations/auth/useSignUp';
import { generateErrorMessage } from '@/lib/error';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다.', {
        position: 'top-center',
      });
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

    if (email.trim() === '') {
      toast.error('이메일을 입력해주세요.', {
        position: 'top-center',
      });
      return;
    }

    if (password.trim() === '') {
      toast.error('비밀번호를 입력해주세요.', {
        position: 'top-center',
      });
      return;
    }

    signUp({
      email,
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
