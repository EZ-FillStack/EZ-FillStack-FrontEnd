//에러박스 처리
import useAppStore from "@/stores/useAppStore";

type ErrorMessageProps = { //useAppStore 에러를 받아옵니다.
  message?: string | null;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const storeError = useAppStore((state) => state.error);
  const setError = useAppStore((state) => state.setError);
  // 메시지가 별개로 없으면 스토어 기본 에러 메시지를 받아옵니다.
  const displayMessage = message ?? storeError;

  if (!displayMessage) return null;

  return (
    <div
      role="alert"
      className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      <div className="flex items-start justify-between gap-2">
        <p>{displayMessage}</p>
        {!message && setError && (
          <button
            type="button"
            onClick={() => setError(null)}
            className="shrink-0 text-destructive/80 hover:text-destructive underline-offset-2 hover:underline text-xs"
            aria-label="에러 메시지 닫기"
          >
            닫기
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
