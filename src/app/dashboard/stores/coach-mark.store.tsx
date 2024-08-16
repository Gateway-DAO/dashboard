import { create } from 'zustand';

type CoachMarkType = { key: string; value: string | boolean } | null;

type CoachMarkState = {
  coachMark: CoachMarkType;
  setCoachMark: (coachMark: CoachMarkType) => void;
};

export const useCoachMarkStore = create<CoachMarkState>((set) => ({
  coachMark: null,
  setCoachMark: (newValue: CoachMarkType) =>
    set(() => ({ coachMark: newValue })),
}));
