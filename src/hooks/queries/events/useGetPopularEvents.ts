import { useQuery } from '@tanstack/react-query';
import { getPopularEvents } from '@/api/events';

export function useGetPopularEvents() {
  return useQuery({
    queryKey: ['popularEvents'],
    queryFn: getPopularEvents,
  });
}
