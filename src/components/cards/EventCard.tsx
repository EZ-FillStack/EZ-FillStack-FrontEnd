import EventStatusBadge from '@/components/events/EventStatusBadge.tsx';
import { Link } from 'react-router';
import { cn } from '@/lib/utils.ts';
import { HeartIcon } from 'lucide-react';

type EventCardProps = {
  //props 타입 설정, ERD와 맞춤
  id: number;
  title: string;
  thumbnailUrl: string;
  placeName: string;
  eventStartDateTime: string;
  applyEndDateTime: string;
  status: string;
  capacity: number;
  currentParticipants: number;
  isBookmarked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  badgeType?: 'default' | 'upcoming';
  // 카드 클릭 시 이동 경로 (events: 이벤트 상세, experiences: 체험 상세)
  linkTo?: 'events' | 'experiences';
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
  linkTo = 'events',
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
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-2 right-2 bg-white/80 rounded-full p-2"
          >
            <HeartIcon
              className={cn(
                'h-5 w-5 transition-colors',
                isBookmarked
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-400 hover:text-red-500',
              )}
            />
          </button>
        </div>
        <div className="p-3">
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
          <p className="mt-2 text-xs text-muted-foreground">{placeName}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            신청 {currentParticipants} / {capacity}명
          </p>
        </div>
      </article>
    </Link>
  );
};

export default EventCard;
