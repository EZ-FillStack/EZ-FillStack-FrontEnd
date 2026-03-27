import { loginWithPassword } from "@/api/auth";
import { getMyProfile } from "@/api/profile";
import useAppStore from "@/stores/useAppStore";
import type { UseMutationCallback } from "@/types/mutation";
import { useMutation } from "@tanstack/react-query";

export function useLoginWithPassword(callbacks?: UseMutationCallback, autoLogin = false) {
  const setUser = useAppStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginWithPassword,
    onSuccess: async (data) => {
      // TODO: 백엔드 토큰 필드명 확정 후 수정 예정 (token 또는 accessToken)
      const token = data?.token ?? data?.accessToken;
      if (token) {
        if (autoLogin) {
          localStorage.setItem('accessToken', token);
        } else {
          sessionStorage.setItem('accessToken', token);
        }
      }

      const profile = await getMyProfile();
      setUser(profile);

      if (callbacks?.onSuccess) callbacks.onSuccess(data);
    },
    onError: (error) => {
      console.error(error);
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}