import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router'; // React Router 기능 활성화, 앱 전체에서 라우팅을 쓰기 위한 필수 설정
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'; // 앱 전체에서 TanStack Query 사용하기 위한 설정
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // 개발용 디버깅 도구
import { Toaster } from './components/ui/sonner.tsx'; // 전역 Toast UI (성공/에러 등 사용자 피드백 표시)

// 전역 QueryClient 설정
// - retry: false → 요청 실패 시 자동 재시도 방지
// - refetchOnWindowFocus: false → 탭 복귀 시 자동 재요청 방지
// 서버 부하를 줄이고 요청 흐름을 명확하게 제어하기 위해 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Toaster />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
