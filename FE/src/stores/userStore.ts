import { create } from 'zustand';

interface UserInfo {
    userEmail: string;
    userIdx: number;
    userIsLive: 'Y' | 'N';
    userName: string;
    userProfile: string;
    userRole: 'USER' | 'COUNSELOR';
    userTel: string;
    userIntro: string | '';
}

// Zustand 스토어 인터페이스 정의
interface Store {
    token: string | null;
    userInfo: UserInfo | null; // userInfo는 UserInfo 또는 null일 수 있음
    setToken: (token: string | null) => void;
    setUserInfo: (userInfo: UserInfo | null) => void;
}

// Zustand 스토어 생성
const userStore = create<Store>((set) => ({
    token: null,
    userInfo: null, // 수정된 부분
    setToken: (token) => set({ token }),
    setUserInfo: (userInfo) => set({ userInfo }),
}));

export default userStore;
