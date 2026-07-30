//Kopis쪽 ts
import clientAPI from '@/lib/axios';
export type KopisEventDto = { //목록 조회용
    eventId: string;
    eventName: string;
    startDate: string;
    endDate: string;
    facilityName: string;
    posterUrl?: string;
    genre?: string;
    state?: string;
};

export type KopisEventDetailDto = {
    // 공연 정보(상세)
    eventId: string;
    eventName?: string;
    startDate?: string;
    endDate?: string;
    facilityId?: string;
    facilityName?: string;

    // 설명(백에서 XML story/schedule 파싱)
    story?: string;
    schedule?: string;

    // 시설 상세에서 붙여주는 값(주소 자동 채움 핵심)
    address?: string;
    latitude?: string;
    longitude?: string;
};

export async function getExternalEvents(params: {
    stdate: string;
    eddate: string;
    cpage?: number;
    rows?: number;
}) {
    const res = await clientAPI.get<KopisEventDto[]>('/api/external/events', { params });
    return res.data;
}

export async function getExternalEventDetail(eventId: string) {
    const res = await clientAPI.get<KopisEventDetailDto>(`/api/external/events/${eventId}`);
    return res.data;
}