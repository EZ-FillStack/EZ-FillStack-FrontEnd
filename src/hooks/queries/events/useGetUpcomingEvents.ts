import { useQuery } from '@tanstack/react-query';
import { getUpcomingEvents } from '@/api/events';

export function useGetUpcomingEvents() {
  return useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: getUpcomingEvents,
  });
}
