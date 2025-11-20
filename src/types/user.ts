import type { TPermissions, TRoles } from "./auth";

export type TUserDetails = {
  username: string;
  email: string;
  roles: TRoles;
  permissions: TPermissions[];
};
