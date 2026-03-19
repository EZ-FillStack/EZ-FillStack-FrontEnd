import { updateProfile } from '@/api/profile';
import type { UseMutationCallback } from '@/types/mutation';
import type {UpdateProfileResponse} from '@/api/profile';
import { useMutation } from '@tanstack/react-query';

export function useUpdateProfileMutation(callbacks?: UseMutationCallback<UpdateProfileResponse>) {
  return useMutation({
    mutationFn: updateProfile,

    onSuccess: (updatedProfile) => {
      callbacks?.onSuccess?.(updatedProfile);
    },

    onError: (error) => {
      callbacks?.onError?.(error);
    },
  });
}