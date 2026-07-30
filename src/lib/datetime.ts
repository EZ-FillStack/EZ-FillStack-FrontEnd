// 날짜/시간 Formatting 처리를 합니다.

//2자리 문자열로 반환
function pad2(n: number) {
  return String(n).padStart(2, '0');
}

// 서버 문자열 → datetime-local로 변환
// 서버에 있는 것을 불러올 때 사용
export function toDatetimeLocalInput(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

// datetime-local -> 서버 문자열 형태로 할때
// 백엔드 서버에 저장용
export function fromDatetimeLocalInput(value: string): string {
  const v = value.trim();
  if (!v) return '';
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(v)) return v;
  // 분만 적혀 있다면의 처리
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(v)) return `${v}:00`;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}:00`;
}