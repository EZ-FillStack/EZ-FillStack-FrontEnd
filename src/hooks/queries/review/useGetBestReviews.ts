import { useQuery } from '@tanstack/react-query';
import { getBestReviews } from '@/api/review';

export function useGetBestReviews() {
  return useQuery({
    queryKey: ['bestReviews'],
    queryFn: getBestReviews,
  });
}