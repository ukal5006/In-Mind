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
  readAllChildren: (userIdx: number) => Promise<void>;
  fetchChildren: (childIdx: number) => Promise<void>;
  addChild: (userIdx: number, childInfo: Omit<ChildData, 'childIdx'>) => Promise<void>;
  updateChild: (childIdx: number, childInfo: Partial<ChildData>) => Promise<void>;
  deleteChild: (childIdx: number) => Promise<void>;
}

const useChildStore = create<ChildState>((set) => ({
  children: [],
  isLoading: false,
  error: null,

  readAllChildren: async (userIdx: number) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${CHILDINFO(userIdx)}`);
      set({ children: response.data, isLoading: false, error: null });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to fetch children' });
    }
  },

  fetchChildren: async (childIdx: number) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${CHILDDEFAULT}/${childIdx}`);
      set({ children: [response.data], isLoading: false, error: null });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to fetch children' });
    }
  },

  addChild: async (userIdx: number, childInfo: Omit<ChildData, 'childIdx'>) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${CHILDDEFAULT}/${userIdx}`, childInfo, {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });
      set((state) => ({
        children: [...state.children, response.data],
        isLoading: false,
        error: null
      }));
    } catch (error) {
      set({ isLoading: false, error: 'Failed to add child' });
    }
  },

  updateChild: async (childIdx: number, childInfo: Partial<ChildData>) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(`${CHILDDEFAULT}/${childIdx}`, childInfo, {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });
      set((state) => ({
        children: state.children.map(child => 
          child.childIdx === childIdx ? { ...child, ...response.data } : child
        ),
        isLoading: false,
        error: null
      }));
    } catch (error) {
      set({ isLoading: false, error: 'Failed to update child' });
    }
  },

  deleteChild: async (childIdx: number) => {
    set({ isLoading: true });
    try {
      await axios.delete(`${CHILDDEFAULT}/${childIdx}`, {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });
      set((state) => ({
        children: state.children.filter(child => child.childIdx !== childIdx),
        isLoading: false,
        error: null
      }));
    } catch (error) {
      set({ isLoading: false, error: 'Failed to delete child' });
    }
  },
}));

export default useChildStore;