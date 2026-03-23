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
      <div className="h-36 rounded-xl border bg-card p-4 transition hover:bg-muted/50">
        <div className="line-clamp-1 text-sm font-semibold text-slate-900">
          {title}
        </div>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-slate-500">{nickname}</span>

          <div className="flex gap-1">
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

        <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600">
          {content}
        </p>
      </div>
    </button>
  );
}
