import { NavLink } from 'react-router';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    title: '신청 내역',
    to: '/my-page/applied',
  },
  {
    title: '관심 체험',
    to: '/my-page/liked',
  },
  {
    title: '계정 관리',
    to: '/my-page/account',
  },
];

export default function MyPageSidebar() {
  return (
    <aside className=" h-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="bg-slate-700 px-5 py-4 text-base font-semibold text-white">
        신청한 체험
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
                  : 'text-slate-700 hover:bg-slate-50'
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