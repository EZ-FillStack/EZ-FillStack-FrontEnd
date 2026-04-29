import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'sonner';
import { generateErrorMessage } from '@/lib/error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { AdminExperiencesOutletContext } from '@/layouts/AdminLayout';
import { createAdminEvent } from '@/api/admin';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { uploadAdapterPlugin } from '@/lib/ckeditor/uploadAdapter';
import {getExternalEventDetail, getExternalEvents, type KopisEventDto} from '@/api/kopis.ts';
import { fromDatetimeLocalInput } from '@/lib/datetime';

export default function AdminExperienceRegisterPage() {
  const { refetchExperiences } =
    useOutletContext<AdminExperiencesOutletContext>();

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
  const [submitting, setSubmitting] = useState(false);

  const [stdate, setStdate] = useState('20260101');
  const [eddate, setEddate] = useState('20261231');
  const [cpage, setCpage] = useState(1);
  const [apiItems, setApiItems] = useState<KopisEventDto[]>([]); //kopis 아이템
  const [loading, setLoading] = useState(false);

  const [kopisOpen, setKopisOpen] = useState(false);


  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await getExternalEvents({ stdate, eddate, cpage, rows:5 });
      setApiItems(data);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (it: KopisEventDto) => {
    setTitle(it.eventName ?? '');
    setPlaceName(it.facilityName ?? '');
    setThumbnailUrl(it.posterUrl ?? '');
    setDescription(it.posterUrl ? `<p><img src="${it.posterUrl}" alt="${it.eventName}" /></p>` : '');
    try {
      const detail = await getExternalEventDetail(it.eventId);
      setEventStartDateTime(kopisDateToDatetimeLocal(detail.startDate ?? it.startDate));
      setEventEndDateTime(kopisDateToDatetimeLocal(detail.endDate ?? it.endDate));
      setDescription((prev) => prev + textToHtml(detail.story || detail.schedule || ''));
      setAddress(detail.address ?? '');
      console.log(detail.story);
      setKopisOpen(false);
    } catch (e) {
      toast.error('상세 정보를 불러오지 못했습니다.');
    }
  };

  function kopisDateToDatetimeLocal(date: string): string { //날짜 포매팅
    const m = date.match(/^(\d{4})\.(\d{2})\.(\d{2})$/);
    if (!m) return '';
    return `${m[1]}-${m[2]}-${m[3]}T00:00`;
  }

  function textToHtml(text: string) { //에디터용 <br> 처리
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\r?\n/g, '<br/>');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cap = Number(capacity);
    const eventStart = fromDatetimeLocalInput(eventStartDateTime);
    const eventEnd = fromDatetimeLocalInput(eventEndDateTime);
    const applyStart = fromDatetimeLocalInput(applyStartDateTime);
    const applyEnd = fromDatetimeLocalInput(applyEndDateTime);

    if (!title.trim()) {
      toast.error('제목을 입력해 주세요.');
      return;
    }
    if (!Number.isFinite(cap) || cap < 1) {
      toast.error('정원은 1명 이상이어야 합니다.');
      return;
    }
    if (!eventStart || !eventEnd || !applyStart || !applyEnd) {
      toast.error('일시를 모두 올바르게 입력해 주세요.');
      return;
    }

    setSubmitting(true);
    try {
      await createAdminEvent({
        title: title.trim(),
        thumbnailUrl: thumbnailUrl.trim() || undefined,
        description: description.trim() || undefined,
        address: address.trim() || undefined,
        placeName: placeName.trim() || '-',
        eventStartDateTime: eventStart,
        eventEndDateTime: eventEnd,
        applyStartDateTime: applyStart,
        applyEndDateTime: applyEnd,
        capacity: cap,
        categoryId: 4,
      });
      toast.success('등록되었습니다.');
      await refetchExperiences();

      setTitle('');
      setPlaceName('');
      setAddress('');
      setThumbnailUrl('');
      setCapacity('');
      setEventStartDateTime('');
      setEventEndDateTime('');
      setApplyStartDateTime('');
      setApplyEndDateTime('');
      setDescription('');
    } catch (err) {
      toast.error(generateErrorMessage(err, 'adminEventCreate'));
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">체험 등록</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        새 체험을 등록합니다. 등록된 항목은 &quot;체험 관리&quot; 메뉴에서 확인할 수
        있습니다. (카테고리는 현재 기본값 1로 전송됩니다.)
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Dialog open={kopisOpen} onOpenChange={setKopisOpen}>
                <DialogTrigger asChild>
                  <Button
                      type="button"
                      size="sm"
                      className="h-8 text-xs"
                  >
                    KOPIS에서 불러오기
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>KOPIS 공연 불러오기</DialogTitle>
                    <DialogDescription>
                      검색 후 목록에서 선택하면 등록 폼에 자동 입력됩니다.
                    </DialogDescription>
                  </DialogHeader>
                  {/* 검색 폼 더미 */}
                  <div className="grid gap-3 sm:grid-cols-4">
                    <Input
                      placeholder="시작 날짜(YYYYMMDD)"
                      value={stdate}
                      onChange={(e) => setStdate(e.target.value)}
                    />
                    <Input
                      placeholder="종료 날짜(YYYYMMDD)"
                      value={eddate}
                      onChange={(e) => setEddate(e.target.value)}
                    />
                    <Input
                      placeholder="페이지"
                      type="number"
                      min={1}
                      value={cpage}
                      onChange={(e) => setCpage(Number(e.target.value || 1))}
                    />
                    <Button type="button" onClick={handleSearch} disabled={loading}>
                      {loading ? '검색 중...' : '검색'}
                    </Button>
                  </div>
                  <div className="mt-4 rounded-lg border p-3 text-sm text-muted-foreground">
                    <div className="mt-4 space-y-2">
                      {apiItems.map((it) => (
                          <button
                              key={it.eventId}
                              type="button"
                              onClick={() => handleImport(it)}
                              className="w-full rounded-lg border p-3 text-left hover:bg-slate-50"
                          >
                            <div className="font-medium">{it.eventName}</div>
                            <div className="text-sm text-muted-foreground">
                              {it.facilityName} · {it.startDate} ~ {it.endDate}
                            </div>
                          </button>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

            </div>
            <div className="space-y-1.5">
              <label htmlFor="exp-title" className="text-sm font-medium text-slate-800">
                제목
              </label>
              <Input
                id="exp-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="체험 이름"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="exp-place" className="text-sm font-medium text-slate-800">
                장소
              </label>
              <Input
                id="exp-place"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                placeholder="예: 서울시 강남구"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="exp-address" className="text-sm font-medium text-slate-800">
                주소 (지도 표시용)
              </label>
              <Input
                id="exp-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="예: 서울특별시 중구 세종대로 110"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="exp-thumb" className="text-sm font-medium text-slate-800">
                썸네일 URL
              </label>
              <Input
                id="exp-thumb"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="exp-cap" className="text-sm font-medium text-slate-800">
                정원 (명)
              </label>
              <Input
                id="exp-cap"
                type="number"
                min={1}
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="30"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="exp-start" className="text-sm font-medium text-slate-800">
                체험 시작 일시
              </label>
              <Input
                id="exp-start"
                type="datetime-local"
                value={eventStartDateTime}
                onChange={(e) => setEventStartDateTime(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="exp-end" className="text-sm font-medium text-slate-800">
                체험 종료 일시
              </label>
              <Input
                id="exp-end"
                type="datetime-local"
                value={eventEndDateTime}
                onChange={(e) => setEventEndDateTime(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="exp-apply-start" className="text-sm font-medium text-slate-800">
                신청 시작 일시
              </label>
              <Input
                id="exp-apply-start"
                type="datetime-local"
                value={applyStartDateTime}
                onChange={(e) => setApplyStartDateTime(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="exp-apply-end" className="text-sm font-medium text-slate-800">
                신청 마감 일시
              </label>
              <Input
                id="exp-apply-end"
                type="datetime-local"
                value={applyEndDateTime}
                onChange={(e) => setApplyEndDateTime(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="exp-desc" className="text-sm font-medium text-slate-800">
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
          <Button
            type="submit"
            disabled={submitting}
            className="bg-gray-600 text-white hover:bg-gray-800"
          >
            {submitting ? '등록 중...' : '등록하기'}
          </Button>
        </form>
      </div>
    </div>
  );
}
