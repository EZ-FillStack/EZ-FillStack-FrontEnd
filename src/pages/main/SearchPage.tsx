import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Pagination from '@/components/nav/Pagination';
import EventCard from '@/components/cards/EventCard';
import { searchEvents } from '@/api/search';
import { PAGE_SIZE } from '@/lib/pagination';
import { generateErrorMessage } from '@/lib/error';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['search', keyword, page],
    queryFn: () =>
      searchEvents({
        keyword: keyword.trim() || undefined,
        page: page - 1,
        size: PAGE_SIZE,
      }),
  });

  const items = data?.content ?? [];
  const totalPages = Math.max(1, data?.totalPages ?? 1);
  const safePage = Math.min(page, totalPages);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          <span className="text-primary">{keyword || '(전체)'}</span>의 검색 결과
        </h1>
      </div>

      {isLoading && (
        <p className="text-sm text-muted-foreground">검색 중...</p>
      )}
      {isError && (
        <p className="text-sm text-destructive">
          {generateErrorMessage(error, 'search')}
        </p>
      )}
      {!isLoading && !isError && items.length === 0 && (
        <p className="text-sm text-muted-foreground">검색 결과가 없습니다.</p>
      )}

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            thumbnailUrl={event.thumbnailUrl ?? '/placeholder.png'}
            placeName={event.placeName ?? '-'}
            eventStartDateTime={event.eventStartDateTime ?? ''}
            applyEndDateTime={event.applyEndDateTime ?? ''}
            status={event.status ?? 'OPEN'}
            capacity={event.capacity ?? 0}
            currentParticipants={event.currentParticipants ?? 0}
            size="sm"
            badgeType="default"
            linkTo="events"
          />
        ))}
      </div>

      {!isLoading && !isError && items.length > 0 && (
        <Pagination
          page={safePage}
          totalPages={totalPages}
          onPageChange={(p) =>
            setSearchParams({ keyword, page: String(p) })
          }
        />
      )}
    </div>
  );
}
