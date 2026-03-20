import { useState } from 'react';
import { Link, Outlet } from 'react-router';
import AdminSidebar from '@/components/admin/AdminSidebar';
import type { Event } from '@/lib/adminEntityTypes';

export type AdminExperiencesOutletContext = {
  experiences: Event[];
  setExperiences: React.Dispatch<React.SetStateAction<Event[]>>;
};

// 개발용 더미 — API 연동 시 제거
const ADMIN_EXPERIENCES_SEED: Event[] = [
  {
    id: 1,
    version: 0,
    title: '도자기 만들기 체험',
    thumbnailUrl: '',
    description: '',
    address: '',
    placeName: '서울 강남구',
    eventStartDateTime: '2026-03-15T14:00:00.000Z',
    eventEndDateTime: '2026-03-15T17:00:00.000Z',
    applyStartDateTime: '2026-02-01T00:00:00.000Z',
    applyEndDateTime: '2026-03-10T23:59:59.000Z',
    capacity: 30,
    currentParticipants: 10,
    viewCount: 0,
    status: 'OPEN',
    categoryId: 4,
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-10T10:00:00.000Z',
    deletedAt: null,
  },
  {
    id: 2,
    version: 0,
    title: '전통 한지 공예 체험',
    thumbnailUrl: '',
    description: '',
    address: '',
    placeName: '서울 종로구',
    eventStartDateTime: '2026-03-20T10:00:00.000Z',
    eventEndDateTime: '2026-03-20T13:00:00.000Z',
    applyStartDateTime: '2026-02-05T00:00:00.000Z',
    applyEndDateTime: '2026-03-15T23:59:59.000Z',
    capacity: 20,
    currentParticipants: 5,
    viewCount: 0,
    status: 'UPCOMING',
    categoryId: 4,
    createdAt: '2026-01-11T10:00:00.000Z',
    updatedAt: '2026-01-11T10:00:00.000Z',
    deletedAt: null,
  },
  {
    id: 3,
    version: 0,
    title: '가죽 공예 원데이',
    thumbnailUrl: '',
    description: '',
    address: '',
    placeName: '서울 마포구',
    eventStartDateTime: '2026-02-01T10:00:00.000Z',
    eventEndDateTime: '2026-02-01T18:00:00.000Z',
    applyStartDateTime: '2026-01-01T00:00:00.000Z',
    applyEndDateTime: '2026-01-25T23:59:59.000Z',
    capacity: 15,
    currentParticipants: 15,
    viewCount: 0,
    status: 'CLOSED',
    categoryId: 4,
    createdAt: '2026-01-12T10:00:00.000Z',
    updatedAt: '2026-01-12T10:00:00.000Z',
    deletedAt: null,
  },
  {
    id: 4,
    version: 0,
    title: '천연 염색 체험',
    thumbnailUrl: '',
    description: '',
    address: '',
    placeName: '서울 성동구',
    eventStartDateTime: '2026-04-05T11:00:00.000Z',
    eventEndDateTime: '2026-04-05T15:00:00.000Z',
    applyStartDateTime: '2026-02-10T00:00:00.000Z',
    applyEndDateTime: '2026-03-28T23:59:59.000Z',
    capacity: 25,
    currentParticipants: 8,
    viewCount: 0,
    status: 'OPEN',
    categoryId: 4,
    createdAt: '2026-01-13T10:00:00.000Z',
    updatedAt: '2026-01-13T10:00:00.000Z',
    deletedAt: null,
  },
  {
    id: 5,
    version: 0,
    title: '목공예 원데이 클래스',
    thumbnailUrl: '',
    description: '',
    address: '',
    placeName: '서울 용산구',
    eventStartDateTime: '2026-04-12T13:00:00.000Z',
    eventEndDateTime: '2026-04-12T17:00:00.000Z',
    applyStartDateTime: '2026-02-12T00:00:00.000Z',
    applyEndDateTime: '2026-04-01T23:59:59.000Z',
    capacity: 12,
    currentParticipants: 3,
    viewCount: 0,
    status: 'UPCOMING',
    categoryId: 4,
    createdAt: '2026-01-14T10:00:00.000Z',
    updatedAt: '2026-01-14T10:00:00.000Z',
    deletedAt: null,
  },
  {
    id: 6,
    version: 0,
    title: '캔들 만들기 체험',
    thumbnailUrl: '',
    description: '',
    address: '',
    placeName: '서울 서대문구',
    eventStartDateTime: '2026-03-08T15:00:00.000Z',
    eventEndDateTime: '2026-03-08T18:00:00.000Z',
    applyStartDateTime: '2026-02-01T00:00:00.000Z',
    applyEndDateTime: '2026-03-05T23:59:59.000Z',
    capacity: 18,
    currentParticipants: 12,
    viewCount: 0,
    status: 'OPEN',
    categoryId: 4,
    createdAt: '2026-01-15T10:00:00.000Z',
    updatedAt: '2026-01-15T10:00:00.000Z',
    deletedAt: null,
  },
  {
    id: 7,
    version: 0,
    title: '금속 공예 소품 만들기',
    thumbnailUrl: '',
    description: '',
    address: '',
    placeName: '서울 송파구',
    eventStartDateTime: '2026-01-20T10:00:00.000Z',
    eventEndDateTime: '2026-01-20T16:00:00.000Z',
    applyStartDateTime: '2026-01-01T00:00:00.000Z',
    applyEndDateTime: '2026-01-15T23:59:59.000Z',
    capacity: 10,
    currentParticipants: 10,
    viewCount: 0,
    status: 'CLOSED',
    categoryId: 4,
    createdAt: '2026-01-16T10:00:00.000Z',
    updatedAt: '2026-01-16T10:00:00.000Z',
    deletedAt: null,
  },
  {
    id: 8,
    version: 0,
    title: '요리 원데이 (한식)',
    thumbnailUrl: '',
    description: '',
    address: '',
    placeName: '서울 영등포구',
    eventStartDateTime: '2026-04-20T11:00:00.000Z',
    eventEndDateTime: '2026-04-20T14:00:00.000Z',
    applyStartDateTime: '2026-02-20T00:00:00.000Z',
    applyEndDateTime: '2026-04-10T23:59:59.000Z',
    capacity: 16,
    currentParticipants: 4,
    viewCount: 0,
    status: 'OPEN',
    categoryId: 1,
    createdAt: '2026-01-17T10:00:00.000Z',
    updatedAt: '2026-01-17T10:00:00.000Z',
    deletedAt: null,
  },
];

export default function AdminLayout() {
  const [experiences, setExperiences] = useState<Event[]>(ADMIN_EXPERIENCES_SEED);

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 text-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">관리자</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            운영 메뉴에서 각 항목을 관리할 수 있습니다.
          </p>
        </div>
        <Link
          to="/"
          className="text-sm font-medium text-slate-700 underline-offset-4 hover:text-primary hover:underline"
        >
          메인으로
        </Link>
      </div>

      <div className="flex gap-6 items-stretch">
        <aside className="w-56 shrink-0">
          <AdminSidebar />
        </aside>
        <section className="min-h-[60vh] flex-1 rounded-2xl border border-slate-200 bg-white p-5">
          <Outlet context={{ experiences, setExperiences }} />
        </section>
      </div>
    </main>
  );
}
