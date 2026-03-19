import { useMutation } from '@tanstack/react-query';
import { changePassword } from '@/api/auth';

type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => changePassword(data),
  });
}