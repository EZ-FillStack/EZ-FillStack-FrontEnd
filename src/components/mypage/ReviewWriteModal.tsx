import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCreateReview } from '@/hooks/mutations/review/useCreateReview';
import { toast } from 'sonner';

type ReviewWriteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: number | null;
};

export default function ReviewWriteModal({
  open,
  onOpenChange,
  eventId,
}: ReviewWriteModalProps) {
  const [reviewContent, setReviewContent] = useState('');
  const { mutate, isPending } = useCreateReview();

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setReviewContent('');
    }
    onOpenChange(nextOpen);
  };

  const handleClose = () => {
    handleOpenChange(false);
  };

  const handleSubmit = () => {
    if (!eventId) {
      toast.error('이벤트 정보가 없습니다.', {
        position: 'top-center',
      });
      return;
    }

    if (!reviewContent.trim()) {
      toast.error('리뷰 내용을 입력해주세요.', {
        position: 'top-center',
      });
      return;
    }

    mutate(
      {
        eventId,
        content: reviewContent,
      },
      {
        onSuccess: () => {
          toast.success('리뷰가 등록되었습니다.', {
            position: 'top-center',
          });
          setReviewContent('');
          onOpenChange(false);
        },
        onError: (error) => {
          console.error(error);
          toast.error('리뷰 등록에 실패했습니다.', {
            position: 'top-center',
          });
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-lg rounded-2xl px-6 py-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900">
            리뷰 작성
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-5">
          <div>
            <div className="mb-2 text-sm font-medium text-slate-700">
              리뷰 내용
            </div>
            <Textarea
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="체험 후기를 작성해주세요."
              className="min-h-40 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              취소
            </Button>
            <Button type="button" onClick={handleSubmit} disabled={isPending}>
              {isPending ? '등록 중...' : '등록'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}