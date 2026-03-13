import { categories } from '@/lib/categories';
import { Link } from 'react-router';
import EventCard from '@/components/cards/EventCard';
import EventStatusBadge from '@/components/events/EventStatusBadge';
// 메인에 슬라이더(carousel) 추가
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

export default function MainPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-2 pb-2">
      <div className="p-4">
        <div className="flex flex-col gap-8">
          {/* 이벤트 배너 슬라이더 - 자동 슬라이더 */}
          <section>
            <Carousel plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}>
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
                <div className="h-20 w-20 rounded-full bg-muted" />
                <span className="text-sm text-muted-foreground">{c.label}</span>
              </Link>
            ))}
          </section>

          {/* 인기 체험 수동 슬라이더 */}
          <section className="flex flex-col gap-5">
            <h2 className="text-xl font-semibold">인기 체험</h2>
            <Carousel opts={{ slidesToScroll: 1, align: 'start', duration: 15}}>
              <CarouselContent>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <CarouselItem key={i} className="basis-1/4">
                    <EventCard
                      id={i}
                      title={`체험 ${i}`}
                      thumbnailUrl="/placeholder.png"
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
            <h2 className="text-xl font-semibold">베스트 리뷰</h2>
            <Carousel opts={{ slidesToScroll: 1, align: 'start', duration: 15}}>
              <CarouselContent>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <CarouselItem key={i} className="basis-1/4">
                    <div className="rounded-xl border bg-card h-28" />
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
              <EventStatusBadge
                status="OPEN"
                applyEndDateTime="2026-03-09"
                eventStartDateTime="2026-03-10"
              />
            </div>
            <Carousel opts={{ slidesToScroll: 1, align: 'start', duration: 15}}>
              <CarouselContent>
                {[1, 2, 3, 4, 5].map((i) => (
                  <CarouselItem key={i} className="basis-1/3">
                    <div className="rounded-xl border bg-card h-52" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
        </div>
      </div>
    </div>
  );
}
