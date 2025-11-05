import type { TLoginSchema } from "~/features/auth/schema/auth";
import { createJwt } from "~/utils/token";
import { ROLES } from "~/constant/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { ROUTES } from "~/constant/route";
import { useTranslation } from "react-i18next";

export const useAuth = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const authenticateUser = (data: TLoginSchema) => {
    if (data.username === "admin" && data.password === "password") {
      const token = createJwt(
        { sub: data.username, role: ROLES.VVIP_PLAYER },
        60 * 60 * 24
      );

      console.log("token granted -->", token);
      Cookies.set("token", token);
      navigate(ROUTES.HOME);
      return true;
    } else {
      return false;
    }
  };

  return { authenticateUser };
};
