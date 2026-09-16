import clientAPI from '@/lib/axios';
import type { EventType } from '@/types/event';

type EventPage = {
  content: EventType[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
};

function extractList(data: EventType[] | EventPage): EventType[] {
  if (Array.isArray(data)) return data;
  return data.content ?? [];
}

export async function getPopularEvents() {
  const response = await clientAPI.get<EventType[] | EventPage>('/events', {
    params: { sort: 'popular' },
  });
  return extractList(response.data);
}

export async function getUpcomingEvents() {
  const response = await clientAPI.get<EventType[] | EventPage>('/events', {
    params: { status: 'upcoming' },
  });
  return extractList(response.data);
}

export type ApplicationType = {
  applicationId: number;
  eventId: number;
  eventTitle: string;
  status: 'PENDING' | 'APPROVED' | 'CANCELED' | 'REJECTED';
  appliedAt: string;
  placeName: string;
  hasReview: boolean;
  thumbnailUrl?: string;
  eventStartDateTime?: string;
};

export async function getMyApplications() {
  const response = await clientAPI.get<ApplicationType[]>('/me/applications');
  return response.data;
}

export async function getEvents(params?: {
  categoryId?: number;
  sort?: string;
  status?: string;
  page?: number;
  size?: number;
}) {
  const response = await clientAPI.get<EventType[] | EventPage>('/events', { params });
  return extractList(response.data);
}

export async function getEventDetail(eventId: number) {
  const response = await clientAPI.get<EventType>(`/events/${eventId}`);
  return response.data;
}

export async function cancelApplication(eventId: number) {
  const response = await clientAPI.delete(`/events/applications/${eventId}`);
  return response.data;
}

export async function applyToEvent(eventId: number) {
  const response = await clientAPI.post(`/events/${eventId}/applications`);
  return response.data;
}
