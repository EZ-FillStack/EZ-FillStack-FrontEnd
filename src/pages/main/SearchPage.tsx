import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import Pagination from '@/components/nav/Pagination';
import EventCard from '@/components/cards/EventCard';
import type { EventType } from '@/types/event';

const PAGE_SIZE = 10;

const mockEvents: EventType[] = [
  {
    id: 1,
    title: '도자기 만들기 체험',
    placeName: '서울 강남구',
    status: 'OPEN',
    eventStartDateTime: '2026-03-15T14:00:00.000Z',
    applyEndDateTime: '2026-03-10T23:59:59.000Z',
  },
  {
    id: 2,
    title: '전통 한지 공예 체험',
    placeName: '서울 종로구',
    status: 'UPCOMING',
    eventStartDateTime: '2026-03-20T10:00:00.000Z',
    applyEndDateTime: '2026-03-15T23:59:59.000Z',
  },
  {
    id: 3,
    title: '가죽 공예 원데이 클래스',
    placeName: '서울 마포구',
    status: 'CLOSED',
    eventStartDateTime: '2026-02-01T10:00:00.000Z',
    applyEndDateTime: '2026-01-25T23:59:59.000Z',
  },
];

function normalizeKeyword(value: string) {
  return value.trim().toLowerCase();
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);

  const filtered = useMemo(() => {
    const kw = normalizeKeyword(keyword);
    if (!kw) return mockEvents;
    return mockEvents.filter((e) => {
      const hay = `${e.title ?? ''} ${e.placeName ?? ''}`.toLowerCase();
      return hay.includes(kw);
    });
  }, [keyword]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900"><span className="text-primary">{keyword}</span>의 검색 결과</h1>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {paginatedItems.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            thumbnailUrl={event.thumbnailUrl ?? '/placeholder.png'}
            placeName={event.placeName ?? '-'}
            eventStartDateTime={event.eventStartDateTime ?? ''}
            applyEndDateTime={event.applyEndDateTime ?? ''}
            status={event.status}
            capacity={event.capacity ?? 0}
            currentParticipants={event.currentParticipants ?? 0}
            size="sm"
            badgeType="default"
            linkTo="experiences"
          />
        ))}
      </div>

      <Pagination
        page={safePage}
        totalPages={totalPages}
        onPageChange={(p) => setSearchParams({ keyword, page: String(p) })}
      />
    </div>
  );
}

