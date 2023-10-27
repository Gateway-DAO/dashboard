import { create } from 'zustand';

type WalletState = {
  showValues: boolean;
  toggleShowValue: (status?: boolean) => void;
};

export const useWalletStore = create<WalletState>((set) => ({
  showValues: true,
  toggleShowValue: () => set((state) => ({ showValues: !state.showValues })),
}));
