# E.GO Frontend

기업·기관의 체험 행사를 한곳에 모아 **검색 · 신청 · 리뷰**를 제공하는 중개 플랫폼의 프론트엔드입니다.

- 사용자: 카테고리/검색으로 체험을 찾고, 신청하고, 찜하고, 참여 후 리뷰를 남깁니다.
- 관리자: 체험 등록/관리, 신청 관리, 회원 관리, 문의 답변, 리뷰 관리를 수행합니다.

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| 언어 | TypeScript |
| 프레임워크 | React 19 · Vite 7 |
| 라우팅 | React Router 7 |
| 서버 상태 | TanStack Query 5 |
| 클라이언트 전역 상태 | Zustand 5 |
| 통신 | Axios |
| 스타일 | Tailwind CSS 4 · shadcn/ui (Radix UI) |
| 에디터 | CKEditor 5 (관리자 체험 등록) |
| 외부 API | Kakao Map (주소 → 좌표 지도 표시) |

## 실행 방법

```bash
npm install
cp .env.example .env   # 값 채우기
npm run dev
```

### 환경 변수

| 키 | 설명 |
| --- | --- |
| `VITE_API_BASE_URL` | 백엔드 API 서버 주소 (예: `http://localhost:8080`) |
| `VITE_KAKAO_MAP_JS_KEY` | Kakao Map JavaScript 키 |
| `VITE_R2_PUBLIC_BASE_URL` | 업로드 이미지 조회용 공개 버킷 주소 |

`.env`는 커밋하지 않습니다. (`.env.example`만 추적)

### 스크립트

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | 타입 체크(`tsc -b`) 후 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 검사 |

## 디렉터리 구조

```
src/
├── api/          도메인별 API 호출 함수 (auth, events, review, bookmark, search, profile, admin ...)
├── hooks/
│   ├── queries/    도메인별 조회 훅 (TanStack Query)
│   ├── mutations/  도메인별 변경 훅
│   └── auth/       앱 진입 시 인증 복구(useAuthInit)
├── stores/       Zustand 전역 스토어 (인증 상태, 모달 상태)
├── routes/       도메인별 라우트 정의 (main / mypage / admin / auth)
├── layouts/      공통 레이아웃 및 접근 제어 (Global / Auth / MyPage / Admin)
├── pages/        화면 단위 컴포넌트
├── components/   재사용 컴포넌트 (ui는 shadcn/ui 기반)
├── lib/          axios 인스턴스, 에러 메시지 매핑, 날짜 포맷 등 공통 모듈
└── types/        도메인 타입 정의
```

## 설계 노트

### 상태 관리 분리

- **서버 데이터는 TanStack Query**로 관리합니다. 변경 후에는 `invalidateQueries`로 목록을 동기화합니다.
  (예: 찜 추가/해제 → `['myBookmarks']` 무효화)
- **클라이언트 전역 상태만 Zustand**에 둡니다. 인증 상태(`useAppStore`)와 모달 열림 상태(`useProfileEditorModalStore`).
- 전역 `QueryClient`는 `retry: false`, `refetchOnWindowFocus: false`로 두어 요청 흐름을 명시적으로 제어합니다.

### 인증

1. 로그인 성공 시 액세스 토큰을 저장합니다. **자동 로그인 체크 여부에 따라 `localStorage` / `sessionStorage`로 분기**합니다.
2. Axios 요청 인터셉터가 저장된 토큰을 `Authorization` 헤더에 자동으로 주입합니다.
   (`FormData` 요청은 브라우저가 boundary를 설정하도록 `Content-Type`을 제거합니다)
3. 새로고침 시 `useAuthInit`이 저장된 토큰으로 `/users/me`를 호출해 전역 사용자 상태를 복구합니다.
4. 소셜 로그인은 백엔드 OAuth2 엔드포인트로 리다이렉트하고, 콜백을 `/login-success`에서 받아 토큰을 저장합니다.

### 접근 제어

인증 복구가 진행 중인 동안(`authLoading`)에는 리다이렉트하지 않고 로더를 노출합니다.
확인이 끝난 뒤 레이아웃 단계에서 차단합니다.

- `MyPageLayout` — 비로그인 시 `/login`으로 이동
- `AdminLayout` — 비로그인 시 `/login`, `ROLE_ADMIN`이 아니면 `/`로 이동

### 에러 처리

`lib/error.ts`의 `generateErrorMessage(error, context)`로 메시지를 결정합니다.

```
서버 응답의 code/message  →  화면(context)별 기본 문구  →  전역 공통 문구
```

로그인 화면처럼 같은 코드라도 다른 문구가 필요한 경우는 context별 override로 처리합니다.

### 목록 응답 처리

백엔드 목록 API는 Spring `Page` 규격(`content`, `totalPages`, `totalElements`, `number`, `size`, `last`)을 사용합니다.
페이지 번호는 서버가 0-base, UI가 1-base라 요청/표시 시점에 변환합니다.
일부 API는 배열과 `Page`를 모두 반환할 수 있어 `extractList()`로 정규화합니다.
