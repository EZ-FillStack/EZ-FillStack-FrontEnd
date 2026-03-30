import clientAPI from '@/lib/axios';

export type UpdateProfileParams = {
  nickname: string;
  phone?: string;
  profileImageUrl?: string;
};

export type ProfileResponse = {
  id: number;
  username: string;
  nickname: string;
  email?: string;
  phone?: string;
  profileImageUrl?: string;
  loginType?: 'LOCAL' | 'GOOGLE' | 'KAKAO' | 'NAVER';
};

export type UpdateProfileResponse = ProfileResponse;

export async function getMyProfile() {
  const response = await clientAPI.get<ProfileResponse>('/users/me');
  return response.data;
}

export async function updateProfile({
  nickname,
  phone,
  profileImageUrl,
}: UpdateProfileParams) {
  const response = await clientAPI.patch<UpdateProfileResponse>(
    '/users/me/profile',
    {
      nickname,
      phone,
      profileImageUrl,
    },
  );

  return response.data;
}

export type UploadProfileImageResponse = {
  profileImageUrl: string;
};

export async function uploadProfileImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await clientAPI.patch<UploadProfileImageResponse>(
    '/users/me/profile-image',
    formData,
  );

  return response.data.profileImageUrl;
}
