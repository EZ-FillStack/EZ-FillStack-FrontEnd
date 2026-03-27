import { Link, useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Search, X } from 'lucide-react';
import { useCancelApplication } from '@/hooks/mutations/events/useCancelApplication';
// import { useMyApplications } from '@/hooks/queries/events/useMyApplications';
// 페이지네이션
import Pagination from '@/components/nav/Pagination';
import MyStatusBadge from '@/components/badge/MyStatusBadge';
import { useEffect, useState } from 'react';
import ReviewWriteModal from '@/components/review/ReviewWriteModal';
import { Input } from '@/components/ui/input';

type AppliedExperience = {
  id: number;
  title: string;
  thumbnailUrl?: string;
  appliedAt: string; // 신청 일자(기간 필터 기준)
  eventStartDateTime: string;
  placeName: string;
  status: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'FAILED';
  hasReview: boolean;
};
// 예시
const appliedExperiences: AppliedExperience[] = [
  {
    id: 1,
    title: '도자기 만들기 체험',
    appliedAt: '2026-02-01T10:00:00.000Z',
    eventStartDateTime: '2026.03.15 14:00',
    placeName: '서울시 강남구',
    status: 'APPROVED',
    hasReview: false,
    thumbnailUrl: 'https://picsum.photos/seed/experience01/160/110',
  },
  {
    id: 2,
    title: '전통 한지 공예 체험',
    appliedAt: '2026-02-10T09:20:00.000Z',
    eventStartDateTime: '2026.03.20 10:00',
    placeName: '서울시 종로구',
    status: 'COMPLETED',
    hasReview: true,
    thumbnailUrl: 'https://picsum.photos/seed/experience02/160/110',
  },
  {
    id: 3,
    title: '가죽 공예 원데이 클래스',
    appliedAt: '2026-02-15T12:00:00.000Z',
    eventStartDateTime: '2026.03.25 15:00',
    placeName: '서울시 마포구',
    status: 'PENDING',
    hasReview: true,
    thumbnailUrl: 'https://picsum.photos/seed/experience03/160/110',
  },
  {
    id: 4,
    title: '천연 염색 체험',
    appliedAt: '2026-01-28T11:00:00.000Z',
    eventStartDateTime: '2026.04.01 13:00',
    placeName: '서울시 성동구',
    status: 'FAILED',
    hasReview: false,
    thumbnailUrl: 'https://picsum.photos/seed/experience04/160/110',
  },
  {
    id: 5,
    title: '목공예 원데이 클래스',
    appliedAt: '2026-02-05T14:00:00.000Z',
    eventStartDateTime: '2026.04.05 10:00',
    placeName: '서울시 용산구',
    status: 'COMPLETED',
    hasReview: false,
    thumbnailUrl: 'https://picsum.photos/seed/experience05/160/110',
  },
  {
    id: 6,
    title: '캔들 만들기 체험',
    appliedAt: '2026-02-20T10:00:00.000Z',
    eventStartDateTime: '2026.04.10 14:00',
    placeName: '서울시 서대문구',
    status: 'APPROVED',
    hasReview: true,
    thumbnailUrl: 'https://picsum.photos/seed/experience06/160/110',
  },
];

type PeriodKey = '7d' | '15d' | '1m' | '2m' | '3m' | 'all';

function normalizeKeyword(value: string) {
  return value.trim().toLowerCase();
}

function periodToDays(period: PeriodKey): number | null {
  switch (period) {
    case '7d':
      return 7;
    case '15d':
      return 15;
    case '1m':
      return 30;
    case '2m':
      return 60;
    case '3m':
      return 90;
    case 'all':
      return null;
  }
}

function withinDays(iso: string, days: number) {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return false;
  const now = Date.now();
  const diff = now - t;
  return diff >= 0 && diff <= days * 24 * 60 * 60 * 1000;
}

export default function MyPageApplied() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const { data: items = [] } = useMyApplications();
  const [items, setItems] = useState(appliedExperiences);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const { mutate: cancelApplicationMutate } = useCancelApplication();

  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const keyword = searchParams.get('keyword') ?? '';
  const period = (searchParams.get('period') as PeriodKey) || 'all';
  const [draftKeyword, setDraftKeyword] = useState(keyword);

  useEffect(() => {
    setDraftKeyword(keyword);
  }, [keyword]);

  const filteredItems = items.filter((x) => {
    const kw = normalizeKeyword(keyword);
    const hay = `${x.title}`.toLowerCase();
    const keywordOk = kw ? hay.includes(kw) : true;

    const days = periodToDays(period);
    const periodOk = days == null ? true : withinDays(x.appliedAt, days);

    return keywordOk && periodOk;
  });

  // API 응답: { page: { page, size, totalPages, hasNext } } / size는 API 요청 시 사용
  const PAGE_SIZE = 2; // API 연결 시 수정합니다.
  const TOTAL_PAGES = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));

  const safePage = Math.min(page, TOTAL_PAGES);
  const paginatedItems = filteredItems.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const handleReviewModalChange = (open: boolean) => {
    setIsReviewModalOpen(open);
    if (!open) {
      setSelectedEventId(null);
    }
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div>
      <div className="text-xl font-semibold text-slate-900">
        신청한 체험 목록
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              ['7d', '7일'],
              ['15d', '15일'],
              ['1m', '1개월'],
              ['2m', '2개월'],
              ['3m', '3개월'],
              ['all', '전체'],
            ] as const
          ).map(([key, label]) => (
            <Button
              key={key}
              type="button"
              size="sm"
              variant={period === key ? 'default' : 'outline'}
              className="h-8 text-xs"
              onClick={() =>
                setSearchParams({
                  keyword,
                  period: key,
                  page: '1',
                })
              }
            >
              {label}
            </Button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchParams({
                keyword: draftKeyword,
                period,
                page: '1',
              });
            }}
          >
            <Input
              placeholder="제목/내용 검색"
              className="pl-9 rounded-2xl"
              value={draftKeyword}
              onChange={(e) => setDraftKeyword(e.target.value)}
            />
          </form>
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

                  <div className="mt-3 flex items-center gap-2">
                    <MyStatusBadge status={item.status} size="lg" />

                    {item.status === 'COMPLETED' &&
                      (item.hasReview ? (
                        <span className="text-xs text-slate-400">
                          리뷰 작성 완료
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedEventId(item.id);
                            setIsReviewModalOpen(true);
                          }}
                        >
                          리뷰 작성
                        </Button>
                      ))}
                  </div>
                </div>
              </div>

              {/* 우측 버튼 영역 */}
              <div className="flex items-start gap-2 pt-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label="삭제"
                  onClick={() => handleDelete(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="flex flex-col gap-1">
                  <Link to={`/events/${item.id}`}>
                    <Button
                      type="button"
                      className="h-8 w-full px-3 text-xs bg-gray-600 hover:bg-gray-800 text-white"
                    >
                      상세보기
                    </Button>
                  </Link>
                  {item.status !== 'COMPLETED' && (
                    <Button
                      type="button"
                      className="h-8 w-full px-3 text-xs bg-slate-300 hover:bg-slate-400 text-slate-700"
                      onClick={() => cancelApplicationMutate(item.id)}
                    >
                      신청 취소
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Pagination
        page={safePage}
        totalPages={TOTAL_PAGES}
        onPageChange={(p) =>
          setSearchParams({ keyword, period, page: String(p) })
        }
      />

      <ReviewWriteModal
        open={isReviewModalOpen}
        onOpenChange={handleReviewModalChange}
        eventId={selectedEventId}
      />
    </div>
  );
}
