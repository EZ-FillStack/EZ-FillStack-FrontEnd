import { useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail } from 'lucide-react';
import Pagination from '@/components/nav/Pagination';
import type { Inquiry } from '@/lib/adminEntityTypes';

type InquiryStatus = 'UNANSWERED' | 'ANSWERED';

// 문의 상태 뱃지 문구입니다.
const statusLabel: Record<InquiryStatus, string> = {
  UNANSWERED: '답변대기',
  ANSWERED: '답변완료',
};

const statusVariant: Record<InquiryStatus, 'warning' | 'success'> = {
  UNANSWERED: 'warning',
  ANSWERED: 'success',
};

const rows: Inquiry[] = [
  {
    id: 1,
    memberId: 201,
    title: '환불 문의 드립니다',
    content: '환불 절차 알려주세요.',
    replyEmail: 'user@example.com',
    status: 'PENDING',
    createdAt: '2026-02-20T10:00:00.000Z',
    answeredAt: null,
  },
  {
    id: 2,
    memberId: 202,
    title: '체험 일정 변경 가능한가요?',
    content: '개인 사정으로 하루만 미루고 싶습니다.',
    replyEmail: 'guest@example.com',
    status: 'ANSWERED',
    createdAt: '2026-02-18T11:00:00.000Z',
    answeredAt: '2026-02-19T09:00:00.000Z',
  },
  {
    id: 3,
    memberId: 203,
    title: '신청 취소 방법 문의',
    content: '마이페이지에서 취소가 안 보입니다.',
    replyEmail: 'member@example.com',
    status: 'PENDING',
    createdAt: '2026-02-15T14:00:00.000Z',
    answeredAt: null,
  },
  {
    id: 4,
    memberId: 204,
    title: '단체 예약 가능 여부',
    replyEmail: 'org@example.com',
    content: '10명 단체 가능한지 문의드립니다.',
    status: 'ANSWERED',
    createdAt: '2026-02-12T08:00:00.000Z',
    answeredAt: '2026-02-13T10:00:00.000Z',
  },
];

function inquiryUiStatus(status: string): InquiryStatus {
  return status === 'ANSWERED' ? 'ANSWERED' : 'PENDING';
}

// 한 페이지당 행 개수입니다.
const PAGE_SIZE = 2;
const TOTAL_PAGES = Math.ceil(rows.length / PAGE_SIZE);

function formatDate(iso: string) {
  return iso.slice(0, 10);
}

export default function AdminInquiriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page')) || 1);

  const paginatedItems = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">고객센터 문의</h1>
      <p className="mt-1 text-sm text-muted-foreground">문의 목록을 조회합니다.</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="divide-y divide-slate-200">
          {paginatedItems.map((row) => (
            <div
              key={row.id}
              className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1 space-y-2">
                <div className="font-medium text-slate-900">{row.title}</div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Mail size={15} className="text-slate-500" />
                    {row.replyEmail}
                  </span>
                  <span className="text-slate-500">접수 {formatDate(row.createdAt)}</span>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <Badge variant={statusVariant[inquiryUiStatus(row.status)]}>
                  {statusLabel[inquiryUiStatus(row.status)]}
                </Badge>
                <Button
                  type="button"
                  size="sm"
                  className="h-8 bg-gray-600 text-xs text-white hover:bg-gray-800"
                >
                  내용 보기
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
