// 고객센터 문의 플로팅 버튼입니다.
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import useAppStore from '@/stores/useAppStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type SupportFloatingButtonProps = {
  onClick?: () => void;
  className?: string;
  hidden?: boolean;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function SupportFloatingButton({
  onClick,
  className,
  hidden,
}: SupportFloatingButtonProps) {
  const user = useAppStore((s) => s.user);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [content, setContent] = useState('');

  const reset = () => {
    setTitle('');
    setReplyEmail('');
    setContent('');
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      reset();
    } else {
      // 로그인 시 전역 User 이메일을 답변 받을 주소 기본값으로
      setReplyEmail(user?.email?.trim() ?? '');
    }
    setOpen(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('제목을 입력해주세요.');
      return;
    }
    if (!replyEmail.trim()) {
      toast.error('답변 받을 이메일을 입력해주세요.');
      return;
    }
    if (!isValidEmail(replyEmail)) {
      toast.error('이메일 형식을 확인해주세요.');
      return;
    }
    if (!content.trim()) {
      toast.error('문의 내용을 입력해주세요.');
      return;
    }

    toast.success('문의가 접수되었습니다.');
    reset();
    setOpen(false);
  };

  if (hidden) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <button
        type="button"
        onClick={() => {
          onClick?.();
          handleOpenChange(true);
        }}
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:bg-slate-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
        aria-label="고객센터 문의"
      >
        <MessageCircle className="h-7 w-7" strokeWidth={2} />
      </button>

      <DialogContent className="gap-0 overflow-hidden border-slate-200 p-0 sm:max-w-lg sm:rounded-2xl">
        <DialogHeader className="space-y-1 border-b border-slate-200 px-5 py-4 text-left">
          <DialogTitle className="text-xl font-semibold text-slate-900">
            고객센터 문의
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            문의를 남겨주시면 답변을 이메일로 보내드립니다.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl border-0 bg-white p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="inquiry-title" className="text-sm font-medium text-slate-800">
                  제목
                </label>
                <Input
                  id="inquiry-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="문의 제목"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="inquiry-email" className="text-sm font-medium text-slate-800">
                  답변 받을 이메일
                </label>
                <Input
                  id="inquiry-email"
                  type="email"
                  autoComplete="email"
                  value={replyEmail}
                  onChange={(e) => setReplyEmail(e.target.value)}
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="inquiry-content" className="text-sm font-medium text-slate-800">
                문의 내용
              </label>
              <Textarea
                id="inquiry-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="문의 내용을 자세히 입력해주세요"
                rows={5}
                className="resize-y"
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                className="border-slate-300"
                onClick={() => handleOpenChange(false)}
              >
                닫기
              </Button>
              <Button type="submit" className="bg-gray-600 text-white hover:bg-gray-800">
                보내기
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
