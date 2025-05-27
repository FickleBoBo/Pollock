import { create } from "zustand";

import { Gender, Role, Title } from "../types/user";

export interface UserInfo {
  email: string;
  nickname: string;
  profileImageUrl: string;
  bulletElo: number;
  blitzElo: number;
  classicalElo: number;
  puzzleElo: number;
  birthyear: string | null;
  gender: Gender;
  role: Role;
  title: Title;
  createdAt: string;
  followingCount: number;
  followersCount: number;
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
