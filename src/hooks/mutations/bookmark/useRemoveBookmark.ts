import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeBookmark } from '@/api/bookmark';

export function useRemoveBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => removeBookmark(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myBookmarks'] });
    },
  });
}