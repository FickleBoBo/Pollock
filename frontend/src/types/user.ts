export type Gender = "MALE" | "FEMALE" | "OTHER";

export type Role = "GUEST" | "BASIC" | "PREMIUM" | "ADMIN";

export type Title = "GM" | "IM" | "FM" | "CM" | "NONE";

export interface UserSimpleInfo {
  nickname: string;
  profileImageUrl: string;
  bulletElo: number;
  blitzElo: number;
  classicalElo: number;
  puzzleElo: number;
  role: Role;
  title: Title;
  followingCount: number;
  followersCount: number;
}
