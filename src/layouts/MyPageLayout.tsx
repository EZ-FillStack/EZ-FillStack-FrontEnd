import { Outlet } from 'react-router';

export default function MyPageLayout() {
  return (
    <div>
      <div>MyPageLayout</div>
      <Outlet />
    </div>
  );
}
