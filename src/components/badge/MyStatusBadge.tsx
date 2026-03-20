import { Badge } from '@/components/ui/badge';

type MyStatusBadgeProps = {
  status:
    | 'PENDING'
    | 'APPROVED'
    | 'COMPLETED'
    | 'REJECTED'
    /** 관리자 신청/예약 목록 등 */
    | 'CANCELLED'
    | 'UPCOMING'
    | 'OPEN'
    | 'CLOSED'
    | 'FINISHED';
  size?: 'default' | 'sm' | 'lg';
};

const MyStatusBadge = ({ status, size = 'default' }: MyStatusBadgeProps) => {
  switch (status) {
    case 'UPCOMING':
      return (
        <Badge variant="warning" size={size}>
          대기중
        </Badge>
      );
    case 'OPEN':
      return (
        <Badge variant="info" size={size}>
          모집중
        </Badge>
      );
    case 'CLOSED':
      return (
        <Badge variant="default" size={size}>
          마감
        </Badge>
      );
    case 'FINISHED':
      return (
        <Badge variant="default" size={size}>
          체험 기간 종료
        </Badge>
      );
    case 'APPROVED':
      return (
        <Badge variant="success" size={size}>
          신청 완료
        </Badge>
      );
    case 'COMPLETED':
      return (
        <Badge variant="default" size={size}>
          체험 완료
        </Badge>
      );
    case 'REJECTED':
      return (
        <Badge variant="fail" size={size}>
          신청 실패
        </Badge>
      );
    case 'REJECTED':
      return (
        <Badge variant="fail" size={size}>
          반려
        </Badge>
      );
    case 'CANCELLED':
      return (
        <Badge variant="default" size={size}>
          취소
        </Badge>
      );
    case 'PENDING':
      return (
        <Badge variant="warning" size={size}>
          대기중
        </Badge>
      );

    default:
      return (
        <Badge variant="default" size={size}>
          {status}
        </Badge>
      );
  }
};

export default MyStatusBadge;
