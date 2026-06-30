import { useQuery } from '@tanstack/react-query';
import { getMyBookmarks } from '@/api/bookmark';
import useAppStore from '@/stores/useAppStore';

export function useMyBookmarks() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ['myBookmarks'],
    queryFn: getMyBookmarks,
    // 비로그인 상태에서는 호출하지 않음 (목록/카드에서도 공용으로 사용)
    enabled: isAuthenticated,
  });
}
