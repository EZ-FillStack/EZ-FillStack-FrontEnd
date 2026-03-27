import EventStatusBadge from '@/components/badge/EventStatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Users } from 'lucide-react';
import KakaoMap from '@/components/map/KakaoMap';
import { toast } from 'sonner';
import type { EventStatus } from '@/types/event';
// import { useParams } from 'react-router';
// import { useGetEventDetail } from '@/hooks/queries/events/useGetEventDetail';

// API 연결 후 다시 타입 적용
// type EventDetailContentProps = {
//   title: string;
//   status: string;
//   applyEndDateTime: string;
//   eventStartDateTime?: string;
//   imageUrl?: string;
//   description?: string;
//   recruitInfo: EventRecruitInfo;
//   location: EventLocation;
//   onApply?: () => void;
//   applyDisabled?: boolean;
// };

// 임시 사용 용도
const mockEvent: {
  title: string;
  status: EventStatus;
  applyEndDateTime: string;
  eventStartDateTime?: string;
  imageUrl?: string;
  description?: string;
  recruitInfo: {
    capacity: number;
    appliedCount: number;
    applyStartDate: string;
    applyEndDate: string;
    eventDate: string;
    eventStartTime: string;
    eventEndTime: string;
  };
  location: { address: string };
} = {
  title: '체험 행사 이름',
  status: 'OPEN',
  applyEndDateTime: '2026-02-28T23:59:00',
  eventStartDateTime: '2026-03-05T14:00:00',
  imageUrl: '',
  description: '행사 설명이 들어갈 영역입니다.',
  recruitInfo: {
    capacity: 50,
    appliedCount: 32,
    applyStartDate: '2026.02.01',
    applyEndDate: '2026.02.28',
    eventDate: '2026.03.15',
    eventStartTime: '14:00',
    eventEndTime: '17:00',
  },
  location: {
    address: '서울특별시 강남구 테헤란로 123',
  },
};

const EventImageHero = ({ imageUrl }: { imageUrl?: string }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-muted">
      <div className="aspect-16/6 w-full">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="행사 이미지"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            행사 이미지
          </div>
        )}
      </div>
    </div>
  );
};

export default function ExperienceDetailPage() {
  // API 연결 시 아래 주석 해제 후 mockEvent 대신 data 사용
  // const { id } = useParams();
  // const { data } = useGetEventDetail(Number(id));

  const {
    title,
    status,
    applyEndDateTime,
    eventStartDateTime,
    imageUrl,
    description,
    recruitInfo,
    location,
  } = mockEvent;
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      {/* 행사 이미지 */}
      <EventImageHero imageUrl={imageUrl} />

      {/* 타이틀 + 상태 */}
      <div className="mt-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <div>
            <EventStatusBadge
              status={status}
              applyEndDateTime={applyEndDateTime}
              eventStartDateTime={eventStartDateTime}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">행사 설명</CardTitle>
            </CardHeader>
            <CardContent>
              {description ? (
                <p className="whitespace-pre-line text-sm leading-6 text-foreground">
                  {description}
                </p>
              ) : (
                <div className="space-y-2">
                  <div className="h-3 w-11/12 rounded bg-muted" />
                  <div className="h-3 w-10/12 rounded bg-muted" />
                  <div className="h-3 w-9/12 rounded bg-muted" />
                  <div className="h-3 w-8/12 rounded bg-muted" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* 위치 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">위치 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 text-muted-foreground">📍</span>
                <span>{location.address}</span>
              </div>
              <KakaoMap address={location.address} />
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">모집 정보</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">정원:</span>
                <span className="font-medium">{recruitInfo.capacity}명</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">현재 신청자:</span>
                <span className="font-medium">
                  {recruitInfo.appliedCount}명
                </span>
              </div>

              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div className="leading-5">
                  <span className="text-muted-foreground">신청 기간:</span>{' '}
                  <span className="font-medium">
                    {recruitInfo.applyStartDate} ~
                  </span>
                  <br />
                  <span className="font-medium">
                    {recruitInfo.applyEndDate}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div className="leading-5">
                  <span className="text-muted-foreground">행사 일시:</span>{' '}
                  <span className="font-medium">
                    {recruitInfo.eventDate} {recruitInfo.eventStartTime} ~
                  </span>
                  <br />
                  <span className="font-medium">
                    {recruitInfo.eventEndTime}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" size="lg"
                  onClick={() => {
                    toast.success('신청이 완료되었습니다.');
                  }}
          >
            신청하기
          </Button>
        </div>

        {/* (선택) 주의사항 같은 박스 추가해도 될 것 같아요 */}
      </div>
    </div>
  );
}
