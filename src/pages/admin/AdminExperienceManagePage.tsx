import { useOutletContext, useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { MapPin, Users } from 'lucide-react';
import Pagination from '@/components/nav/Pagination';
import MyStatusBadge from '@/components/badge/MyStatusBadge';
import type { AdminExperiencesOutletContext } from '@/layouts/AdminLayout';

// 한 페이지당 행 개수입니다.
const PAGE_SIZE = 2;

export default function AdminExperienceManagePage() {
  const { experiences, setExperiences } =
    useOutletContext<AdminExperiencesOutletContext>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page')) || 1);

  const TOTAL_PAGES = Math.max(1, Math.ceil(experiences.length / PAGE_SIZE));
  const paginatedItems = experiences.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">체험 관리</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        등록된 체험을 조회하고 수정·삭제할 수 있습니다.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="divide-y divide-slate-200">
          {paginatedItems.map((row) => (
            <div
              key={row.id}
              className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1 space-y-2">
                <div className="font-medium text-slate-900 flex gap-1">
                    {row.title}
                    <MyStatusBadge status={row.status} />
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} className="text-slate-500" />
                    {row.placeName}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={15} className="text-slate-500" />
                    신청 {row.currentParticipants} / {row.capacity}명
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <Button type="button" variant="outline" size="sm" className="h-8 text-xs">
                  수정
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() =>
                    setExperiences((prev) => prev.filter((x) => x.id !== row.id))
                  }
                >
                  삭제
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Pagination
        page={page}
        totalPages={TOTAL_PAGES}
        onPageChange={(p) => setSearchParams({ page: String(p) })}
      />
    </div>
  );
}
