import clientAPI from '@/lib/axios';

export type CreateReviewRequest = {
  eventId: number;
  content: string;
  rating: number;
};

// 엔드포인트 확인 후 변경 예정
export async function createReview(data: CreateReviewRequest) {
  const response = await clientAPI.post('/reviews', data);
  return response.data;
}

// 엔드포인트 확인 후 변경 예정
export async function getBestReviews() {
  const response = await clientAPI.get('/reviews/best');
  return response.data;
}