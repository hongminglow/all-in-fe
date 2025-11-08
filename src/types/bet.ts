import type { TRoles } from "./auth";

export interface BetRoom {
  id: string;
  name: string;
  minBet: number;
  maxBet: number;
  players: number;
  maxPlayers: number;
  type: TRoles;
}
