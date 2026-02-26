import { create } from 'zustand';
// Zustand create

//User 관련 설정
// User 정보는 일단 id/닉네임/진짜 id로 설정함
type User = {
    id: number;
    username: string;
    nickname: string;
}

// AppState type 정의
type AppState = {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;

    setUser: (user : User | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    logout: () => void;
}

// 메인 전역 스토어 설정
const useAppStore = create<AppState>((set) => ({

    //기본 설정
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,

    //!!으로 truthy / falsy를 boolean으로 반환
    setUser: (user) => set({
       user,
        isAuthenticated: !!user,
    }),

    setLoading: (loading) => set ({ loading }),

    setError: (message) => set({ error : message }),

    logout: ()=> set({
        user:null,
        isAuthenticated: false
    }),

    }));

export default useAppStore;