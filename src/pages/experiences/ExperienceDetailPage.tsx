import EventStatusBadge from '@/components/badge/EventStatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Users } from 'lucide-react';
import KakaoMap from '@/components/map/KakaoMap';
import { toast } from 'sonner';
import { useParams, useNavigate } from 'react-router';
import { useGetEventDetail } from '@/hooks/queries/events/useGetEventDetail';
import { useApplyToEvent } from '@/hooks/mutations/events/useApplyToEvent';
import useAppStore from '@/stores/useAppStore';

function formatDate(dateStr?: string) {
  if (!dateStr) return '-';
  return dateStr.slice(0, 10).replace(/-/g, '.');
}

function formatTime(dateStr?: string) {
  if (!dateStr) return '-';
  return dateStr.slice(11, 16);
}

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
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppStore();
  const eventId = Number(id);

  const { data, isLoading, isError } = useGetEventDetail(eventId);
  const { mutate: applyToEvent, isPending } = useApplyToEvent(eventId);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground text-sm">
        불러오는 중...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground text-sm">
        행사 정보를 불러올 수 없습니다.
      </div>
    );
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      toast.error('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    applyToEvent(undefined, {
      onSuccess: () => {
        toast.success('신청이 완료되었습니다.');
      },
      onError: (error: unknown) => {
        const message =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ?? '신청 중 오류가 발생했습니다.';
        toast.error(message);
      },
    });
  };

  const isApplyDisabled = data.status !== 'OPEN' || isPending;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      {/* 행사 이미지 */}
      <EventImageHero imageUrl={data.thumbnailUrl} />

      {/* 타이틀 + 상태 */}
      <div className="mt-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{data.title}</h1>
          <div>
            <EventStatusBadge
              status={data.status}
              applyEndDateTime={data.applyEndDateTime ?? ''}
              eventStartDateTime={data.eventStartDateTime}
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
              {data.description ? (
                <p className="whitespace-pre-line text-sm leading-6 text-foreground">
                  {data.description}
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
                <span>{data.address ?? '-'}</span>
              </div>
              {data.address && <KakaoMap address={data.address} />}
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
                <span className="font-medium">{data.capacity ?? '-'}명</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">현재 신청자:</span>
                <span className="font-medium">
                  {data.currentParticipants ?? '-'}명
                </span>
              </div>

              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div className="leading-5">
                  <span className="text-muted-foreground">신청 기간:</span>{' '}
                  <span className="font-medium">
                    {formatDate(data.applyStartDateTime)} ~
                  </span>
                  <br />
                  <span className="font-medium">
                    {formatDate(data.applyEndDateTime)}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div className="leading-5">
                  <span className="text-muted-foreground">행사 일시:</span>{' '}
                  <span className="font-medium">
                    {formatDate(data.eventStartDateTime)}{' '}
                    {formatTime(data.eventStartDateTime)} ~
                  </span>
                  <br />
                  <span className="font-medium">
                    {formatTime(data.eventEndDateTime)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            className="w-full"
            size="lg"
            disabled={isApplyDisabled}
            onClick={handleApply}
          >
            {isPending ? '신청 중...' : '신청하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}
