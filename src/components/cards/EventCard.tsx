import EventStatusBadge from '@/components/badge/EventStatusBadge.tsx';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { cn } from '@/lib/utils.ts';
import BookmarkButton from '@/components/actions/BookmarkButton';
import type { EventType } from '@/types/event';
import { MapPin } from 'lucide-react';
import useAppStore from '@/stores/useAppStore';
import { useMyBookmarks } from '@/hooks/queries/useMyBookmarks';
import { useAddBookmark } from '@/hooks/mutations/bookmark/useAddBookmark';
import { useRemoveBookmark } from '@/hooks/mutations/bookmark/useRemoveBookmark';

type EventCardProps = Pick<
    EventType,
    'id'
    | 'title'
    | 'thumbnailUrl'
    | 'placeName'
    | 'eventStartDateTime'
    | 'applyStartDateTime'
    | 'applyEndDateTime'
    | 'capacity'
    | 'currentParticipants'
    | 'status'
> & {
  thumbnailUrl: string;
  applyEndDateTime: string;
  applyStartDateTime?: string;
  size?: 'sm' | 'md' | 'lg';
  badgeType?: 'default' | 'upcoming';
  linkTo?: 'events';
};

const EventCard = ({
  id,
  title,
  thumbnailUrl,
  placeName,
  eventStartDateTime,
  applyStartDateTime,
  applyEndDateTime,
  status,
  capacity,
  currentParticipants,
  size,
  badgeType,
  linkTo = 'events',
}: EventCardProps) => {
  const navigate = useNavigate();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const { data: bookmarks = [] } = useMyBookmarks();
  const { mutate: addBookmark } = useAddBookmark();
  const { mutate: removeBookmark } = useRemoveBookmark();

  // 서버 이벤트 응답에는 찜 여부가 없어 내 찜 목록(eventId)과 대조해 판단합니다.
  const bookmarked = bookmarks.some((bookmark) => bookmark.eventId === id);

  const handleToggleBookmark = () => {
    if (!isAuthenticated) {
      toast.error('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (bookmarked) {
      removeBookmark(id);
    } else {
      addBookmark(id);
    }
  };

  return (
    <Link to={`/${linkTo}/${id}`} className="block h-full">
      <article
        className={cn(
          'flex h-full flex-col overflow-hidden rounded-lg border bg-background',
          size === 'sm',
          size === 'md',
          size === 'lg',
        )}
      >
        <div className="relative bg-gray-200">
          <img
            src={thumbnailUrl}
            alt={title}
            className="object-cover w-full h-40"
          />
          {/* 북마크 버튼 */}
          <div className="absolute top-2 right-2">
            <BookmarkButton
              isBookmarked={bookmarked}
              onToggle={handleToggleBookmark}
              stopNavigation
            />
          </div>
        </div>
        <div className={cn(size === 'sm' && 'p-4', (size === 'md' || size === 'lg' || !size) && 'p-3')}>
          <div className="flex justify-between items-start gap-1">
            <h3 className="text-foreground font-medium line-clamp-2 min-h-[3rem]">{title}</h3>
            {badgeType === 'default' && (
              <EventStatusBadge
                status={status}
                applyStartDateTime={applyStartDateTime}
                applyEndDateTime={applyEndDateTime}
              />
            )}
            {badgeType === 'upcoming' && (
              <EventStatusBadge
                status={status}
                applyStartDateTime={applyStartDateTime}
                applyEndDateTime={applyEndDateTime}
                eventStartDateTime={eventStartDateTime} // fallback
              />
            )}
          </div>
          <div className="mt-3 space-y-2">
            {placeName && <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /><span>{placeName}</span></div> }
          {size != 'lg' && (
                <div className="mt-0.5 text-xs text-muted-foreground">
                  신청 {currentParticipants} / {capacity}명
                </div>
          )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default EventCard;
