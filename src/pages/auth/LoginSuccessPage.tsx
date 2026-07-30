import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { getMyProfile } from '@/api/profile';
import useAppStore from '@/stores/useAppStore';

export default function LoginSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setUser = useAppStore((state) => state.setUser);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    localStorage.setItem('accessToken', token);

    getMyProfile()
      .then((profile) => {
        setUser(profile);
        navigate('/', { replace: true });
      })
      .catch(() => {
        navigate('/login', { replace: true });
      });
  }, [searchParams, navigate, setUser]);

  return <div>로그인 처리 중...</div>;
}
