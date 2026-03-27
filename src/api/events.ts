import clientAPI from '@/lib/axios';
import type { EventType } from '@/types/event';

export async function getPopularEvents() {
  const response = await clientAPI.get<EventType[]>('/events', {
    params: { sort: 'popular' },
  });
  return response.data;
}

export async function getUpcomingEvents() {
  const response = await clientAPI.get<EventType[]>('/events', {
    params: { status: 'upcoming' },
  });
  return response.data;
}

export async function getMyApplications() {
  const response = await clientAPI.get<EventType[]>('/me/applications');
  return response.data;
}

export async function getEvents(params?: {
  categoryId?: number;
  sort?: string;
  status?: string;
  page?: number;
  size?: number;
}) {
  const response = await clientAPI.get<EventType[]>('/events', { params });
  return response.data;
}

export async function getEventDetail(eventId: number) {
  const response = await clientAPI.get<EventType>(`/events/${eventId}`);
  return response.data;
}

export async function cancelApplication(eventId: number) {
  const response = await clientAPI.delete(`/events/applications/${eventId}`);
  return response.data;
}
