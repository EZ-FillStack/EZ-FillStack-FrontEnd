import { Star } from 'lucide-react';
import type { Review } from '@/types/review';

type ReviewCardProps = Review & {
  onClick?: () => void;
};

export default function ReviewCard({
  title,
  nickname,
  rating,
  content,
  onClick,
}: ReviewCardProps) {
  return (
    <button type="button" onClick={onClick} className="block w-full text-left">
      <div className="flex h-36 flex-col rounded-xl border p-4 transition hover:brightness-95 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* 상단: 제목/닉네임 + 별점 (별점은 우상단 고정) */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="line-clamp-1 text-sm font-semibold text-slate-900">
              {title}
            </div>
            <div className="mt-0.5 line-clamp-1 text-xs text-slate-500">
              {nickname}
            </div>
          </div>

          <div className="flex shrink-0 gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <p className="mt-7 line-clamp-2 text-sm leading-5 text-slate-600">
          {content}
        </p>
      </div>
    </button>
  );
}
