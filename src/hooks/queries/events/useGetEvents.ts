import { useQuery } from '@tanstack/react-query';
import { getEvents } from '@/api/events';

export function useGetEvents(params?: {
  categoryId?: number;
  sort?: string;
  status?: string;
  page?: number;
  size?: number;
}) {
  return useQuery({
    queryKey: ['events', params],
    queryFn: () => getEvents(params),
  });
}
