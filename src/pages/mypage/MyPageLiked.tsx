import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useQueries } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Search } from 'lucide-react';
import Pagination from '@/components/nav/Pagination';
import MyStatusBadge from '@/components/badge/MyStatusBadge';
import BookmarkButton from '@/components/actions/BookmarkButton';
import { Input } from '@/components/ui/input';
import { PAGE_SIZE } from '@/lib/pagination';
import { useMyBookmarks } from '@/hooks/queries/useMyBookmarks';
import { useRemoveBookmark } from '@/hooks/mutations/bookmark/useRemoveBookmark';
import { getEventDetail } from '@/api/events';
import { Link } from 'react-router';

function normalizeKeyword(value: string) {
  return value.trim().toLowerCase();
}

export default function MyPageLiked() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: bookmarks = [] } = useMyBookmarks();
  const { mutate: removeBookmark } = useRemoveBookmark();

  // 찜 목록 응답엔 제목/eventId만 있어, 카드에 필요한 썸네일·일시·장소·상태는
  // 각 이벤트 상세에서 받아와 병합합니다. (상세 페이지와 캐시 공유)
  const detailQueries = useQueries({
    queries: bookmarks.map((bookmark) => ({
      queryKey: ['eventDetail', bookmark.eventId],
      queryFn: () => getEventDetail(bookmark.eventId),
      staleTime: 60_000,
    })),
  });

  const items = bookmarks.map((bookmark, index) => ({
    bookmarkId: bookmark.bookmarkId,
    eventId: bookmark.eventId,
    title: bookmark.eventTitle,
    detail: detailQueries[index]?.data,
  }));

  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const keyword = searchParams.get('keyword') ?? '';
  const [draftKeyword, setDraftKeyword] = useState(keyword);

  useEffect(() => {
    setDraftKeyword(keyword);
  }, [keyword]);

  const filtered = items.filter((x) => {
    const kw = normalizeKeyword(keyword);
    if (!kw) return true;
    const hay = `${x.title ?? ''} ${x.detail?.placeName ?? ''}`.toLowerCase();
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
                key={item.bookmarkId}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    {/* 썸네일 */}
                    <div className="flex h-28 w-40 shrink-0 items-center justify-center rounded-md bg-slate-300 text-sm text-slate-600 overflow-hidden">
                      {item.detail?.thumbnailUrl && <img src={item.detail.thumbnailUrl} alt="행사 이미지"/>}
                    </div>

                    {/* 정보 */}
                    <div className="pt-1">
                      <div className="text-lg font-medium">{item.title}</div>

                      <div className="mt-3 space-y-2 text-sm text-slate-700">
                        {item.detail?.eventStartDateTime && (
                          <div className="flex items-center gap-2">
                            <CalendarDays size={16} className="text-slate-500" />
                            <span>{item.detail.eventStartDateTime}</span>
                          </div>
                        )}

                        {item.detail?.placeName && (
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-slate-500" />
                            <span>{item.detail.placeName}</span>
                          </div>
                        )}
                      </div>

                      {item.detail?.status && (
                        <div className="mt-3">
                          <MyStatusBadge status={item.detail.status} size="lg" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 우측 버튼 영역 */}
                  <div className="flex items-start gap-2 pt-1">
                    <BookmarkButton
                      isBookmarked
                      onToggle={() => removeBookmark(item.eventId)}
                      className="bg-transparent p-1"
                    />

                    <Link to={`/events/${item.eventId}`}>
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
