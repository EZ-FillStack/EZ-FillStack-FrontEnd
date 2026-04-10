import clientAPI from '@/lib/axios';
import type { EventType } from '@/types/event';

export async function addBookmark(eventId: number) {
  const response = await clientAPI.post(`/events/${eventId}/bookmark`);
  return response.data;
}

export async function removeBookmark(eventId: number) {
  const response = await clientAPI.delete(`/events/${eventId}/bookmark`);
  return response.data;
}

type EventPage = { content: EventType[]; [key: string]: unknown };

export async function getMyBookmarks() {
  const response = await clientAPI.get<EventType[] | EventPage>('/users/me/bookmarks');
  const data = response.data;
  if (Array.isArray(data)) return data;
  return (data.content as EventType[]) ?? [];
}