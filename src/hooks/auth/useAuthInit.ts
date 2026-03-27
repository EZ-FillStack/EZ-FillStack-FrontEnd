import { useEffect } from 'react';
import { getMyProfile } from '@/api/profile';
import useAppStore from '@/stores/useAppStore';

export function useAuthInit() {
  const setUser = useAppStore((state) => state.setUser);

  useEffect(() => {
    const token =
      localStorage.getItem('accessToken') ?? sessionStorage.getItem('accessToken');
    if (!token) return;

    getMyProfile()
      .then((profile) => setUser(profile))
      .catch(() => {
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('accessToken');
      });
  }, []);
}
