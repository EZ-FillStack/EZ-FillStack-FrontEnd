// 관리자 화면에서 쓰는 type들입니다.
// 한꺼번에 처리해둡니다.

export type Event = {
  id: number;
  version: number;
  title: string;
  thumbnailUrl: string;
  description: string;
  address: string;
  placeName: string;
  eventStartDateTime: string;
  eventEndDateTime: string;
  applyStartDateTime: string;
  applyEndDateTime: string;
  capacity: number;
  currentParticipants: number;
  viewCount: number;
  status: 'UPCOMING' | 'OPEN' | 'CLOSED' | 'FINISHED';
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type Review = {
  id: number;
  memberId: number;
  eventId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type ReviewWithRelations = Review & {
  memberNickname: string;
  eventTitle: string;
};

//고객 센터
export type Inquiry = {
  id: number;
  memberId: number;
  title: string;
  content: string;
  replyEmail: string;
  status: string;
  createdAt: string;
  answeredAt: string | null;
};

