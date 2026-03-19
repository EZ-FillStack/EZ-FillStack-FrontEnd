import { Outlet } from 'react-router';
import { useLocation } from 'react-router';

export default function MainLayout() {

  return (
    <div>
      <Outlet />
    </div>
  );
}
