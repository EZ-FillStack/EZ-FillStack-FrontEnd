import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Star } from 'lucide-react';
import type { Review } from '@/types/review';

type ReviewDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: Review | null;
};

export default function ReviewDetailModal({
  open,
  onOpenChange,
  review,
}: ReviewDetailModalProps) {
  if (!review) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-lg rounded-2xl px-6 py-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900">
            베스트 리뷰
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <div className="text-sm font-medium text-slate-500">체험명</div>

            <div className="mt-1 flex items-center justify-between">
              <span className="text-base font-semibold text-slate-900">
                {review.title}
              </span>

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-500">작성자</div>
            <div className="mt-1 text-base text-slate-800">
              {review.nickname}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-500">리뷰 내용</div>
            <div className="mt-1 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-800">
              {review.content}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
