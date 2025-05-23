import { create } from "zustand";

export interface UserInfo {
  nickname: string;
  profileImageUrl: string;
  bulletElo: number;
  blitzElo: number;
  classicalElo: number;
  puzzleElo: number;
  grade: string;
}

interface UserStore {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userInfo: null,
  setUserInfo: (info) => set({ userInfo: info }),
  clearUserInfo: () => set({ userInfo: null }),
}));
