import clientAPI from '@/lib/axios';

// 회원가입 요청
export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data } = await clientAPI.post('/auth/signup', {
    email,
    password,
  });

  return data;
}
// 비밀번호와 함께 로그인
export async function loginWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data } = await clientAPI.post('/auth/login', {
    email,
    password,
  });

  return data;
}

export async function deleteUser() {
  const response = await clientAPI.delete('/users/me');
  return response.data;
}

type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export async function changePassword(data: ChangePasswordRequest) {
  const response = await clientAPI.patch('/users/me/password', data);
  return response.data;
}

export function loginWithOAuth(provider: 'google' | 'kakao' | 'naver') {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  window.location.href = `${baseUrl}/oauth2/authorization/${provider}`;
}


