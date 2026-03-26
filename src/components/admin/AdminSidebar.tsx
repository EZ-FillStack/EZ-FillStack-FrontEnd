import { NavLink } from 'react-router';
import { cn } from '@/lib/utils';

const menuItems = [
  { title: '체험 등록', to: '/admin/experiences/register' },
  { title: '체험 관리', to: '/admin/experiences/manage' },
  { title: '신청 관리', to: '/admin/applications' },
  { title: '고객센터 문의', to: '/admin/inquiries' },
  { title: '회원 관리', to: '/admin/users'},
  { title: '리뷰 관리', to: '/admin/reviews' },
];

export default function AdminSidebar() {
  return (
    <aside className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="bg-slate-700 px-5 py-4 text-base font-semibold text-white">
        관리자 메뉴
      </div>
      <nav className="flex flex-col">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'border-t border-slate-200 px-5 py-4 text-left text-sm transition-colors',
                isActive
                  ? 'bg-slate-50 font-semibold text-slate-900'
                  : 'text-slate-700 hover:bg-slate-50',
              )
            }
          >
            {item.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
