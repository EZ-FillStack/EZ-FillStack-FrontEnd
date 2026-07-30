export type EventType = {
    id: number;
    title: string;
    status: 'UPCOMING' | 'OPEN' | 'CLOSED' | 'FINISHED';

    //아래부터는 필수 아닌 타입
    version?: number;
    thumbnailUrl?: string;
    description?: string;
    address?: string;
    placeName?: string;
    eventStartDateTime?: string;
    eventEndDateTime?: string;
    applyStartDateTime?: string;
    applyEndDateTime?: string;
    capacity?: number;
    currentParticipants?: number;
    viewCount?: number;
    categoryId?: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
};

//EventStatus만 export합니다.
export type EventStatus = EventType['status'];