import { useState, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import ReviewCard from '@/components/cards/ReviewCard';
import ReviewDetailModal from '@/components/review/ReviewDetailModal';
import type { Review } from '@/types/review';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
// import { useGetBestReviews } from '@/hooks/queries/review/useGetBestReviews';

const reviews: Review[] = [
  {
    id: 1,
    memberId: 101,
    eventId: 201,
    rating: 5,
    nickname: '한강킹',
    title: '한강 요트 체험',
    content: '야경이 정말 예뻤고 진행도 매끄러워서 만족스러웠어요.',
    createdAt: '2026-03-20',
    updatedAt: '2026-03-20',
  },
  {
    id: 2,
    memberId: 102,
    eventId: 202,
    rating: 4,
    nickname: '옴뇸뇸',
    title: '도자기 원데이 클래스',
    content: '처음이었는데도 친절하게 알려주셔서 재밌게 만들었어요.',
    createdAt: '2026-03-19',
    updatedAt: '2026-03-19',
  },
  {
    id: 3,
    memberId: 103,
    eventId: 203,
    rating: 5,
    nickname: '자연인',
    title: '제주 올레길 트레킹',
    content: '공기도 좋고 경치도 너무 좋았어요. 꼭 다시 가고 싶어요.',
    createdAt: '2026-03-18',
    updatedAt: '2026-03-18',
  },
  {
    id: 4,
    memberId: 104,
    eventId: 204,
    rating: 3,
    nickname: '쿠킹마스터',
    title: '이탈리안 쿠킹 클래스',
    content: '파스타 만드는 게 생각보다 어려웠지만 맛있었어요.',
    createdAt: '2026-03-17',
    updatedAt: '2026-03-17',
  },
  {
    id: 5,
    memberId: 105,
    eventId: 205,
    rating: 5,
    nickname: '서핑보이',
    title: '양양 서핑 체험',
    content: '파도가 완벽했어요. 강사님도 너무 친절하셨고요.',
    createdAt: '2026-03-16',
    updatedAt: '2026-03-16',
  },
  {
    id: 6,
    memberId: 106,
    eventId: 206,
    rating: 4,
    nickname: '숲속여행자',
    title: '가평 숲 캠핑 체험',
    content: '밤에 별이 너무 예뻤어요. 시설도 깔끔하고 좋았습니다.',
    createdAt: '2026-03-15',
    updatedAt: '2026-03-15',
  },
];

export default function ReviewPage() {
  // const { data: reviews = [] } = useGetBestReviews();
  const [lists, setLists] = useState(reviews);
  const [hasMore, setHasMore] = useState(true);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const loadMore = useCallback(() => {
    const nextId = lists.length + 1;
    const newItems: Review[] = Array.from({ length: 6 }, (_, i) => ({
      id: nextId + i,
      memberId: nextId + i,
      eventId: nextId + i,
      rating: Math.ceil(Math.random() * 5),
      nickname: `유저${nextId + i}`,
      title: `체험 리뷰 ${nextId + i}`,
      content: '정말 즐거운 체험이었어요. 다음에도 꼭 참여하고 싶습니다.',
      createdAt: '2026-03-01',
      updatedAt: '2026-03-01',
    }));
    setLists((prev) => [...prev, ...newItems]);
    if (lists.length + newItems.length >= 100) setHasMore(false);
  }, [lists.length]);

  const loadMoreRef = useInfiniteScroll(loadMore, hasMore);

  return (
    <section className="px-8 py-6">
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-semibold">베스트 리뷰</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {lists.map((review) => (
          <ReviewCard
            key={review.id}
            {...review}
            onClick={() => setSelectedReview(review)}
          />
        ))}
      </div>

      <div ref={loadMoreRef} className="h-1" />

      <ReviewDetailModal
        open={selectedReview !== null}
        onOpenChange={(open) => { if (!open) setSelectedReview(null); }}
        review={selectedReview}
      />
    </section>
  );
}
