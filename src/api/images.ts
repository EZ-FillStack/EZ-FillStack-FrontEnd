export function resolvePublicImageUrl(data: unknown): string {
  const publicBase = (
    import.meta.env.VITE_R2_PUBLIC_BASE_URL as string | undefined
  )?.replace(/\/$/, '');

  if (!data || typeof data !== 'object') {
    throw new Error('이미지 업로드 응답 형식이 올바르지 않습니다.');
  }

  const d = data as Record<string, unknown>;

  const pickString = (key: string) =>
    typeof d[key] === 'string' ? (d[key] as string).trim() : '';

  const direct =
    pickString('profileImageUrl') ||
    pickString('url') ||
    pickString('imageUrl') ||
    pickString('fileUrl');

  if (direct) {
    if (direct.startsWith('http://') || direct.startsWith('https://')) {
      return direct;
    }
    if (publicBase) {
      return `${publicBase}/${direct.replace(/^\//, '')}`;
    }
    return direct;
  }

  const path = pickString('path') || pickString('key') || pickString('objectKey');
  if (path && publicBase) {
    return `${publicBase}/${path.replace(/^\//, '')}`;
  }

  throw new Error('이미지 업로드 응답에 URL 또는 경로가 없습니다.');
}
