import clientAPI from '@/lib/axios';
import type { BookmarkItem } from '@/types/bookmark';

export async function addBookmark(eventId: number) {
  const response = await clientAPI.post(`/events/${eventId}/bookmark`);
  return response.data;
}

export async function removeBookmark(eventId: number) {
  const response = await clientAPI.delete(`/events/${eventId}/bookmark`);
  return response.data;
}

type BookmarkPage = { content: BookmarkItem[]; [key: string]: unknown };

export async function getMyBookmarks(): Promise<BookmarkItem[]> {
  const response = await clientAPI.get<BookmarkItem[] | BookmarkPage>('/me/bookmarks');
  const data = response.data;
  if (Array.isArray(data)) return data;
  return (data.content as BookmarkItem[]) ?? [];
}