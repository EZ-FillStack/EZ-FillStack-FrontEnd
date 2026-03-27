import { useQuery } from '@tanstack/react-query';
import { getEventDetail } from '@/api/events';

export function useGetEventDetail(eventId: number) {
  return useQuery({
    queryKey: ['eventDetail', eventId],
    queryFn: () => getEventDetail(eventId),
  });
}
