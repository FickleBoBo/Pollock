export interface GameMode {
  gameType: number;
  timeControl: string;
  gameFormat: string;
}

export const gameModes: GameMode[] = [
  { gameType: 1, timeControl: "1 + 0", gameFormat: "Bullet" },
  { gameType: 2, timeControl: "2 + 1", gameFormat: "Bullet" },
  { gameType: 3, timeControl: "3 + 0", gameFormat: "Blitz" },
  { gameType: 4, timeControl: "3 + 2", gameFormat: "Blitz" },
  { gameType: 5, timeControl: "5 + 0", gameFormat: "Blitz" },
  { gameType: 6, timeControl: "5 + 3", gameFormat: "Blitz" },
  { gameType: 7, timeControl: "10 + 0", gameFormat: "Rapid" },
  { gameType: 8, timeControl: "10 + 5", gameFormat: "Rapid" },
  { gameType: 9, timeControl: "15 + 10", gameFormat: "Rapid" },
  { gameType: 10, timeControl: "30 + 0", gameFormat: "Classical" },
  { gameType: 11, timeControl: "30 + 20", gameFormat: "Classical" },
  { gameType: 12, timeControl: "사용자 지정", gameFormat: "" },
];
