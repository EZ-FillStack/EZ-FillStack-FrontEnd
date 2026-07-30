import clientAPI from '@/lib/axios';
import { resolvePublicImageUrl } from '@/api/images';

export type UpdateProfileParams = {
  nickname: string;
  phone?: string;
};

export type ProfileResponse = {
  id: number;
  username: string;
  nickname: string;
  email?: string;
  phone?: string;
  profileImageUrl?: string;
  loginType?: 'LOCAL' | 'GOOGLE' | 'KAKAO' | 'NAVER';
  role: string;
};

export type UpdateProfileResponse = ProfileResponse;

export async function getMyProfile() {
  const response = await clientAPI.get<ProfileResponse>('/users/me');
  return response.data;
}

// PATCH /users/me/profile — 닉네임·전화만 (이미지와는 PATCH가 달라 분리)
export async function updateProfile({ nickname, phone }: UpdateProfileParams) {
  const response = await clientAPI.patch<UpdateProfileResponse>(
    '/users/me/profile',
    {
      nickname,
      phone,
    },
  );

  return response.data;
}

// PATCH /users/me/profile-image : 업로드 이후 반환된 이미지 URL 반영
export async function patchProfileImage(profileImageUrl: string) {
  const response = await clientAPI.patch<UpdateProfileResponse>(
    '/users/me/profile-image',
    {
      profile_image_url: profileImageUrl,
    },
  );

  return response.data;
}

export type UploadProfileImageResponse = Record<string, unknown>;

// POST /api/images/upload : 파일만 보내고 응답에서 URL 추출 후 profile-image PATCH로 연결
export async function uploadProfileImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await clientAPI.post<UploadProfileImageResponse>(
    '/api/images/upload',
    formData,
  );

  return resolvePublicImageUrl(response.data);
}
