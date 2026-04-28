import { Badge } from '@/components/ui/badge';
import type { EventStatus } from '@/types/event';

type EventStatusBadgeProps = {
    status: EventStatus;
    applyEndDateTime: string;
    applyStartDateTime?: string;
    eventStartDateTime?: string; // fallback (예전 호출부 호환)
};

function toValidDate(value?: string) {
  if (!value) return null;
  // 백엔드가 `YYYY-MM-DD HH:mm:ss`(space)로 내려주는 경우가 있어 정규화
  const normalized = value.includes(' ') && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(value)
    ? value.replace(' ', 'T')
    : value;
  const d = new Date(normalized);
  return Number.isNaN(d.getTime()) ? null : d;
}

const EventStatusBadge = ({
  status,
  applyEndDateTime,
  applyStartDateTime,
  eventStartDateTime,
}: EventStatusBadgeProps) => {
    const now = new Date();
    const applyEnd = toValidDate(applyEndDateTime);
    const applyStart = toValidDate(applyStartDateTime) ?? toValidDate(eventStartDateTime);

    // 오픈 예정: 신청 시작까지 D-n (applyStart 우선, 없으면 eventStart fallback)
    if (status === 'UPCOMING') {
      if (!applyStart) {
        return <Badge variant="default">오픈 예정</Badge>;
      }

      const diffDays = Math.ceil(
        (applyStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (diffDays > 0) {
        return <Badge variant="default">D-{diffDays}</Badge>;
      }
      // 이미 시작 시각을 지났는데 status가 아직 UPCOMING이라면 UI만이라도 오픈 표시
      return <Badge variant="success">신청 가능</Badge>;
    }

    // 마감/종료
    if (status === 'CLOSED' || status === 'FINISHED') {
      return <Badge variant="default">마감</Badge>;
    }

    // 오픈
    if (status === 'OPEN') {
      if (applyEnd) {
        const diffHours = (applyEnd.getTime() - now.getTime()) / (1000 * 60 * 60);
        if (diffHours <= 24 && diffHours > 0) {
          return <Badge variant="warning">마감 임박</Badge>;
        }
      }
      return <Badge variant="success">신청 가능</Badge>;
    }

    // 알 수 없는 상태 방어
    return <Badge variant="default">-</Badge>;
};

export default EventStatusBadge;
