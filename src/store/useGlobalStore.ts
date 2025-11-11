import { create } from "zustand";
import Cookies from "js-cookie";

type TGlobalStoreState = {
  accessToken: string | null;
};

type TGlobalStoreActions = {
  setAccessToken: (token: string | null) => void;
};

const initializeAccessToken = () => {
  return Cookies.get("token") ?? null;
};

export const useGlobalStore = create<
  TGlobalStoreState & { actions: TGlobalStoreActions }
>((set) => ({
  accessToken: initializeAccessToken(),
  actions: {
    setAccessToken: (token: string | null) =>
      set(() => ({ accessToken: token })),
  },
}));
