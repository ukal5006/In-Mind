import { create } from 'zustand';
import axios from 'axios';
import { USERDEFAULT } from '../apis/userApi';
export interface Counselor {
    userIdx: number | undefined;
    name: string;
    tel: string;
    profile: string;
    IsAuth: string;
    intro: string;
    organizationName: string;
    organizationTel: string;
    reviewCount: number;
    reviewAverage: number;
}

interface CounselorState {
    counselors: Counselor[];
    filteredCounselors: Counselor[];
    isLoading: boolean;
    error: string | null;
    currentPage: number;
    searchType: 'name' | 'organization';
    searchTerm: string;
    filterOption: 'review' | 'reviewAverage' | 'distance';
    fetchCounselors: (name: string | null) => Promise<void>;
    setSearchType: (type: 'name' | 'organization') => void;
    setSearchTerm: (term: string) => void;
    setFilterOption: (option: 'review' | 'reviewAverage' | 'distance') => void;
    setCurrentPage: (page: number) => void;
}

// const { token } = userStore((state) => state);

const useCounselorStore = create<CounselorState>((set, get) => ({
    counselors: [],
    filteredCounselors: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    searchType: 'name',
    searchTerm: '',
    filterOption: 'review',

    fetchCounselors: async (searchTerm: string | null) => {
        // const { searchType, searchTerm, filterOption } = get();
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(USERDEFAULT, {
                params: searchTerm ? { name: searchTerm } : {},
                headers: {
                    // Authorization: `Bearer ${token}`,
                    accept: '*/*',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            });
            set({ counselors: response.data, isLoading: false });
            await console.log(response.data);
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
        case 'reviewAverage':
            return [...counselors].sort((a, b) => b.reviewAverage - a.reviewAverage);
        // case 'distance':
        //   return [...counselors].sort((a, b) => a.distance - b.distance);
        default:
            return counselors;
    }
};

export default useCounselorStore;
