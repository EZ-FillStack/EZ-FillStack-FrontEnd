export type UseMutationCallback<T = unknown> = {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};