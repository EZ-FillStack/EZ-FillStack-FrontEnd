import { useMutation } from '@tanstack/react-query';
import { createReview, type CreateReviewRequest } from '@/api/review';

export function useCreateReview() {
  return useMutation({
    mutationFn: (data: CreateReviewRequest) => createReview(data),
  });
}