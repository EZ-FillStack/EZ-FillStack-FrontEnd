import { Camera } from 'lucide-react';

export default function MyPageProfileSection() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white px-6 py-6">
      <div className="flex items-center gap-6">
        {/* 프로필 이미지 */}
        <div className="relative shrink-0">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-300 text-sm text-slate-700">
            프로필
          </div>

          <button
            type="button"
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-white shadow"
            aria-label="프로필 이미지 변경"
          >
            <Camera size={16} />
          </button>
        </div>

        {/* 프로필 정보 */}
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold text-slate-900">홍길동</div>

          <p className="text-base text-slate-700">hong@email.com</p>

          <div className="mt-1 flex items-center gap-6 text-sm text-slate-700">
            <span>신청한 체험 3</span>
            <span>관심 체험 12</span>
          </div>
        </div>
      </div>
    </section>
  );
}