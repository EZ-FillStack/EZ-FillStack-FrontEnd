import clientAPI from '@/lib/axios';

export type InquiryCreateBody = {
  title: string;
  content: string;
};

/** 백엔드 `InquiryResponse` */
export type InquiryResponseDto = {
  id: number;
  title: string;
  content: string;
  status: 'UNANSWERED' | 'ANSWERED';
  replyEmail: string | null;
  createdAt: string;
  answeredAt: string | null;
};

export async function createInquiry(body: InquiryCreateBody) {
  await clientAPI.post('/inquiry', body);
}

export async function getAdminInquiries() {
  const response = await clientAPI.get<InquiryResponseDto[]>(
    '/admin/inquiries',
  );
  return response.data;
}

export type InquiryAnswerBody = {
  replyContent: string;
};

export async function answerAdminInquiry(
  inquiryId: number,
  body: InquiryAnswerBody,
) {
  await clientAPI.patch(`/admin/inquiry/${inquiryId}`, body);
}
