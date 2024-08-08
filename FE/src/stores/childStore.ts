import { create } from 'zustand';
import axios from 'axios';
import { CHILDDEFAULT } from '../apis/childApi';
import { CHILDINFO } from '../apis/userApi';
import userStore from './userStore'

interface ChildData {
  childIdx: number;
  childName: string;
  childBirth: string;
}

interface ChildState {
  children: ChildData[];
  isLoading: boolean;
  error: string | null;
  readAllChildren:() => Promise<void>;
  fetchChildren: (childIdx: number) => Promise<void>;
  addChild: (userIdx: number, childInfo: object) => Promise<void>;
  updateChild: (childIdx: number, childInfo: Partial<ChildData>) => Promise<void>;
  deleteChild: (childIdx: number) => Promise<void>;
}
const { userInfo } = userStore((state) => state);

const useChildStore = create<ChildState>((set, get) => ({
  children: [],
  isLoading: false,
  error: null,

  fetchChildren: async (childIdx:number) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${CHILDDEFAULT}/${childIdx}`);
      set({ children: response.data, isLoading: false, error: null });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to fetch children' });
    }
  },
  readAllChildren: async () => {
    set({ isLoading:true});
    try {
        const response = axios.get(`${CHILDINFO(userInfo.userIdx)}`);
        set({ children: response.data, isLoading: false, error: null });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to fetch children' });
    }
  },

  addChild: async (userIdx:number, childInfo:object) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${CHILDDEFAULT}/${userInfo.userIdx}`, childInfo, {
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

  updateChild: async (childIdx, childInfo) => {
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

  deleteChild: async (childIdx) => {
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