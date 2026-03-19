import { HeartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// 북마크 토글 버튼 컴포넌트입니다.
type BookmarkButtonProps = {
  isBookmarked: boolean;
  // 백엔드에 북마크 추가 요청을 보내기 위한 toggle입니다
  onToggle?: () => void;
  // 접근성(스크린리더)용 라벨입니다.
  ariaLabel?: string;
  // Link/Card를 전체 클릭할 경우 사용. 링크 버블링 막기용.
  // 상위에 Link/Card 클릭 이동이 걸려있는 경우 true로 설정합니다.
  stopNavigation?: boolean;
  className?: string;
  iconClassName?: string;
};

export default function BookmarkButton({
  isBookmarked,
  onToggle,
  ariaLabel = isBookmarked ? '북마크 해제' : '북마크',
  stopNavigation = false,
  className,
  iconClassName,
}: BookmarkButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isBookmarked}
      onClick={(e) => {
        if (stopNavigation) {
          e.preventDefault();
          e.stopPropagation();
        }
        onToggle?.();
      }}
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-white/80 p-2',
        className,
      )}
    >
      <HeartIcon
        className={cn(
          'h-5 w-5 transition-colors',
          isBookmarked
            ? 'fill-red-500 text-red-500'
            : 'text-gray-400 hover:text-red-500',
          iconClassName,
        )}
      />
    </button>
  );
}

