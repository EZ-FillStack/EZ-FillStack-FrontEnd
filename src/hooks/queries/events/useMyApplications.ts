import { useQuery } from '@tanstack/react-query';
import { getMyApplications } from '@/api/events';

export function useMyApplications() {
  return useQuery({
    queryKey: ['myApplications'],
    queryFn: getMyApplications,
  });
}
