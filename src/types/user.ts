import type { TPermissions, TRoles } from "./auth";

export type TUserDetails = {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: TRoles;
  permission: Array<TPermissions>;
  balance: number;
};
