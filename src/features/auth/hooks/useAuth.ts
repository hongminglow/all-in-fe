import type { TLoginSchema } from "~/features/auth/schema/auth";
import { createJwt } from "~/utils/token";
import { ROLES } from "~/constant/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { ROUTES } from "~/constant/route";
import { useUserStore } from "~/store/useUserStore";
import {
  USER_INITIAL_BALANCE,
  USER_OVERALL_INFORMATION,
} from "~/constant/user";

export const useAuth = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((store) => store.actions.setUser);
  const setBalance = useUserStore((store) => store.actions.setBalance);

  const authenticateUser = (data: TLoginSchema) => {
    if (data.username === "admin" && data.password === "password") {
      const token = createJwt(
        { sub: data.username, role: ROLES.VVIP_PLAYER },
        60 * 60 * 24
      );

      console.log("token granted -->", token);
      Cookies.set("token", token);
      setUser(USER_OVERALL_INFORMATION);
      setBalance(USER_INITIAL_BALANCE);
      navigate(ROUTES.HOME);
      return true;
    } else {
      return false;
    }
  };

  return { authenticateUser };
};
