import { categories } from '@/lib/categories';
import { Link } from 'react-router';
import EventCard from '@/components/cards/EventCard';
import EventStatusBadge from '@/components/events/EventStatusBadge';

export default function MainPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-2 pb-2">
      <div className="p-4">
        <div className="flex flex-col gap-8">
          {/* 이벤트 배너 */}
          <section className="rounded-xl bg-muted h-72 flex items-center justify-center">
            이벤트 이미지
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

          {/* 인기 체험 */}
          <section className="flex flex-col gap-5">
            <h2 className="text-xl font-semibold">인기 체험</h2>
            <div className="flex gap-6">
              {[1, 2, 3, 4].map((i) => (
                <EventCard
                  key={i}
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
                  size="sm"
                />
              ))}
            </div>
          </section>

          {/* 베스트 리뷰 */}
          <section className="flex flex-col gap-5">
            <h2 className="text-xl font-semibold">베스트 리뷰</h2>
            <div className="flex gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex-1 rounded-xl border bg-card h-28"
                />
              ))}
            </div>
          </section>

          {/* 오픈 예정 체험 */}
          <section className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">오픈 예정 체험</h2>

              <EventStatusBadge
                status="OPEN"
                applyEndDateTime="2026-03-09"
                eventStartDateTime="2026-03-10"
              />
            </div>
            <div className="flex gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex-1 rounded-xl border bg-card h-52"
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
