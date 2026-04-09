import { useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { CalendarDays, User } from 'lucide-react';
import Pagination from '@/components/nav/Pagination';
import MyStatusBadge from '@/components/badge/MyStatusBadge';
import { PAGE_SIZE } from '@/lib/pagination';

type ApplicationStatus = 'PENDING' | 'APPROVED' | 'FAILED' | 'CANCELLED';

type ApplicationRow = {
  id: number;
  experienceTitle: string;
  applicantNickname: string;
  eventStartDateTime: string;
  status: ApplicationStatus;
};

const rows: ApplicationRow[] = [
  {
    id: 1,
    experienceTitle: '도자기 만들기 체험',
    applicantNickname: 'user01',
    eventStartDateTime: '2026.03.15 14:00',
    status: 'PENDING',
  },
  {
    id: 2,
    experienceTitle: '전통 한지 공예 체험',
    applicantNickname: 'user02',
    eventStartDateTime: '2026.03.20 10:00',
    status: 'APPROVED',
  },
  {
    id: 3,
    experienceTitle: '가죽 공예 원데이',
    applicantNickname: 'user03',
    eventStartDateTime: '2026.03.25 15:00',
    status: 'FAILED',
  },
  {
    id: 4,
    experienceTitle: '천연 염색 체험',
    applicantNickname: 'user04',
    eventStartDateTime: '2026.04.01 13:00',
    status: 'CANCELLED',
  },
];

const TOTAL_PAGES = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));

export default function AdminApplicationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page')) || 1);

  const paginatedItems = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">신청 관리</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        체험 신청 목록을 조회합니다.
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
                  {row.experienceTitle}
                  <MyStatusBadge status={row.status} />
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <User size={15} className="text-slate-500" />
                    {row.applicantNickname}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={15} className="text-slate-500" />
                    {row.eventStartDateTime}
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
