import { categories } from '@/lib/categories';
import { Link } from 'react-router';
import EventCard from '@/components/cards/EventCard';
import ReviewCard from '@/components/cards/ReviewCard';
import Autoplay from 'embla-carousel-autoplay';
import { useGetBestReviews } from '@/hooks/queries/review/useGetBestReviews';
import { useGetPopularEvents } from '@/hooks/queries/events/useGetPopularEvents';
import { useGetUpcomingEvents } from '@/hooks/queries/events/useGetUpcomingEvents';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { useState } from 'react';
import ReviewDetailModal from '@/components/review/ReviewDetailModal';
import type { Review } from '@/types/review';
import { categoryIconByEng } from '@/assets/icons/categoryIcons.ts';

export default function MainPage() {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const { data: bestReviews = [] } = useGetBestReviews();
  const { data: popularEvents = [] } = useGetPopularEvents();
  const { data: upcomingEvents = [] } = useGetUpcomingEvents();

  const handleReviewClick = (review: Review) => {
    setSelectedReview(review);
    setIsReviewModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pt-2 pb-2">
      <div className="p-4">
        <div className="flex flex-col gap-8">
          {/* 이벤트 배너 슬라이더 - 자동 슬라이더 */}
          <section>
            <Carousel
              plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
            >
              <CarouselContent>
                {[1, 2, 3].map((i) => (
                  <CarouselItem key={i}>
                    <div className="rounded-xl bg-muted h-72 flex items-center justify-center text-muted-foreground">
                      이벤트 배너 {i}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>

          {/* 카테고리 아이콘 */}
          <section className="flex items-center justify-center gap-12">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/categories/${c.id}`}
                className="flex flex-col items-center gap-2"
              >
                <div className="h-20 w-20 rounded-full bg-muted">
                  <img src={categoryIconByEng[c.eng]} alt={c.label}/>
                </div>
                <span className="text-sm text-foreground">{c.label}</span>
              </Link>
            ))}
          </section>

          {/* 인기 체험 수동 슬라이더 */}
          <section className="flex flex-col gap-5">
            <h2 className="text-xl font-semibold">인기 체험</h2>
            <Carousel
              opts={{ slidesToScroll: 1, align: 'start', duration: 15 }}
            >
              <CarouselContent>
                {popularEvents.slice(0, 10).map((event) => (
                  <CarouselItem key={event.id} className="basis-1/4">
                    <EventCard
                      {...event}
                      thumbnailUrl={event.thumbnailUrl ?? '/placeholder.png'}
                      applyEndDateTime={event.applyEndDateTime ?? ''}
                      isBookmarked={false}
                      badgeType="default"
                      size="md"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>

          {/* 베스트 리뷰 - 수동 슬라이더 */}
          <section className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">베스트 리뷰</h2>

              <Link
                to="/reviews"
                className="text-sm text-muted-foreground hover:underline"
              >
                전체보기
              </Link>
            </div>
            <Carousel
              opts={{ slidesToScroll: 1, align: 'start', duration: 15 }}
            >
              <CarouselContent>
                {bestReviews.slice(0, 10).map((review) => (
                  <CarouselItem key={review.id} className="basis-1/4">
                    <ReviewCard
                      {...review}
                      onClick={() => handleReviewClick(review)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>

          {/* 오픈 예정 체험 - 수동 슬라이더 */}
          <section className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">오픈 예정 체험</h2>
            </div>
            <Carousel
              opts={{ slidesToScroll: 1, align: 'start', duration: 15 }}
            >
              <CarouselContent>
                {upcomingEvents.slice(0, 10).map((event) => (
                  <CarouselItem key={event.id} className="basis-1/3">
                    <EventCard
                      {...event}
                      thumbnailUrl={event.thumbnailUrl ?? '/placeholder.png'}
                      applyEndDateTime={event.applyEndDateTime ?? ''}
                      isBookmarked={false}
                      badgeType="upcoming"
                      size="lg"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
        </div>
        {selectedReview && (
          <ReviewDetailModal
            open={isReviewModalOpen}
            onOpenChange={setIsReviewModalOpen}
            review={selectedReview}
          />
        )}
      </div>
    </div>
  );
}
