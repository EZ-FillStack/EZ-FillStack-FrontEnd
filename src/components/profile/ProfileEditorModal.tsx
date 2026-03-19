import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { toast } from 'sonner';

import useAppStore from '@/stores/useAppStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import defaultAvatar from '@/assets/default-avatar.png';
import { useProfileEditorModal } from '@/stores/useProfileEditorModalStore';
import { useUpdateProfileMutation } from '@/hooks/mutations/profile/useUpdateProfile';
import { uploadProfileImage } from '@/api/profile';

type SelectedImage = {
  file: File;
  previewUrl: string;
};

// 임시 확인용
type User = {
  id: number;
  username: string;
  nickname: string;
  email?: string;
  phone?: string;
  profileImageUrl?: string;
};

type ProfileEditorFormProps = {
  user: User;
  onClose: () => void;
};

function ProfileEditorForm({ user, onClose }: ProfileEditorFormProps) {
  const setUser = useAppStore((state) => state.setUser);

  const [nickname, setNickname] = useState(user.nickname || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateProfileMutate, isPending } = useUpdateProfileMutation({
    onSuccess: (updatedUser) => {
      setUser(updatedUser);

      toast.success('프로필이 수정되었습니다.', {
        position: 'top-center',
      });
      onClose();
    },
    onError: (error) => {
      console.error(error);
      toast.error('프로필 수정에 실패했습니다.', {
        position: 'top-center',
      });
    },
  });

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage.previewUrl);
      }
    };
  }, [selectedImage]);

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.previewUrl);
    }

    setSelectedImage({
      file,
      previewUrl: URL.createObjectURL(file),
    });
  };

  const handleClickImage = () => {
    fileInputRef.current?.click();
  };

  const handleUpdateClick = async () => {
    if (nickname.trim() === '') {
      toast.error('닉네임을 입력해주세요.', {
        position: 'top-center',
      });
      return;
    }

    const trimmedNickname = nickname.trim();
    const trimmedEmail = email.trim() || undefined;
    const trimmedPhone = phone.trim() || undefined;

    const isUnchanged =
      trimmedNickname === user.nickname &&
      trimmedEmail === user.email &&
      trimmedPhone === user.phone &&
      !selectedImage;

    if (isUnchanged) {
      toast.error('변경된 내용이 없습니다.', {
        position: 'top-center',
      });
      onClose();
      return;
    }

    try {
      let nextProfileImageUrl = user.profileImageUrl;

      if (selectedImage) {
        nextProfileImageUrl = await uploadProfileImage(selectedImage.file);
      }

      updateProfileMutate({
        userId: user.id,
        nickname: nickname.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        profileImageUrl: nextProfileImageUrl,
      });
    } catch (error) {
      console.error(error);
      toast.error('이미지 업로드에 실패했습니다.', {
        position: 'top-center',
      });
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>프로필 수정</DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">프로필 이미지</p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleSelectImage}
            disabled={isPending}
            className="hidden"
          />

          <button
            type="button"
            onClick={handleClickImage}
            disabled={isPending}
            className="w-fit"
          >
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={
                  selectedImage?.previewUrl ||
                  user.profileImageUrl ||
                  defaultAvatar
                }
                alt={user.nickname || user.username || 'user'}
                className="object-cover"
              />
            </Avatar>
          </button>

          <p className="text-xs text-muted-foreground">
            이미지를 클릭해서 변경할 수 있어요.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-muted-foreground">닉네임</label>
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            disabled={isPending}
            placeholder="닉네임을 입력해주세요"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-muted-foreground">이메일</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            placeholder="이메일을 입력해주세요"
            type="email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-muted-foreground">전화번호</label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isPending}
            placeholder="전화번호를 입력해주세요"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            type="button"
            onClick={handleUpdateClick}
            disabled={isPending}
          >
            저장
          </Button>
        </div>
      </div>
    </>
  );
}

type ProfileEditorModalProps = {
  user: User;
};

export default function ProfileEditorModal({ user }: ProfileEditorModalProps) {
  const { isOpen, actions } = useProfileEditorModal();
  const { close } = actions;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-md">
        {isOpen ? (
          <ProfileEditorForm
            key={`${user.id}-${isOpen}`}
            user={user}
            onClose={close}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
