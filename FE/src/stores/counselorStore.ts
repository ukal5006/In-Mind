import { create } from 'zustand';
import axios from 'axios';

interface Counselor {
  idx: number;
  name: string;
  organization: string;
  education: string;
  experience: string;
  availableTime: string;
  distance: number;
  reviewCount: number;
  rating: number;
}

interface CounselorState {
  counselors: Counselor[];
  filteredCounselors: Counselor[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  searchType: 'name' | 'organization';
  searchTerm: string;
  filterOption: 'review' | 'rating' | 'distance';
  fetchCounselors: () => Promise<void>;
  setSearchType: (type: 'name' | 'organization') => void;
  setSearchTerm: (term: string) => void;
  setFilterOption: (option: 'review' | 'rating' | 'distance') => void;
  setCurrentPage: (page: number) => void;
}

const useCounselorStore = create<CounselorState>((set, get) => ({
  counselors: [],
  filteredCounselors: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  searchType: 'name',
  searchTerm: '',
  filterOption: 'review',

  fetchCounselors: async () => {
    const { searchType, searchTerm, filterOption } = get();
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/api/counselors?${searchType}=${searchTerm}`);
      const sortedCounselors = sortCounselors(response.data, filterOption);
      set({ counselors: response.data, filteredCounselors: sortedCounselors, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch counselors', isLoading: false });
    }
  },

  setSearchType: (type) => set({ searchType: type }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilterOption: (option) => {
    const sortedCounselors = sortCounselors(get().counselors, option);
    set({ filterOption: option, filteredCounselors: sortedCounselors });
  },
  setCurrentPage: (page) => set({ currentPage: page }),
}));

const sortCounselors = (counselors: Counselor[], option: string): Counselor[] => {
  switch (option) {
    case 'review':
      return [...counselors].sort((a, b) => b.reviewCount - a.reviewCount);
    case 'rating':
      return [...counselors].sort((a, b) => b.rating - a.rating);
    case 'distance':
      return [...counselors].sort((a, b) => a.distance - b.distance);
    default:
      return counselors;
  }
};

export default useCounselorStore;