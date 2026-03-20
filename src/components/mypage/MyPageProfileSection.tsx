import { Avatar, AvatarImage } from '@/components/ui/avatar';
import useAppStore from '@/stores/useAppStore';
import defaultAvatar from '@/assets/default-avatar.png';

export default function MyPageProfileSection() {
  const user = useAppStore((state) => state.user);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white px-6 py-6">
      <div className="flex items-center gap-6">
        {/* 프로필 이미지 */}
        <div className="relative shrink-0">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user?.profileImageUrl || defaultAvatar}
              alt={user?.nickname || user?.username || 'user'}
              className="object-cover"
            />
          </Avatar>
        </div>

        {/* 프로필 정보 */}
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold text-slate-900">
            {user?.nickname || user?.username || '사용자'}
          </div>
          <div className="mt-1 flex items-center gap-6 text-sm text-slate-700">
            <span>신청한 체험 3</span>
            <span>관심 체험 12</span>
          </div>
        </div>
      </div>
    </section>
  );
}
