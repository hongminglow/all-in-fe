import { create } from "zustand";
import type { TUserDetails } from "~/types/user";
import { persist } from "zustand/middleware";

type TUserStoreState = {
  user: TUserDetails | null;
};

type TUserStoreActions = {
  setUser: (user: TUserDetails | null) => void;
  updateBalance: (balance: number) => void;
  reset: () => void;
};

export const useUserStore = create<
  TUserStoreState & { actions: TUserStoreActions }
>()(
  persist(
    (set) => ({
      user: null,
      actions: {
        setUser: (user: TUserDetails | null) => set(() => ({ user })),
        updateBalance: (amount: number) =>
          set((state) => {
            if (!state.user) return {};
            return {
              user: {
                ...state.user,
                balance: state.user.balance + amount,
              },
            };
          }),
        reset: () => set(() => ({ user: null })),
      },
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
