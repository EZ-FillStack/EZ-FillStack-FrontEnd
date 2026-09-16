import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { generateErrorMessage } from '@/lib/error';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';
import Pagination from '@/components/nav/Pagination';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  answerAdminInquiry,
  getAdminInquiries,
  type InquiryResponseDto,
} from '@/api/inquiry';
import { PAGE_SIZE } from '@/lib/pagination';

const statusLabel: Record<InquiryResponseDto['status'], string> = {
  UNANSWERED: '답변대기',
  ANSWERED: '답변완료',
};

const statusVariant: Record<InquiryResponseDto['status'], 'warning' | 'success'> =
  {
    UNANSWERED: 'warning',
    ANSWERED: 'success',
  };

function formatDate(iso: string) {
  return iso.slice(0, 10);
}

export default function AdminInquiriesPage() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const [detail, setDetail] = useState<InquiryResponseDto | null>(null);
  const [replyDraft, setReplyDraft] = useState('');

  const {
    data: rows = [],
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['adminInquiries'],
    queryFn: getAdminInquiries,
  });

  const answerMutation = useMutation({
    mutationFn: async ({
      id,
      replyContent,
    }: {
      id: number;
      replyContent: string;
    }) => {
      await answerAdminInquiry(id, { replyContent });
    },
    onSuccess: async () => {
      toast.success('답변이 등록되었습니다.');
      await queryClient.invalidateQueries({ queryKey: ['adminInquiries'] });
      setDetail(null);
      setReplyDraft('');
    },
    onError: (err: unknown) => {
      toast.error(generateErrorMessage(err, 'inquiryAnswer'));
    },
  });

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedItems = rows.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const openDetail = (row: InquiryResponseDto) => {
    setDetail(row);
    setReplyDraft('');
  };

  const handleSendAnswer = () => {
    if (!detail) return;
    const text = replyDraft.trim();
    if (!text) {
      toast.error('답변 내용을 입력해 주세요.');
      return;
    }
    answerMutation.mutate({ id: detail.id, replyContent: text });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">고객센터 문의</h1>
      <p className="mt-1 text-sm text-muted-foreground">문의 목록을 조회합니다.</p>

      {isLoading && (
        <p className="mt-4 text-sm text-muted-foreground">불러오는 중...</p>
      )}
      {isError && (
        <p className="mt-4 text-sm text-destructive">
          {generateErrorMessage(error, 'adminInquiries')}
        </p>
      )}
      {isSuccess && rows.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          등록된 문의가 없습니다.
        </p>
      )}

      {!isLoading && !isError && rows.length > 0 && (
        <>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="divide-y divide-slate-200">
          {paginatedItems.map((row) => (
            <div
              key={row.id}
              className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1 space-y-2">
                <div className="font-medium text-slate-900 flex flex-wrap gap-1 items-center">
                  {row.title}
                  <Badge variant={statusVariant[row.status]}>
                    {statusLabel[row.status]}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={15} className="text-slate-500" />
                    접수 {formatDate(row.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  className="h-8 bg-gray-600 text-xs text-white hover:bg-gray-800"
                  onClick={() => openDetail(row)}
                >
                  내용 보기
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

        <Pagination
          page={safePage}
          totalPages={totalPages}
          onPageChange={(p) => setSearchParams({ page: String(p) })}
        />
        </>
      )}

      <Dialog
        open={detail !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDetail(null);
            setReplyDraft('');
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{detail?.title}</DialogTitle>
          </DialogHeader>
          {detail && (
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-slate-800">문의 내용</p>
                <p className="mt-1 whitespace-pre-wrap text-slate-700">
                  {detail.content}
                </p>
              </div>
              {detail.status === 'ANSWERED' && detail.replyEmail && (
                <div>
                  <p className="font-medium text-slate-800">답변</p>
                  <p className="mt-1 whitespace-pre-wrap text-slate-700">
                    {detail.replyEmail}
                  </p>
                </div>
              )}
              {detail.status === 'UNANSWERED' && (
                <div className="space-y-2">
                  <label className="font-medium text-slate-800" htmlFor="admin-reply">
                    답변 작성
                  </label>
                  <Textarea
                    id="admin-reply"
                    value={replyDraft}
                    onChange={(e) => setReplyDraft(e.target.value)}
                    rows={4}
                    placeholder="회원에게 전달할 답변을 입력하세요."
                    className="resize-y"
                  />
                </div>
              )}
            </div>
          )}
          {detail?.status === 'UNANSWERED' && (
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDetail(null);
                  setReplyDraft('');
                }}
              >
                닫기
              </Button>
              <Button
                type="button"
                disabled={answerMutation.isPending}
                onClick={handleSendAnswer}
                className="bg-gray-600 text-white hover:bg-gray-800"
              >
                {answerMutation.isPending ? '전송 중...' : '답변 등록'}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
