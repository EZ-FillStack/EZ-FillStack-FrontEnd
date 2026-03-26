import { ArrowLeft } from 'lucide-react';
import { useParams } from 'react-router';
import type { EventType } from '@/types/event';
import EventCard from '@/components/cards/EventCard';
import { categories } from '@/lib/categories';
import { useState, useCallback } from 'react';
// 무한 스크롤
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

// item은 우선 예시입니다
const items:EventType[] = [
  {
    id: 1,
    title: '체험 1',
    status: 'OPEN',
    applyEndDateTime: '2026-03-10T23:59:00',
  },
  {
    id: 2,
    title: '체험 2',
    status: 'OPEN',
    applyEndDateTime: '2026-03-06T10:00:00',
  },
  {
    id: 3,
    title: '체험 3',
    status: 'CLOSED',
    applyEndDateTime: '2026-03-01T23:59:00',
  },
  {
    id: 4,
    title: '체험 4',
    status: 'OPEN',
    applyEndDateTime: '2026-03-20T23:59:00',
  },
  {
    id: 5,
    title: '체험 5',
    status: 'OPEN',
    applyEndDateTime: '2026-03-30T23:59:00',
  },
];

export default function CategoryPage() {
  const { categoryId } = useParams();
  const cid = Number(categoryId);

  const categoryName =
    categories.find((c) => c.id === cid)?.label ?? '카테고리';

  // 무한 스크롤 적용 상태
  const [lists, setLists] = useState(items);
  const [hasMore, setHasMore] = useState(true);
  /*
    const [page, setPage] = useState(1); //실제로 스크롤링할 페이지 기준
    const [loading, setLoading] = useState(false); //무한 스크롤링할 때마다 로딩
   */

  // 다음 페이지 로드(임의로 채워뒀습니다)
  const loadMore = useCallback(() => {
    // 이 부분은 임의로 넣어둔 곳이라 실제 데이터 들어오면 수정 필요
    const nextId = lists.length + 1;
    const newItem:EventType[] = Array.from({ length: 5 }, (_, i) => ({
      id: nextId + i,
      title: `체험 ${nextId + i}`,
      status: 'CLOSED',
      applyEndDateTime: '2026-04-30T23:59:59',
    }));
    setLists((prev) => [...prev, ...newItem]);
    // 100개까지 쭉 늘려봄
    if (lists.length + newItem.length >= 100) setHasMore(false);
  }, [lists.length]);

  const loadMoreRef = useInfiniteScroll(loadMore, hasMore);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <section className="px-8 py-6">
      {/* 타이틀 */}
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-semibold">{categoryName}</h1>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {lists.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            thumbnailUrl="/placeholder.png"
            placeName="강남"
            eventStartDateTime=""
            applyEndDateTime={event.applyEndDateTime || '1990-01-01'}
            status={event.status}
            capacity={0}
            currentParticipants={0}
            size="sm"
            badgeType="default"
            linkTo="experiences"
          />
        ))}
      </div>

      {/* 무한 스크롤 감지 타겟 */}
      <div ref={loadMoreRef} className="h-1" />
    </section>
  );
}
