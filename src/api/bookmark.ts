import clientAPI from '@/lib/axios';

export type BookmarkedEvent = {
  id: number;
  title: string;
  thumbnailUrl?: string;
  eventStartDateTime: string;
  placeName: string;
  status: 'UPCOMING' | 'OPEN' | 'CLOSED' | 'FINISHED';
};

export async function addBookmark(eventId: number) {
  const response = await clientAPI.post(`/events/${eventId}/bookmark`);
  return response.data;
}

export async function removeBookmark(eventId: number) {
  const response = await clientAPI.delete(`/events/${eventId}/bookmark`);
  return response.data;
}

export async function getMyBookmarks() {
  const response = await clientAPI.get<BookmarkedEvent[]>('/users/me/bookmarks');
  return response.data;
}