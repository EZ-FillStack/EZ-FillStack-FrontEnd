import { useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { CalendarDays, User } from 'lucide-react';
import Pagination from '@/components/nav/Pagination';
import MyStatusBadge from '@/components/badge/MyStatusBadge';
import { PAGE_SIZE } from '@/lib/pagination';
import { getAdminApplications, type AdminApplicationResponse } from '@/api/admin';
import { useQuery } from '@tanstack/react-query';


export default function AdminApplicationsPage() {
    const { data: items = [] } = useQuery<AdminApplicationResponse[]>({
        queryKey: ['adminApplications'],
        queryFn: getAdminApplications,
    });

  const TOTAL_PAGES = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page')) || 1);

  const paginatedItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">신청 관리</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        체험 신청 목록을 조회합니다.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="divide-y divide-slate-200">
          {paginatedItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1 space-y-2">
                <div className="font-medium text-slate-900 flex gap-1">
                  {item.eventTitle}
                  <MyStatusBadge status={item.status} />
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <User size={15} className="text-slate-500" />
                    {item.userNickname}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={15} className="text-slate-500" />
                    {item.appliedAt}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <Button type="button" variant="outline" size="sm" className="h-8 text-xs">
                  상세
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="h-8 bg-gray-600 text-xs text-white hover:bg-gray-800"
                >
                  상태 변경
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
