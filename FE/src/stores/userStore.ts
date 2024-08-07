import { create } from 'zustand';

// UserInfo 인터페이스 정의
interface UserInfo {
    userIdx: number; // Int는 TypeScript에서 number로 표현
    userEmail: string;
    userName: string;
    userRole: string;
}

// Zustand 스토어 인터페이스 정의
interface Store {
    user: UserInfo | null; // user는 UserInfo 타입이거나 null일 수 있음
    setUser: (user: UserInfo | null) => void; // setUser 메소드는 UserInfo 또는 null을 인자로 받음
}

// Zustand 스토어 생성
const useStore = create<Store>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

export default useStore;
