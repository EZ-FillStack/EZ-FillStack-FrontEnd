import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { removeBookmark } from '@/api/bookmark';

export function useRemoveBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => removeBookmark(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myBookmarks'] });
    },
    onError: (error) => {
      console.error('찜 해제 실패:', error);
      toast.error('찜 해제에 실패했습니다.');
    },
  });
}
