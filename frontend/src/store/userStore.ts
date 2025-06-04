import { create } from "zustand";

import { Gender, Role, Title } from "@/types/user";

export interface UserInfo {
  email: string | null;
  birthyear: number | null;
  birthmonth: number | null;
  birthday: number | null;
  gender: Gender;
  profileImageUrl: string;
  nickname: string;
  role: Role;
  title: Title;
  bulletElo: number;
  blitzElo: number;
  rapidElo: number;
  classicalElo: number;
  puzzleElo: number;
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
