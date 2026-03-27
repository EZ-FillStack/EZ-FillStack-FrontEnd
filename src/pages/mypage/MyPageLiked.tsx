import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Search } from 'lucide-react';
// 페이지네이션
import Pagination from '@/components/nav/Pagination';
import MyStatusBadge from '@/components/badge/MyStatusBadge';
import BookmarkButton from '@/components/actions/BookmarkButton';
import type { EventType } from '@/types/event';
import { Input } from '@/components/ui/input';

// 예시
const likedExperiences: EventType[] = [
  {
    id: 1,
    title: '도자기 만들기 체험',
    eventStartDateTime: '2026.03.15 14:00',
    placeName: '서울시 강남구',
    status: 'OPEN',
    thumbnailUrl: 'https://picsum.photos/seed/experience01/160/110',
  },
  {
    id: 2,
    title: '전통 한지 공예 체험',
    eventStartDateTime: '2026.03.20 10:00',
    placeName: '서울시 종로구',
    status: 'UPCOMING',
    thumbnailUrl: 'https://picsum.photos/seed/experience02/160/110',
  },
  {
    id: 3,
    title: '가죽 공예 원데이 클래스',
    eventStartDateTime: '2026.03.25 15:00',
    placeName: '서울시 마포구',
    status: 'CLOSED',
    thumbnailUrl: 'https://picsum.photos/seed/experience03/160/110',
  },
  {
    id: 4,
    title: '천연 염색 체험',
    eventStartDateTime: '2026.04.01 13:00',
    placeName: '서울시 성동구',
    status: 'OPEN',
    thumbnailUrl: 'https://picsum.photos/seed/experience04/160/110',
  },
  {
    id: 5,
    title: '목공예 원데이 클래스',
    eventStartDateTime: '2026.04.05 10:00',
    placeName: '서울시 용산구',
    status: 'UPCOMING',
    thumbnailUrl: 'https://picsum.photos/seed/experience05/160/110',
  },
  {
    id: 6,
    title: '캔들 만들기 체험',
    eventStartDateTime: '2026.04.10 14:00',
    placeName: '서울시 서대문구',
    status: 'OPEN',
    thumbnailUrl: 'https://picsum.photos/seed/experience06/160/110',
  },
];

// API 응답: { page: { page, size, totalPages, hasNext } } / size는 API 요청 시 사용
const PAGE_SIZE = 2; // API 연결 시 수정합니다.

function normalizeKeyword(value: string) {
  return value.trim().toLowerCase();
}

export default function MyPageLiked() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const keyword = searchParams.get('keyword') ?? '';
  const [draftKeyword, setDraftKeyword] = useState(keyword);

  useEffect(() => {
    setDraftKeyword(keyword);
  }, [keyword]);

  const filtered = likedExperiences.filter((x) => {
    const kw = normalizeKeyword(keyword);
    if (!kw) return true;
    const hay = `${x.title ?? ''} ${x.placeName ?? ''}`.toLowerCase();
    return hay.includes(kw);
  });

  const TOTAL_PAGES = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, TOTAL_PAGES);

  const paginatedItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div>
      <div className="text-xl font-semibold text-slate-900">관심 체험 목록</div>
      <div className="flex justify-between mt-6">
        <div className="flex-1 flex justify-end items-center gap-1">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchParams({ keyword: draftKeyword, page: '1' });
              }}
            >
              <Input
                placeholder="검색어를 입력하세요"
                className="pl-9 rounded-2xl"
                value={draftKeyword}
                onChange={(e) => setDraftKeyword(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
          <div className="mt-6 space-y-4">
            {paginatedItems.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    {/* 썸네일 */}
                    <div className="flex h-28 w-40 shrink-0 items-center justify-center rounded-md bg-slate-300 text-sm text-slate-600 overflow-hidden">
                      {item.thumbnailUrl && <img src={item.thumbnailUrl} alt="행사 이미지"/>}
                    </div>

                    {/* 정보 */}
                    <div className="pt-1">
                      <div className="text-lg font-medium">{item.title}</div>

                      <div className="mt-3 space-y-2 text-sm text-slate-700">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={16} className="text-slate-500" />
                          <span>{item.eventStartDateTime}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-slate-500" />
                          <span>{item.placeName}</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <MyStatusBadge status={item.status} size="lg" />
                      </div>
                    </div>
                  </div>

                  {/* 우측 버튼 영역 */}
                  <div className="flex items-start gap-2 pt-1">
                    <BookmarkButton
                      isBookmarked
                      onToggle={() => {}}
                      className="bg-transparent p-1"
                    />

                    <Button
                      type="button"
                      className="h-8 bg-gray-600 px-3 text-xs text-white hover:bg-gray-800"
                    >
                      상세보기
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Pagination
            page={safePage}
            totalPages={TOTAL_PAGES}
            onPageChange={(p) =>
              setSearchParams({ keyword, page: String(p) })
            }
          />
    </div>
  );
}
