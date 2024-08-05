// store.ts
import {create} from 'zustand';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'; //나중에 api연결시 제대로 된 주소 연결 필요

// Counselor 인터페이스를 직접 정의
interface Counselor {
  userName: string;
  userTel: string;
  userProfile: string;
  userIsAuth: boolean;
  organizationName: string;
  organizationTel: string;
  certificateTitle: string;
  resumeInfo: string;
  reviewCreateAt: string;
  reviewContent: string;
  reviewRating: number;
  reviewCount: number;
  reviewRatingAverage: number;
}

interface CounselorStore {
  counselor: Counselor | null;
  loading: boolean;
  error: string | null;
  fetchCounselor: (userId: number) => Promise<void>;
}

export const useCounselorStore = create<CounselorStore>((set) => ({
  counselor: null,
  loading: false,
  error: null,
  fetchCounselor: async (userId: number) => {
    set({ loading: true });
    try {
      const response = await axios.get<Counselor>(`${API_BASE_URL}/users/${userId}`);
      set({ counselor: response.data, loading: false });
    } catch (error) {
      set({ error: axios.isAxiosError(error) ? error.message : 'An error occurred', loading: false });
    }
  },
}));