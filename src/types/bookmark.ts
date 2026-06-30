// GET /me/bookmarks 응답 항목 형태 (EventType과 다름에 주의)
export type BookmarkItem = {
  bookmarkId: number;
  eventId: number;
  eventTitle: string;
  createDate: string;
};
