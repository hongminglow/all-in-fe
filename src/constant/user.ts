import type { TUserDetails } from "~/types/user";
import { ROLES } from "./auth";

export const USER_OVERALL_INFORMATION: TUserDetails = {
  id: 1,
  username: "admin",
  email: "admin@example.com",
  phone: "1234567890",
  role: ROLES.VVIP_PLAYER,
  permission: [
    "home:view",
    "home:join",
    "home:free-ticket",
    "bet:regular",
    "bet:double",
    "bet:special",
  ],
  balance: 1000000,
};

export const USER_INITIAL_BALANCE = 1000000;
