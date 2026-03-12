import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays, HeartIcon, MapPin } from 'lucide-react';
// 페이지네이션
import Pagination from '@/components/nav/Pagination';

type LikedExperience = {
  id: number;
  title: string;
  thumbnailUrl?: string;
  eventStartDateTime: string;
  placeName: string;
  status: 'OPEN' | 'CLOSED';
};

// 예시
const likedExperiences: LikedExperience[] = [
  {
    id: 1,
    title: '도자기 만들기 체험',
    eventStartDateTime: '2026.03.15 14:00',
    placeName: '서울시 강남구',
    status: 'OPEN',
  },
  {
    id: 2,
    title: '전통 한지 공예 체험',
    eventStartDateTime: '2026.03.20 10:00',
    placeName: '서울시 종로구',
    status: 'OPEN',
  },
  {
    id: 3,
    title: '가죽 공예 원데이 클래스',
    eventStartDateTime: '2026.03.25 15:00',
    placeName: '서울시 마포구',
    status: 'CLOSED',
  },
  { id: 4, title: '천연 염색 체험', eventStartDateTime: '2026.04.01 13:00', placeName: '서울시 성동구', status: 'OPEN' },
  { id: 5, title: '목공예 원데이 클래스', eventStartDateTime: '2026.04.05 10:00', placeName: '서울시 용산구', status: 'CLOSED' },
  { id: 6, title: '캔들 만들기 체험', eventStartDateTime: '2026.04.10 14:00', placeName: '서울시 서대문구', status: 'OPEN' },
];

// 더미: 총 3페이지, API 연결 시 교체
const PAGE_SIZE = 2;
const TOTAL_PAGES = Math.ceil(likedExperiences.length / PAGE_SIZE);

export default function MyPageLiked() {
  const [page, setPage] = useState(1);
  const paginatedItems = likedExperiences.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE,
  );

  return (
    <div>
      <div className="text-xl font-semibold text-slate-900">관심 체험 목록</div>

      <div className="mt-6 space-y-4">
        {paginatedItems.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                {/* 썸네일 */}
                <div className="flex h-28 w-40 shrink-0 items-center justify-center rounded-md bg-slate-300 text-sm text-slate-600">
                  이미지
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
                    {item.status === 'OPEN' ? (
                      <span className="inline-flex rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                        모집중
                      </span>
                    ) : (
                      <span className="inline-flex rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                        마감
                      </span>
                    )}
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
                  aria-label="북마크 해제"
                >
                  <HeartIcon className="h-5 w-5 fill-current text-rose-500" />
                </Button>

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

      <Pagination page={page} totalPages={TOTAL_PAGES} onPageChange={setPage} />
    </div>
  );
}