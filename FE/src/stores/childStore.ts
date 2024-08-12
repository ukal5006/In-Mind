import { create } from 'zustand';
import axios from 'axios';
import { CHILDDEFAULT } from '../apis/childApi';
import { CHILDINFO } from '../apis/userApi';

interface ChildData {
    childIdx: number;
    childName: string;
    childBirth: string;
}

interface ChildState {
    children: ChildData[];
    isLoading: boolean;
    error: string | null;
    readAllChildren: (userIdx: number, token: string) => Promise<void>; // token 매개변수 추가
    fetchChildren: (childIdx: number, token: string) => Promise<void>; // token 매개변수 추가
    addChild: (userIdx: number, childInfo: Omit<ChildData, 'childIdx'>, token: string) => Promise<void>; // token 매개변수 추가
    updateChild: (childIdx: number, childInfo: Partial<ChildData>, token: string) => Promise<void>; // token 매개변수 추가
    deleteChild: (childIdx: number, token: string) => Promise<void>; // token 매개변수 추가
}

const useChildStore = create<ChildState>((set) => ({
    children: [],
    isLoading: false,
    error: null,

    readAllChildren: async (userIdx: number, token: string) => {
        // token 매개변수 사용
        set({ isLoading: true });
        try {
            const response = await axios.get<ChildData[]>(`${CHILDINFO(userIdx)}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // token 추가
                    accept: '*/*',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            });
            const uniqueChildren: ChildData[] = Array.from(
                new Map<number, ChildData>(response.data.map((child) => [child.childIdx, child])).values()
            );
            set({ children: uniqueChildren, isLoading: false, error: null });
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch children' });
        }
    },

    fetchChildren: async (childIdx: number, token: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.get<ChildData>(`${CHILDDEFAULT}/${childIdx}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // token 추가
                    accept: '*/*',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            });
            set({ children: [response.data], isLoading: false, error: null });
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch child' });
        }
    },

    addChild: async (userIdx: number, childInfo: Omit<ChildData, 'childIdx'>, token: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post<ChildData>(
                `${CHILDDEFAULT}`,
                { userIdx, ...childInfo },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // token 추가
                        accept: '*/*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                }
            );
            set((state) => {
                const newChild = response.data;
                const existingChild = state.children.find((child) => child.childIdx === newChild.childIdx);
                if (!existingChild) {
                    return {
                        children: [...state.children, newChild],
                        isLoading: false,
                        error: null,
                    };
                }
                return { ...state, isLoading: false, error: null };
            });
        } catch (error) {
            set({ isLoading: false, error: 'Failed to add child' });
        }
    },

    updateChild: async (childIdx: number, childInfo: Partial<ChildData>, token: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.put<ChildData>(`${CHILDDEFAULT}/${childIdx}`, childInfo, {
                headers: {
                    Authorization: `Bearer ${token}`, // token 추가
                    accept: '*/*',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            });
            set((state) => ({
                children: state.children.map((child) =>
                    child.childIdx === childIdx ? { ...child, ...response.data } : child
                ),
                isLoading: false,
                error: null,
            }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to update child' });
        }
    },

    deleteChild: async (childIdx: number, token: string) => {
        set({ isLoading: true });
        try {
            await axios.delete(`${CHILDDEFAULT}/${childIdx}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // token 추가
                    accept: '*/*',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            });
            set((state) => ({
                children: state.children.filter((child) => child.childIdx !== childIdx),
                isLoading: false,
                error: null,
            }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to delete child' });
        }
    },
}));

export default useChildStore;
