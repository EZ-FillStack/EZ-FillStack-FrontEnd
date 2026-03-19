import { useState } from 'react';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useChangePasswordMutation } from '@/hooks/mutations/auth/useChangePassword';

type ChangePasswordModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ChangePasswordModal({
  open,
  onOpenChange,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);

  const { mutate: changePasswordMutate, isPending } =
    useChangePasswordMutation();

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setNewPasswordConfirm('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowNewPasswordConfirm(false);
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = () => {
    if (!currentPassword || !newPassword || !newPasswordConfirm) {
      toast.error('모든 항목을 입력해주세요.', {
        position: 'top-center',
      });
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      toast.error('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.', {
        position: 'top-center',
      });
      return;
    }

    if (currentPassword === newPassword) {
      toast.error('현재 비밀번호와 새 비밀번호는 다르게 입력해주세요.', {
        position: 'top-center',
      });
      return;
    }

    if (newPassword.length < 8) {
      toast.error('새 비밀번호는 8자 이상 입력해주세요.', {
        position: 'top-center',
      });
      return;
    }

    changePasswordMutate(
      {
        currentPassword,
        newPassword,
      },
      {
        onSuccess: () => {
          toast.success('비밀번호가 변경되었습니다.', {
            position: 'top-center',
          });
          handleClose(false);
        },
        onError: () => {
          toast.error('비밀번호 변경에 실패했습니다.', {
            position: 'top-center',
          });
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>비밀번호 변경</DialogTitle>
          <DialogDescription>
            현재 비밀번호를 입력하고 새 비밀번호로 변경해주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">현재 비밀번호</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="현재 비밀번호를 입력해주세요"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">새 비밀번호</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호를 입력해주세요"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500">
              8자 이상으로 입력해주세요.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPasswordConfirm">새 비밀번호 확인</Label>
            <div className="relative">
              <Input
                id="newPasswordConfirm"
                type={showNewPasswordConfirm ? 'text' : 'password'}
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                placeholder="새 비밀번호를 다시 입력해주세요"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPasswordConfirm((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showNewPasswordConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isPending}
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="bg-slate-700 text-white hover:bg-slate-800"
            >
              {isPending ? '변경 중...' : '비밀번호 변경'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}