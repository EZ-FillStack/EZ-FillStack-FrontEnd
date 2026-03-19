import axios from 'axios';

const ERROR_MESSAGE_MAP: Record<string, string> = {
  EVENT_NOT_FOUND: '존재하지 않는 행사입니다.',
  BAD_REQUEST: '잘못된 요청입니다.',
};

export function generateErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const code = error.response?.data?.code;
    const message = error.response?.data?.message;

    if (code && ERROR_MESSAGE_MAP[code]) {
      return ERROR_MESSAGE_MAP[code];
    }

    if (message) {
      return message;
    }
  }

  return '문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
}
