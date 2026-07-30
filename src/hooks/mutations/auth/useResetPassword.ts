import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/api/auth';

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) =>
      resetPassword({ token, newPassword }),
  });
}
