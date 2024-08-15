import { create } from 'zustand';
import axios from 'axios';
import userStore from './userStore';

const API_BASE_URL = 'https://i11b301.p.ssafy.io/api'; //api 확정 후 변경 필요
const { token } = userStore((state) => state);

interface Report {
  reportCreatedAt: string;
  reportResult: string; //검사 그림 이미지도 제공할 필요가 있을지 논의 필요. 전체목록조회라서 사진까지는 없어도 될 것 같음.
}

interface ReportStore {
  reports: Report[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  fetchReports: (userId: string) => Promise<void>;
  setCurrentPage: (page: number) => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  reports: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
  fetchReports: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_BASE_URL}/reports?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: '*/*',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
      );
      const data = response.data;
      set({
        reports: data.children.flatMap((child: any) => child.reports),
        totalPages: Math.ceil(
          data.children.flatMap((child: any) => child.reports).length / 5
        ),
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching report list:', error);
      set({ error: 'Failed to fetch reports', isLoading: false });
    }
  },
  setCurrentPage: (page) => set({ currentPage: page }),
}));
