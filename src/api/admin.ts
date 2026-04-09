import clientAPI from '@/lib/axios';

/** 백엔드 `UserResponse` */
export type AdminUserResponse = {
  id: number;
  email: string;
  nickname: string;
  phone: string | null;
  profileImageUrl: string | null;
  role: string;
};

/** 백엔드 `EventCreateRequest` */
export type AdminEventCreateBody = {
  title: string;
  thumbnailUrl?: string;
  description?: string;
  address?: string;
  placeName?: string;
  eventStartDateTime: string;
  eventEndDateTime: string;
  applyStartDateTime: string;
  applyEndDateTime: string;
  capacity: number;
  categoryId: number;
};

export async function getAdminUsers() {
  const response = await clientAPI.get<AdminUserResponse[]>('/admin/users');
  return response.data;
}

export async function deleteAdminUser(userId: number) {
  await clientAPI.delete(`/admin/users/${userId}`);
}

export async function createAdminEvent(body: AdminEventCreateBody) {
  const response = await clientAPI.post('/admin/events', body);
  return response.data;
}

export async function deleteAdminEvent(eventId: number) {
  await clientAPI.delete(`/admin/events/${eventId}`);
}
