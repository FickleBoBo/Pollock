export type Gender = "MALE" | "FEMALE" | "OTHER";

export type Role = "GUEST" | "BASIC" | "PREMIUM" | "ADMIN";

export type Title = "GM" | "IM" | "FM" | "CM" | "NONE";

export interface UserSimpleInfo {
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
  followingCount: number | null;
  followersCount: number | null;
}
