import axios from 'axios';

const ERROR_MESSAGE_MAP: Record<string, string> = {
  EVENT_NOT_FOUND: '존재하지 않는 행사입니다.',
  BAD_REQUEST: '잘못된 요청입니다.',
};

/** 서버에 message/code가 없을 때 쓰는 화면별 기본 문구 */
export type ErrorMessageContext =
  | 'search'
  | 'adminEvents'
  | 'adminUsers'
  | 'adminInquiries'
  | 'inquiryAnswer'
  | 'adminEventCreate'
  | 'adminEventUpdate'
  | 'adminEventDelete'
  | 'adminUserDelete'
  | 'supportInquiry';

const CONTEXT_FALLBACK: Record<ErrorMessageContext, string> = {
  search: '검색 결과를 불러오지 못했습니다.',
  adminEvents: '행사 목록을 불러오지 못했습니다.',
  adminUsers: '회원 목록을 불러오지 못했습니다.',
  adminInquiries: '문의 목록을 불러오지 못했습니다.',
  inquiryAnswer: '답변을 등록하지 못했습니다.',
  adminEventCreate: '행사를 등록하지 못했습니다.',
  adminEventUpdate: '행사를 수정하지 못했습니다.',
  adminEventDelete: '행사를 삭제하지 못했습니다.',
  adminUserDelete: '회원 처리에 실패했습니다.',
  supportInquiry: '문의를 접수하지 못했습니다.',
};

/**
 * Axios 응답의 code/message를 우선하고, 없으면 context별 문구, 마지막으로 공통 문구.
 */
export function generateErrorMessage(
  error: unknown,
  context?: ErrorMessageContext,
) {
  if (axios.isAxiosError(error)) {
    const payload = error.response?.data as
      | { code?: string; message?: string }
      | undefined;
    const code = payload?.code;
    const message = payload?.message;

    if (code && ERROR_MESSAGE_MAP[code]) {
      return ERROR_MESSAGE_MAP[code];
    }

    if (message) {
      return message;
    }
  }

  if (context) {
    return CONTEXT_FALLBACK[context];
  }

  return '문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
}
