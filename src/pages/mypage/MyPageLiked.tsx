import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Search } from 'lucide-react';
import Pagination from '@/components/nav/Pagination';
import MyStatusBadge from '@/components/badge/MyStatusBadge';
import BookmarkButton from '@/components/actions/BookmarkButton';
import { Input } from '@/components/ui/input';
import { PAGE_SIZE } from '@/lib/pagination';
import { useMyBookmarks } from '@/hooks/queries/useMyBookmarks';
import { Link } from 'react-router';

function normalizeKeyword(value: string) {
  return value.trim().toLowerCase();
}

export default function MyPageLiked() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: items = [] } = useMyBookmarks();

  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const keyword = searchParams.get('keyword') ?? '';
  const [draftKeyword, setDraftKeyword] = useState(keyword);

  useEffect(() => {
    setDraftKeyword(keyword);
  }, [keyword]);

  const filtered = items.filter((x) => {
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

                    <Link to={`/events/${item.id}`}>
                      <Button
                        type="button"
                        className="h-8 bg-gray-600 px-3 text-xs text-white hover:bg-gray-800"
                      >
                        상세보기
                      </Button>
                    </Link>
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
