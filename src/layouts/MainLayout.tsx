import { Outlet } from 'react-router';
import { useLocation } from 'react-router';
import { useEffect } from "react";

export default function MainLayout() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
