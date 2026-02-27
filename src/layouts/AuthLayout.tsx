import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex justify-center pt-20 bg-background px-4" >
      <Outlet />
    </div>
  );
}
