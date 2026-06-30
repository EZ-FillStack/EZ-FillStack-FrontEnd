import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { addBookmark } from '@/api/bookmark';

export function useAddBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => addBookmark(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myBookmarks'] });
    },
    onError: (error) => {
      console.error('찜 등록 실패:', error);
      toast.error('찜 등록에 실패했습니다.');
    },
  });
}
