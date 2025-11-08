import type { BET_ROOM_TYPES } from "~/constant/bet";
import type { TRoles } from "./auth";

export interface BetRoom {
  id: string;
  name: string;
  minBet: number;
  maxBet: number;
  players: number;
  maxPlayers: number;
  gameType: TBetRoomTypes;
  permission: TRoles;
}

export type TBetRoomTypes =
  (typeof BET_ROOM_TYPES)[keyof typeof BET_ROOM_TYPES];
