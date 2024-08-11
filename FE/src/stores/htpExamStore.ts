import { create } from 'zustand';

interface Child {
  childIdx: number;
  childName: string;
  childBirth: string;
}

interface HTPExamStore {
  children: Child[];
  selectedChild: Child | null;
  imageUrl: string;
  drawingOrder: number[];
  background: string;
  setChildren: (children: Child[]) => void;
  setSelectedChild: (child: Child) => void;
  setImageUrl: (url: string) => void;
  setDrawingOrder: (order: number[]) => void;
  setBackground: (text: string) => void;
}

export const useHTPExamStore = create<HTPExamStore>((set) => ({
  children: [],
  selectedChild: null,
  imageUrl: '',
  drawingOrder: [],
  background: '',
  setChildren: (children) => set({ children }),
  setSelectedChild: (child) => set({ selectedChild: child }),
  setImageUrl: (url) => set({ imageUrl: url }),
  setDrawingOrder: (order) => set({ drawingOrder: order }),
  setBackground: (text) => set({ background: text }),
}));