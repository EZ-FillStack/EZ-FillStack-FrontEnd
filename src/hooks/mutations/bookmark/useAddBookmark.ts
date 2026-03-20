import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBookmark } from '@/api/bookmark';

export function useAddBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => addBookmark(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myBookmarks'] });
    },
  });
}