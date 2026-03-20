import { useState } from 'react';
import { Link, Outlet } from 'react-router';
import AdminSidebar from '@/components/admin/AdminSidebar';
import {
  ADMIN_EXPERIENCES_SEED,
  type AdminExperienceListItem,
} from '@/lib/adminExperiences';

export type AdminExperiencesOutletContext = {
  experiences: AdminExperienceListItem[];
  setExperiences: React.Dispatch<
    React.SetStateAction<AdminExperienceListItem[]>
  >;
};

export default function AdminLayout() {
  const [experiences, setExperiences] =
    useState<AdminExperienceListItem[]>(ADMIN_EXPERIENCES_SEED);

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
