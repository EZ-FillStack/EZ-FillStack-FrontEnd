import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ReviewCard from '@/components/cards/ReviewCard';
import ReviewDetailModal from '@/components/review/ReviewDetailModal';
import type { Review } from '@/types/review';
import { useGetBestReviews } from '@/hooks/queries/review/useGetBestReviews';

export default function ReviewPage() {
  const { data: reviews = [] } = useGetBestReviews();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

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
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            {...review}
            onClick={() => setSelectedReview(review)}
          />
        ))}
      </div>

      <ReviewDetailModal
        open={selectedReview !== null}
        onOpenChange={(open) => { if (!open) setSelectedReview(null); }}
        review={selectedReview}
      />
    </section>
  );
}
