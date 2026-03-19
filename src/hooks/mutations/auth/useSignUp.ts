import { signUp } from '@/api/auth';
import type { UseMutationCallback } from '@/types/mutation';
import { useMutation } from '@tanstack/react-query';

export function useSignUp(callbacks?: UseMutationCallback<void>) {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      callbacks?.onSuccess?.();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
