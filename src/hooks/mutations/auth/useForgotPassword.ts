import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '@/api/auth';

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: ({ email }: { email: string }) => forgotPassword({ email }),
  });
}
