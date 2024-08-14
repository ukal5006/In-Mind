import { create } from 'zustand';
import axios from 'axios';
import ENDPOINT from '../apis/endpoint';

interface Review {
  rno: number;
  content: string;
  userName: string;
  userIdx: number;
  reviewScore: number;
  createdAt: string;
}

interface ReviewStore {
  reviews: Review[];
  fetchReviews: (userId: number, token: string) => Promise<void>;
  deleteReview: (reviewId: number, token: string) => Promise<void>;
}

const useReviewStore = create<ReviewStore>((set) => ({
  reviews: [],
  fetchReviews: async (userId: number, token: string) => {
    try {
      const response = await axios.get(`${ENDPOINT}/reviews?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept:'*/*'
        },
      });
      set({ reviews: response.data });
    } catch (error) {
      console.error('리뷰를 불러오는데 실패했습니다:', error);
    }
  },
  deleteReview: async (reviewId: number, token: string) => {
    try {
      await axios.delete(`${ENDPOINT}/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        reviews: state.reviews.filter((review) => review.rno !== reviewId),
      }));
    } catch (error) {
      console.error('리뷰를 삭제하는데 실패했습니다:', error);
    }
  },
}));

export default useReviewStore;