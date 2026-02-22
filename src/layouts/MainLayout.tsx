import { Outlet } from 'react-router';

export default function MainLayout() {
  return (
    <div>
      <header>헤더</header>
      <Outlet />
      <footer>푸터</footer>
    </div>
  );
}
