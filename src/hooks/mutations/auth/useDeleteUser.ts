import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '@/api/auth';

export function useDeleteUserMutation() {
  return useMutation({
    mutationFn: deleteUser,
  });
}