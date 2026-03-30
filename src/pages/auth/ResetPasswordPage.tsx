import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import Logo from '@/components/assets/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router';
import { useResetPasswordMutation } from '@/hooks/mutations/auth/useResetPassword';
import { generateErrorMessage } from '@/lib/error';

function validateResetPasswordForm(newPassword: string, newPasswordConfirm: string) {
  if (newPassword.trim() === '') {
    return '새 비밀번호를 입력해주세요.';
  }

  if (newPassword.length < 8) {
    return '비밀번호는 8자 이상 입력해주세요.';
  }

  if (newPassword.length > 72) {
    return '비밀번호가 너무 깁니다.';
  }

  if (newPasswordConfirm.trim() === '') {
    return '비밀번호 확인을 입력해주세요.';
  }

  if (newPassword !== newPasswordConfirm) {
    return '비밀번호가 일치하지 않습니다.';
  }

  return null;
}

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending } = useResetPasswordMutation();

  const token = searchParams.get('token');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error('유효하지 않은 링크입니다.', { position: 'top-center' });
      return;
    }

    const validationMessage = validateResetPasswordForm(newPassword, newPasswordConfirm);
    if (validationMessage) {
      toast.error(validationMessage, { position: 'top-center' });
      return;
    }

    resetPassword(
      { token, newPassword },
      {
        onSuccess: () => {
          toast.success('비밀번호가 재설정되었습니다. 새 비밀번호로 로그인해주세요.', {
            position: 'top-center',
          });
          navigate('/login', { replace: true });
        },
        onError: (error) => {
          const message = generateErrorMessage(error);
          toast.error(message, { position: 'top-center' });
        },
      },
    );
  };

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

        {/* 비밀번호 재설정 카드 */}
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold tracking-tight">
                비밀번호 재설정
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                새로 사용할 비밀번호를 입력해주세요.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="password"
                placeholder="새 비밀번호 (8자 이상)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                className="h-11"
              />
              <Input
                type="password"
                placeholder="새 비밀번호 확인"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                autoComplete="new-password"
                className="h-11"
              />

              <Button type="submit" disabled={isPending} className="w-full h-11">
                {isPending ? '재설정 중...' : '비밀번호 재설정'}
              </Button>
            </form>

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
                to="/forgot-password"
                className="font-medium hover:underline underline-offset-4"
              >
                인증 메일 다시 받기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
