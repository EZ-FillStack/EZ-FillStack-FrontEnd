import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/nav/Pagination';
import type { Review } from '@/types/review';
import { User } from 'lucide-react';
import { PAGE_SIZE } from '@/lib/pagination';

type SortKey = 'latest' | 'oldest' | 'rating';

// 리뷰 목록 더미입니다.
const rows: Review[] = [
  {
    id: 1,
    memberId: 101,
    eventId: 1,
    rating: 42,
    content: '강사님이 친절해서 재방문 꼭 하고 싶어요.',
    createdAt: '2026-02-18T12:00:00.000Z',
    updatedAt: '2026-02-18T12:00:00.000Z',
    nickname: 'user01',
    title: '도자기 만들기 체험',
  },
  {
    id: 2,
    memberId: 104,
    eventId: 6,
    rating: 8,
    content: '시간이 조금 타이트했지만 재미있었습니다.',
    createdAt: '2026-02-10T09:00:00.000Z',
    updatedAt: '2026-02-10T09:00:00.000Z',
    nickname: 'user04',
    title: '캔들 만들기 체험',
  },
  {
    id: 3,
    memberId: 102,
    eventId: 2,
    rating: 120,
    content: '설명이 자세해서 초보자도 따라가기 좋았어요.',
    createdAt: '2026-02-22T15:00:00.000Z',
    updatedAt: '2026-02-22T15:00:00.000Z',
    nickname: 'user02',
    title: '전통 한지 공예 체험',
  },
  {
    id: 4,
    memberId: 103,
    eventId: 3,
    rating: 15,
    content: '작품 하나 완성하고 와서 뿌듯했습니다.',
    createdAt: '2026-01-28T11:00:00.000Z',
    updatedAt: '2026-01-28T11:00:00.000Z',
    nickname: 'user03',
    title: '가죽 공예 원데이',
  },
  {
    id: 5,
    memberId: 105,
    eventId: 4,
    rating: 33,
    content: '색이 예쁘게 나왔고 친구들한테도 추천했습니다.',
    createdAt: '2026-02-05T14:00:00.000Z',
    updatedAt: '2026-02-05T14:00:00.000Z',
    nickname: 'user05',
    title: '천연 염색 체험',
  },
];

function sortReviews(list: Review[], sort: SortKey): Review[] {
  const next = [...list];
  if (sort === 'latest') {
    next.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } else if (sort === 'oldest') {
    next.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  } else {
    next.sort((a, b) => b.rating - a.rating);
  }
  return next;
}

function formatDate(iso: string) {
  return iso.slice(0, 10);
}

export default function AdminReviewsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const sort = (searchParams.get('sort') as SortKey) || 'latest';
  const sortKey: SortKey = ['latest', 'oldest', 'rating'].includes(sort) ? sort : 'latest';

  const sortedRows = useMemo(() => sortReviews(rows, sortKey), [sortKey]);

  const TOTAL_PAGES = Math.max(1, Math.ceil(sortedRows.length / PAGE_SIZE));
  const paginatedItems = sortedRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const setSort = (next: SortKey) => {
    setSearchParams({ page: '1', sort: next });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">리뷰 관리</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        리뷰 목록을 조회합니다.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-end gap-2 sm:mt-12">
        <Button
          type="button"
          size="sm"
          variant={sortKey === 'latest' ? 'default' : 'outline'}
          className="h-8 text-xs"
          onClick={() => setSort('latest')}
        >
          등록순 (최신)
        </Button>
        <Button
          type="button"
          size="sm"
          variant={sortKey === 'oldest' ? 'default' : 'outline'}
          className="h-8 text-xs"
          onClick={() => setSort('oldest')}
        >
          등록순 (오래된)
        </Button>
        <Button
          type="button"
          size="sm"
          variant={sortKey === 'rating' ? 'default' : 'outline'}
          className="h-8 text-xs"
          onClick={() => setSort('rating')}
        >
          좋아요 많은 순
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="divide-y divide-slate-200">
          {paginatedItems.map((row) => (
            <div
              key={row.id}
              className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-slate-900">{row.title}</span>
                  <span className="text-sm font-medium text-slate-600">
                    좋아요 {row.rating.toLocaleString()}
                  </span>
                </div>
                <div className="text-sm text-slate-600 flex gap-1">
                  <User size={15} className="text-slate-500" />
                  {row.nickname}
                </div>
                <p className="line-clamp-2 text-sm text-slate-700">{row.content}</p>
                <div className="text-xs text-slate-500">
                  등록 {formatDate(row.createdAt)} · 수정 {formatDate(row.updatedAt)}
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <Button type="button" variant="outline" size="sm" className="h-8 text-xs">
                  상세
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Pagination
        page={page}
        totalPages={TOTAL_PAGES}
        onPageChange={(p) => setSearchParams({ page: String(p), sort: sortKey })}
      />
    </div>
  );
}
