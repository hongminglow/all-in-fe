import { ROLES } from "~/constant/auth";
import type { TRoles } from "~/types/auth";

export const verifyPermissionAccess = (
  role: TRoles,
  currentRole: TRoles | null
) => {
  if (!role || !currentRole) return false;

  if (currentRole === ROLES.VVIP_PLAYER) return true;

  if (role === ROLES.VVIP_PLAYER) return false;

  if (role === ROLES.VIP_PLAYER) return currentRole === ROLES.VIP_PLAYER;

  return true;
};
