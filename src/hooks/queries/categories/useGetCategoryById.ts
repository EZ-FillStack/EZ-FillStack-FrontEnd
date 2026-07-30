import { useQuery } from '@tanstack/react-query';
import { getCategoryById } from '@/api/categories';

export function useGetCategoryById(categoryId: number) {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategoryById(categoryId),
  });
}
