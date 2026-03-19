import clientAPI from '@/lib/axios';

export type UpdateProfileParams = {
  userId: number;
  nickname: string;
  email?: string;
  phone?: string;
  profileImageUrl?: string;
};

export type UpdateProfileResponse = {
  id: number;
  username: string;
  nickname: string;
  email?: string;
  phone?: string;
  profileImageUrl?: string;
};

export async function updateProfile({
  userId,
  nickname,
  email,
  phone,
  profileImageUrl,
}: UpdateProfileParams) {
  const response = await clientAPI.patch<UpdateProfileResponse>(
    `/users/${userId}/profile`,
    {
      nickname,
      email,
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

  const response = await clientAPI.post<UploadProfileImageResponse>(
    '/images/profile',
    formData,
  );

  return response.data.profileImageUrl;
}
