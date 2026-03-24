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

export async function getMyBookmarks() {
  const response = await clientAPI.get<EventType[]>('/users/me/bookmarks');
  return response.data;
}