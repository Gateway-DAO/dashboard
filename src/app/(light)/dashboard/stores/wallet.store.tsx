import { create } from 'zustand';

type WalletState = {
  showValues: boolean;
  toggleShowValue: () => void;
};

export const useWalletStore = create<WalletState>((set) => ({
  showValues: true,
  toggleShowValue: () => set((state) => ({ showValues: !state.showValues })),
}));
