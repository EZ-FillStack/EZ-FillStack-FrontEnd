import EventStatusBadge from '@/components/badge/EventStatusBadge.tsx';
import { Link } from 'react-router';
import { cn } from '@/lib/utils.ts';
import BookmarkButton from '@/components/actions/BookmarkButton';
import type { EventType } from '@/types/event';

type EventCardProps = Pick<
    EventType,
    'id' | 'title' | 'thumbnailUrl' | 'placeName' | 'eventStartDateTime' | 'applyEndDateTime' | 'capacity' | 'currentParticipants' | 'status'
> & {
  thumbnailUrl: string;
  applyEndDateTime: string;
  isBookmarked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  badgeType?: 'default' | 'upcoming';
  linkTo?: 'experiences';
};

const EventCard = ({
  id,
  title,
  thumbnailUrl,
  placeName,
  eventStartDateTime,
  applyEndDateTime,
  status,
  capacity,
  currentParticipants,
  isBookmarked,
  size,
  badgeType,
  linkTo = 'experiences',
}: EventCardProps) => {
  return (
    <Link to={`/${linkTo}/${id}`} className="block">
      <article
        className={cn(
          'flex flex-col overflow-hidden rounded-lg border bg-background',
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
              isBookmarked={!!isBookmarked}
              stopNavigation
              // API 연결 전: 토글 로직은 추후 연결
            />
          </div>
        </div>
        <div className={cn(size === 'sm' && 'p-4', (size === 'md' || size === 'lg' || !size) && 'p-3')}>
          <div className="flex justify-between">
            <h3 className="text-foreground font-medium">{title}</h3>
            {badgeType === 'default' && (
              <EventStatusBadge
                status={status}
                applyEndDateTime={applyEndDateTime}
              />
            )}
            {badgeType === 'upcoming' && (
              <EventStatusBadge
                status={status}
                applyEndDateTime={applyEndDateTime}
                eventStartDateTime={eventStartDateTime}
              />
            )}
          </div>
          {size === 'md' && (
              <div className="mt-3 space-y-2">
                <div className="mt-2 text-xs text-muted-foreground">{placeName}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  신청 {currentParticipants} / {capacity}명
                </div>
              </div>
          )}
          {size === 'sm' && (
              <div className="mt-3 space-y-2">
                <div className="h-2 w-24 bg-gray-200 rounded" />
                <div className="h-2 w-32 bg-gray-200 rounded" />
              </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default EventCard;
