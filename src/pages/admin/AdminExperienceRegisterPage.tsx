import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { EventType } from '@/types/event';
import type { AdminExperiencesOutletContext } from '@/layouts/AdminLayout';

function localDateTimeToIso(value: string): string {
  if (!value.trim()) return '';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '' : d.toISOString();
}

export default function AdminExperienceRegisterPage() {
  const { experiences, setExperiences } =
    useOutletContext<AdminExperiencesOutletContext>();

  const [title, setTitle] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [capacity, setCapacity] = useState('');
  const [eventStartDateTime, setEventStartDateTime] = useState('');
  const [eventEndDateTime, setEventEndDateTime] = useState('');
  const [applyStartDateTime, setApplyStartDateTime] = useState('');
  const [applyEndDateTime, setApplyEndDateTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cap = Number(capacity) || 0;
    const nextId =
      experiences.length > 0 ? Math.max(...experiences.map((i) => i.id)) + 1 : 1;
    const now = new Date().toISOString();
    const newItem: EventType = {
      id: nextId,
      version: 0,
      title: title.trim() || '(제목 없음)',
      thumbnailUrl: thumbnailUrl.trim(),
      description: description.trim(),
      address: '',
      placeName: placeName.trim() || '-',
      eventStartDateTime: localDateTimeToIso(eventStartDateTime),
      eventEndDateTime: localDateTimeToIso(eventEndDateTime),
      applyStartDateTime: localDateTimeToIso(applyStartDateTime),
      applyEndDateTime: localDateTimeToIso(applyEndDateTime),
      capacity: cap,
      currentParticipants: 0,
      viewCount: 0,
      status: 'OPEN',
      categoryId: 1,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };
    setExperiences((prev) => [...prev, newItem]);

    setTitle('');
    setPlaceName('');
    setThumbnailUrl('');
    setCapacity('');
    setEventStartDateTime('');
    setEventEndDateTime('');
    setApplyStartDateTime('');
    setApplyEndDateTime('');
    setDescription('');
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">체험 등록</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        새 체험을 등록합니다. 등록된 항목은 &quot;체험 관리&quot; 메뉴에서 확인할 수
        있습니다.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
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
            <Textarea
              id="exp-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="체험 소개를 입력하세요"
              rows={4}
              className="resize-y"
            />
          </div>
          <Button type="submit" className="bg-gray-600 text-white hover:bg-gray-800">
            등록하기
          </Button>
        </form>
      </div>
    </div>
  );
}
