import { useQuery } from '@tanstack/react-query';
import { Link, Outlet } from 'react-router';
import AdminSidebar from '@/components/admin/AdminSidebar';
import type { EventType } from '@/types/event';
import type { Users } from '@/types/users';
import { getEvents } from '@/api/events';
import { getAdminUsers, type AdminUserResponse } from '@/api/admin';
import { generateErrorMessage } from '@/lib/error';

export type AdminExperiencesOutletContext = {
  experiences: EventType[];
  refetchExperiences: () => Promise<unknown>;
};

export type AdminUserListRow = Users & { role: string; email: string };

export type AdminUserOutletContext = {
  users: AdminUserListRow[];
  refetchUsers: () => Promise<unknown>;
};

function mapAdminUser(u: AdminUserResponse): AdminUserListRow {
  return {
    id: u.id,
    username: u.email,
    nickname: u.nickname,
    email: u.email,
    provider: null,
    providerId: null,
    profileImageUrl: u.profileImageUrl,
    createdAt: '',
    updatedAt: '',
    deletedAt: null,
    status: 'ACTIVE',
    role: u.role,
  };
}

export default function AdminLayout() {
  const eventsQuery = useQuery({
    queryKey: ['adminEvents'],
    queryFn: () => getEvents({ page: 0, size: 500 }),
  });

  const usersQuery = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const raw = await getAdminUsers();
      return raw.map(mapAdminUser);
    },
  });

  const experiences = eventsQuery.data ?? [];
  const users = usersQuery.data ?? [];
  const refetchExperiences = eventsQuery.refetch;
  const refetchUsers = usersQuery.refetch;

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
          {(eventsQuery.isLoading || usersQuery.isLoading) && (
            <p className="mb-4 text-sm text-muted-foreground">
              데이터를 불러오는 중...
            </p>
          )}
          {eventsQuery.isError && (
            <p className="mb-3 text-sm text-destructive">
              {generateErrorMessage(eventsQuery.error, 'adminEvents')}
            </p>
          )}
          {usersQuery.isError && (
            <p className="mb-3 text-sm text-destructive">
              {generateErrorMessage(usersQuery.error, 'adminUsers')}
            </p>
          )}
          <Outlet
            context={{
              experiences,
              refetchExperiences,
              users,
              refetchUsers,
            }}
          />
        </section>
      </div>
    </main>
  );
}
