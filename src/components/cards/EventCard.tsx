import EventStatusBadge from "@/components/events/EventStatusBadge.tsx";
import { Link } from 'react-router';
import { cn } from "@/lib/utils.ts";

type EventCardProps = { //props 타입 설정, ERD와 맞춤
    id: number;
    title: string;
    thumbnailUrl: string;
    placeName: string;
    eventStartDateTime: string,
    applyEndDateTime: string,
    status: string;
    capacity: number;
    currentParticipants: number;
    isBookmarked?: boolean;
    size?: 'sm' | 'md' | 'lg';
    badgeType?: 'default' | 'upcoming';
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

}: EventCardProps) => {
    return(
        <Link to ={`/events/${id}`} className="block">
            <article className={cn("flex flex-col overflow-hidden rounded-lg border bg-background", size === "sm" && "p-3",
            size === "md" && "p-4",
            size === "lg" && "p-5")}>
                {/* 북마크 버튼을 넣을까 하는데.. */}
                <img src={thumbnailUrl} alt={title} className="object-cover w-full h-40"/>
                <div className="flex justify-between">
                    <h3 className="text-foreground font-medium">{title}</h3>
                    {badgeType === 'default' && (
                      <EventStatusBadge status={status} applyEndDateTime={applyEndDateTime} />
                    )}
                    {badgeType === 'upcoming' && (
                      <EventStatusBadge status={status} applyEndDateTime={applyEndDateTime} eventStartDateTime={eventStartDateTime} />
                    )}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{placeName}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">신청 {currentParticipants} / {capacity}명</p>
            </article>
        </Link>
    )
};

export default EventCard;