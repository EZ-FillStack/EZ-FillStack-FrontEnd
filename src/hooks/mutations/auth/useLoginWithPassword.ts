import { loginWithPassword } from "@/api/auth";
import type { UseMutationCallback } from "@/types/mutation";
import { useMutation } from "@tanstack/react-query";

export function useLoginWithPassword(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: loginWithPassword, 
    onError: (error) => {
      console.error(error);

      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}