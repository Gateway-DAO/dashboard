import { create } from 'zustand';

type EducationalType = { key: string; value: string | boolean } | null;

type EducationalState = {
  educational: EducationalType;
  setEducational: (educational: EducationalType) => void;
};

export const useEducationalStore = create<EducationalState>((set) => ({
  educational: null,
  setEducational: (newValue: EducationalType) =>
    set(() => ({ educational: newValue })),
}));
