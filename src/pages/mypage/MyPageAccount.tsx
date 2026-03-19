import ProfileEditorModal from '@/components/profile/ProfileEditorModal';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import useAppStore from '@/stores/useAppStore';
import { useOpenProfileEditorModal } from '@/stores/useProfileEditorModalStore';
import { Mail, Phone, User } from 'lucide-react';
import defaultAvatar from '@/assets/default-avatar.png';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useDeleteUserMutation } from '@/hooks/mutations/auth/useDeleteUser';
import ChangePasswordModal from '@/components/profile/ChangePasswordModal';
import { useState } from 'react';

type MyAccount = {
  username: string;
  nickname?: string;
  email?: string;
  phone?: string;
  profileImageUrl?: string;
};

const myAccount: MyAccount = {
  username: '홍길동',
  nickname: '길동이',
  email: 'gildong@example.com',
  phone: '010-1234-5678',
};

export default function MyPageAccount() {
  const openProfileEditorModal = useOpenProfileEditorModal();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    toast.success('로그아웃되었습니다.', {
      position: 'top-center',
    });

    navigate('/login');
  };

  const { mutate: deleteUserMutate } = useDeleteUserMutation();

  const handleDeleteAccount = () => {
    const confirmed = confirm('정말 탈퇴하시겠습니까?');

    if (!confirmed) return;

    deleteUserMutate(undefined, {
      onSuccess: () => {
        logout();

        toast.success('회원 탈퇴가 완료되었습니다.', {
          position: 'top-center',
        });

        navigate('/');
      },
      onError: () => {
        toast.error('회원 탈퇴에 실패했습니다.', {
          position: 'top-center',
        });
      },
    });
  };

  return (
    <div>
      <div className="text-xl font-semibold text-slate-900">계정 관리</div>

      <div className="mt-6 space-y-5">
        {/* 프로필 카드 */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <Avatar className="h-24 w-24 shrink-0">
                <AvatarImage
                  src={myAccount.profileImageUrl || defaultAvatar}
                  alt={myAccount.nickname || myAccount.username || 'user'}
                  className="object-cover"
                />
              </Avatar>

              <div>
                <div className="text-xl font-semibold text-slate-900">
                  {myAccount.nickname || myAccount.username}
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  {myAccount.email}
                </div>
              </div>
            </div>

            <Button
              onClick={openProfileEditorModal}
              type="button"
              className="h-9 bg-slate-700 px-4 text-sm text-white hover:bg-slate-800"
            >
              정보 수정
            </Button>
            {/* 데이터가 없어서 임시 확인용
            <ProfileEditorModal/>
            */}
            <ProfileEditorModal
              user={{
                id: 1,
                username: myAccount.username,
                nickname: myAccount.nickname || '',
                profileImageUrl: myAccount.profileImageUrl,
              }}
            />
          </div>
        </section>

        {/* 기본 정보 카드 */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-slate-900">기본 정보</h3>

          <div className="mt-5 space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <User className="h-4 w-4 text-slate-500" />
              <span className="w-20 shrink-0 text-slate-500">이름</span>
              <span>{myAccount.username}</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-700">
              <User className="h-4 w-4 text-slate-500" />
              <span className="w-20 shrink-0 text-slate-500">닉네임</span>
              <span>{myAccount.nickname || '-'}</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-700">
              <Mail className="h-4 w-4 text-slate-500" />
              <span className="w-20 shrink-0 text-slate-500">이메일</span>
              <span>{myAccount.email || '-'}</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-700">
              <Phone className="h-4 w-4 text-slate-500" />
              <span className="w-20 shrink-0 text-slate-500">전화번호</span>
              <span>{myAccount.phone || '-'}</span>
            </div>
          </div>
        </section>

        {/* 계정 설정 카드 */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-slate-900">계정 설정</h3>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              className="text-slate-700"
              onClick={() => setIsChangePasswordOpen(true)}
            >
              비밀번호 변경
            </Button>
            <Button
              type="button"
              variant="outline"
              className="text-slate-700"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
              onClick={handleDeleteAccount}
            >
              회원 탈퇴
            </Button>
          </div>
        </section>
      </div>
      <ChangePasswordModal
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      />
    </div>
  );
}
