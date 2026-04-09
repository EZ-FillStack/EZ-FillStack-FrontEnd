import { useOutletContext, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { generateErrorMessage } from '@/lib/error';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/nav/Pagination';
import UserStatusBadge from '@/components/badge/UserStatusBadge';
import type { AdminUserOutletContext } from '@/layouts/AdminLayout';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { deleteAdminUser } from '@/api/admin';
import { Badge } from '@/components/ui/badge';
import { PAGE_SIZE } from '@/lib/pagination';

function formatDate(iso: string) {
  return iso?.slice(0, 10) ?? '-';
}

function normalizeKeyword(value: string) {
  return value.trim().toLowerCase();
}

export default function AdminUserManagePage() {
  const { users, refetchUsers } = useOutletContext<AdminUserOutletContext>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const keyword = searchParams.get('keyword') ?? '';
  const [draftKeyword, setDraftKeyword] = useState(keyword);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    setDraftKeyword(keyword);
  }, [keyword]);

  const filtered = users.filter((u) => {
    const kw = normalizeKeyword(keyword);
    if (!kw) return true;
    const hay =
      `${u.nickname ?? ''} ${u.username ?? ''} ${u.email ?? ''}`.toLowerCase();
    return hay.includes(kw);
  });

  const TOTAL_PAGES = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, TOTAL_PAGES);
  const paginatedItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const handleDeleteUser = async (userId: number) => {
    setDeletingId(userId);
    try {
      await deleteAdminUser(userId);
      toast.success('처리되었습니다.');
      await refetchUsers();
    } catch (err) {
      toast.error(generateErrorMessage(err, 'adminUserDelete'));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">회원 관리</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        회원을 조회하고 수정·삭제할 수 있습니다.
      </p>

      <div className="mt-6 flex justify-end">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchParams({ keyword: draftKeyword, page: '1' });
            }}
          >
            <Input
              placeholder="닉네임/이메일 검색"
              className="pl-9 rounded-2xl"
              value={draftKeyword}
              onChange={(e) => setDraftKeyword(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="divide-y divide-slate-200">
          {paginatedItems.map((row) => (
            <div key={row.id} className="flex flex-col gap-4 px-4 py-4">
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-end gap-1.5 flex-wrap">
                  <div>
                    {row.profileImageUrl && (
                      <img
                        src={row.profileImageUrl}
                        alt="프로필 이미지"
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                  </div>
                  <div className="font-bold text-slate-900 flex gap-1 flex-wrap items-center">
                    {row.nickname}
                    <span className="text-gray-400 font-light">@{row.username}</span>
                    <UserStatusBadge status={row.status} />
                    {row.role === 'ROLE_ADMIN' && (
                      <Badge variant="default" className="text-xs">
                        관리자
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-700">
                  <span>{row.email}</span>
                  {row.role && (
                    <span className="text-muted-foreground">권한: {row.role}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex shrink-0 flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold">가입 일자</span>{' '}
                  {formatDate(row.createdAt)}
                  {row.status === 'DELETED' && (
                    <div>
                      <span className="font-bold"> · 탈퇴 일자</span>{' '}
                      {row.deletedAt && formatDate(row.deletedAt)}
                    </div>
                  )}
                </div>
                <div className="flex gap-1.5 shrink-0 items-center">
                  <Button type="button" variant="outline" size="sm" className="h-8 text-xs">
                    상세
                  </Button>
                  <Button
                    type="button"
                    variant="admin"
                    size="sm"
                    className="h-8 text-xs"
                    disabled={deletingId === row.id}
                    onClick={() => handleDeleteUser(row.id)}
                  >
                    {deletingId === row.id ? '처리 중...' : '정지'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        page={safePage}
        totalPages={TOTAL_PAGES}
        onPageChange={(p) => setSearchParams({ keyword, page: String(p) })}
      />
    </div>
  );
}
