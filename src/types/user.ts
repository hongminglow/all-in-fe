import type { TRoles } from "./auth";

export type TUserDetails = {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: TRoles;
  balance: number;
};
