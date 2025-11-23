import type { TLoginSchema } from "~/features/auth/schema/auth";
import { createJwt } from "~/utils/token";
import { ROLES } from "~/constant/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { ROUTES } from "~/constant/route";
import { useUserStore } from "~/store/useUserStore";
import { USER_OVERALL_INFORMATION } from "~/constant/user";
import type { TAuthenticateUserResponse } from "~/services/auth/mutations/authenticateUser";

export const useAuth = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((store) => store.actions.setUser);

  const authenticateUser = (data: TLoginSchema) => {
    if (data.username === "admin" && data.password === "password") {
      const token = createJwt(
        { sub: data.username, role: ROLES.VVIP_PLAYER },
        60 * 60 * 24
      );

      console.log("token granted -->", token);
      Cookies.set("token", token);
      setUser(USER_OVERALL_INFORMATION);
      navigate(ROUTES.HOME);
      return true;
    } else {
      return false;
    }
  };

  const grantUserCredentials = (data: TAuthenticateUserResponse) => {
    if (data.token) {
      Cookies.set("token", data.token);
      setUser(data.user);
      navigate(ROUTES.HOME);
    }
  };

  return { authenticateUser, grantUserCredentials };
};
