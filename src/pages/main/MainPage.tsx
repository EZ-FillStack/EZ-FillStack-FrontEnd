import { categories } from '@/lib/categories';
import { Link } from 'react-router';
import EventCard from '@/components/cards/EventCard';
import ReviewCard from '@/components/cards/ReviewCard';
// 메인에 슬라이더(carousel) 추가
import Autoplay from 'embla-carousel-autoplay';
// API 연결 예정
// import { useGetBestReviews } from '@/hooks/queries/review/useGetBestReviews';
// import { useGetPopularEvents } from '@/hooks/queries/events/useGetPopularEvents';
// import { useGetUpcomingEvents } from '@/hooks/queries/events/useGetUpcomingEvents';
// import { useGetCategories } from '@/hooks/queries/categories/useGetCategories';
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

// 임시 확인용
const bestReviews: Review[] = [
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
    nickname: '고양이',
    title: '성수 베이킹 클래스',
    content: '재료도 좋고 완성한 빵도 맛있어서 또 가고 싶어요.',
    createdAt: '2026-03-18',
    updatedAt: '2026-03-18',
  },
  {
    id: 4,
    memberId: 104,
    eventId: 204,
    rating: 4,
    nickname: '강아지',
    title: '뮤지컬 라이온킹 공연',
    content:
      '배우들 연기랑 무대 연출이 정말 압도적이었어요. 가격이 조금 있었지만 그만큼 충분히 값어치를 했습니다.',
    createdAt: '2026-03-17',
    updatedAt: '2026-03-17',
  },
];

// API 연결 예정
// const { data: bestReviews = [] } = useGetBestReviews();
// const { data: popularEvents = [] } = useGetPopularEvents();
// const { data: upcomingEvents = [] } = useGetUpcomingEvents();

export default function MainPage() {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

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
          {/* API 연결 예정: const { data: categories = [] } = useGetCategories(); */}
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
                {/* API 연결 예정: popularEvents.slice(0, 10).map((event) => (
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
                )) */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <CarouselItem key={i} className="basis-1/4">
                    <EventCard
                      id={i}
                      title={`체험 ${i}`}
                      thumbnailUrl={`https://picsum.photos/seed/experience${i}/250/160`}
                      placeName="서울 강남"
                      eventStartDateTime="2026-03-10"
                      applyEndDateTime="2026-03-09"
                      status="OPEN"
                      capacity={30}
                      currentParticipants={10}
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
                {/* API 연결 예정: bestReviews.slice(0, 10).map((review) => (...)) */}
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
                {/* API 연결 예정: upcomingEvents.slice(0, 10).map((event) => (
                  <CarouselItem key={event.id} className="basis-1/3">
                    <EventCard
                      {...event}
                      thumbnailUrl={event.thumbnailUrl ?? '/placeholder.png'}
                      applyEndDateTime={event.applyEndDateTime ?? ''}
                      isBookmarked={false}
                      badgeType="upcoming"
                      size="md"
                    />
                  </CarouselItem>
                )) */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <CarouselItem key={i} className="basis-1/3">
                    <EventCard
                        id={i}
                        title={`체험 ${i}`}
                        thumbnailUrl={`https://picsum.photos/seed/experience${i}/250/160`}
                        placeName="서울 강남"
                        eventStartDateTime="2026-04-28"
                        applyEndDateTime="2027-03-09"
                        status="UPCOMING"
                        capacity={30}
                        currentParticipants={10}
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
