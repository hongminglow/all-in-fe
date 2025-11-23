import type { TUserDetails } from "~/types/user";
import { ROLES } from "./auth";

export const USER_OVERALL_INFORMATION: TUserDetails = {
  id: 1,
  username: "admin",
  email: "admin@example.com",
  phone: "1234567890",
  role: ROLES.VVIP_PLAYER,
  balance: 1000000,
};

export const USER_INITIAL_BALANCE = 1000000;
