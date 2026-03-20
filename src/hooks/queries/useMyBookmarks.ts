import { useQuery } from '@tanstack/react-query';
import { getMyBookmarks } from '@/api/bookmark';

export function useMyBookmarks() {
  return useQuery({
    queryKey: ['myBookmarks'],
    queryFn: getMyBookmarks,
  });
}