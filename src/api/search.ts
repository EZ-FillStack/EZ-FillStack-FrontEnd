import clientAPI from '@/lib/axios';
import type { EventType } from '@/types/event';

/** Spring `Page<Event>` JSON */
export type EventSearchPage = {
  content: EventType[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
};

export async function searchEvents(params: {
  keyword?: string;
  page?: number;
  size?: number;
}) {
  const response = await clientAPI.get<EventSearchPage>('/api/search', {
    params,
  });
  return response.data;
}
