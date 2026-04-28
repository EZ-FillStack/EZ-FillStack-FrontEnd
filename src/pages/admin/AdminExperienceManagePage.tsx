import { useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { generateErrorMessage } from '@/lib/error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Users } from 'lucide-react';
import Pagination from '@/components/nav/Pagination';
import MyStatusBadge from '@/components/badge/MyStatusBadge';
import type { AdminExperiencesOutletContext } from '@/layouts/AdminLayout';
import { deleteAdminEvent, updateAdminEvent } from '@/api/admin';
import { PAGE_SIZE } from '@/lib/pagination';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { uploadAdapterPlugin } from '@/lib/ckeditor/uploadAdapter';
import type { EventType } from '@/types/event';

export default function AdminExperienceManagePage() {
  const { experiences, refetchExperiences } =
    useOutletContext<AdminExperiencesOutletContext>();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<EventType | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [address, setAddress] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [capacity, setCapacity] = useState('');
  const [eventStartDateTime, setEventStartDateTime] = useState('');
  const [eventEndDateTime, setEventEndDateTime] = useState('');
  const [applyStartDateTime, setApplyStartDateTime] = useState('');
  const [applyEndDateTime, setApplyEndDateTime] = useState('');
  const [description, setDescription] = useState('');

  const TOTAL_PAGES = Math.max(1, Math.ceil(experiences.length / PAGE_SIZE));
  const paginatedItems = experiences.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  function isoToDatetimeLocal(value?: string): string {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function datetimeLocalToIso(value: string): string {
    if (!value.trim()) return '';
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? '' : d.toISOString();
  }

  const handleDelete = async (eventId: number) => {
    setDeletingId(eventId);
    try {
      await deleteAdminEvent(eventId);
      toast.success('삭제되었습니다.');
      await refetchExperiences();
    } catch (err) {
      toast.error(generateErrorMessage(err, 'adminEventDelete'));
    } finally {
      setDeletingId(null);
    }
  };

  const openEdit = (row: EventType) => {
    setEditing(row);
    setTitle(row.title ?? '');
    setPlaceName(row.placeName ?? '');
    setAddress(row.address ?? '');
    setThumbnailUrl(row.thumbnailUrl ?? '');
    setCapacity(String(row.capacity ?? ''));
    setEventStartDateTime(isoToDatetimeLocal(row.eventStartDateTime));
    setEventEndDateTime(isoToDatetimeLocal(row.eventEndDateTime));
    setApplyStartDateTime(isoToDatetimeLocal(row.applyStartDateTime));
    setApplyEndDateTime(isoToDatetimeLocal(row.applyEndDateTime));
    setDescription(row.description ?? '');
    setEditOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    const cap = Number(capacity);
    if (!title.trim()) {
      toast.error('제목을 입력해 주세요.');
      return;
    }
    if (!Number.isFinite(cap) || cap < 1) {
      toast.error('정원은 1명 이상이어야 합니다.');
      return;
    }

    const eventStart = datetimeLocalToIso(eventStartDateTime);
    const eventEnd = datetimeLocalToIso(eventEndDateTime);
    const applyStart = datetimeLocalToIso(applyStartDateTime);
    const applyEnd = datetimeLocalToIso(applyEndDateTime);

    if (!eventStart || !eventEnd || !applyStart || !applyEnd) {
      toast.error('일시를 모두 올바르게 입력해 주세요.');
      return;
    }

    setSubmitting(true);
    try {
      await updateAdminEvent(editing.id, {
        title: title.trim(),
        thumbnailUrl: thumbnailUrl.trim() || undefined,
        description: description.trim() || undefined,
        address: address.trim() || undefined,
        placeName: placeName.trim() || undefined,
        eventStartDateTime: eventStart,
        eventEndDateTime: eventEnd,
        applyStartDateTime: applyStart,
        applyEndDateTime: applyEnd,
        capacity: cap,
        categoryId: editing.categoryId ?? 4,
      });
      toast.success('수정되었습니다.');
      setEditOpen(false);
      await refetchExperiences();
    } catch (err) {
      toast.error(generateErrorMessage(err, 'adminEventUpdate'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">체험 관리</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        등록된 체험을 조회하고 수정·삭제할 수 있습니다.
      </p>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>체험 수정</DialogTitle>
            <DialogDescription>
              등록 폼과 동일한 양식으로 체험 정보를 수정합니다.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="edit-title" className="text-sm font-medium text-slate-800">
                  제목
                </label>
                <Input
                  id="edit-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="체험 이름"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="edit-place" className="text-sm font-medium text-slate-800">
                  장소
                </label>
                <Input
                  id="edit-place"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  placeholder="예: 서울시 강남구"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="edit-cap" className="text-sm font-medium text-slate-800">
                  정원 (명)
                </label>
                <Input
                  id="edit-cap"
                  type="number"
                  min={1}
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="30"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="edit-address" className="text-sm font-medium text-slate-800">
                  주소 (지도 표시용)
                </label>
                <Input
                  id="edit-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="예: 서울특별시 중구 세종대로 110"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="edit-thumb" className="text-sm font-medium text-slate-800">
                  썸네일 URL
                </label>
                <Input
                  id="edit-thumb"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="edit-start" className="text-sm font-medium text-slate-800">
                  체험 시작 일시
                </label>
                <Input
                  id="edit-start"
                  type="datetime-local"
                  value={eventStartDateTime}
                  onChange={(e) => setEventStartDateTime(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="edit-end" className="text-sm font-medium text-slate-800">
                  체험 종료 일시
                </label>
                <Input
                  id="edit-end"
                  type="datetime-local"
                  value={eventEndDateTime}
                  onChange={(e) => setEventEndDateTime(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="edit-apply-start" className="text-sm font-medium text-slate-800">
                  신청 시작 일시
                </label>
                <Input
                  id="edit-apply-start"
                  type="datetime-local"
                  value={applyStartDateTime}
                  onChange={(e) => setApplyStartDateTime(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="edit-apply-end" className="text-sm font-medium text-slate-800">
                  신청 마감 일시
                </label>
                <Input
                  id="edit-apply-end"
                  type="datetime-local"
                  value={applyEndDateTime}
                  onChange={(e) => setApplyEndDateTime(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="edit-desc" className="text-sm font-medium text-slate-800">
                설명
              </label>
              <CKEditor
                editor={ClassicEditor as any}
                data={description}
                config={{
                  extraPlugins: [uploadAdapterPlugin],
                }}
                onChange={(_, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => setEditOpen(false)}
              >
                취소
              </Button>
              <Button
                type="submit"
                size="sm"
                className="h-8 text-xs bg-gray-600 text-white hover:bg-gray-800"
                disabled={submitting || !editing}
              >
                {submitting ? '저장 중...' : '저장'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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
                  <MyStatusBadge status={row.status ?? 'OPEN'} />
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} className="text-slate-500" />
                    {row.placeName}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={15} className="text-slate-500" />
                    신청 {row.currentParticipants ?? 0} / {row.capacity ?? 0}명
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => openEdit(row)}
                >
                  수정
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  disabled={deletingId === row.id}
                  onClick={() => handleDelete(row.id)}
                >
                  {deletingId === row.id ? '삭제 중...' : '삭제'}
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
