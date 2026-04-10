import clientAPI from '@/lib/axios';
import type { Review } from '@/types/review';

export type CreateReviewRequest = {
  eventId: number;
  content: string;
  rating: number;
};

type ReviewPage = {
  content: Review[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
};

function extractList(data: Review[] | ReviewPage): Review[] {
  if (Array.isArray(data)) return data;
  return data.content ?? [];
}

export async function createReview(data: CreateReviewRequest) {
  const response = await clientAPI.post('/reviews', data);
  return response.data;
}

export async function getBestReviews() {
  const response = await clientAPI.get<Review[] | ReviewPage>('/reviews/best');
  return extractList(response.data);
}