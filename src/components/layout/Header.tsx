import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { LogOut, Wallet } from "lucide-react";
import { ROUTES } from "~/constant/route";
import { useNavigate } from "react-router";
import { formatCurrency } from "../../utils/format";
import { useUserStore } from "../../store/useUserStore";
import { useShallow } from "zustand/react/shallow";

export const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const resetStore = useUserStore((store) => store.actions.reset);

  const { user, balance } = useUserStore(
    useShallow((store) => ({
      user: store.user,
      balance: store.balance,
    }))
  );

  const handleLogout = () => {
    Cookies.remove("token");
    resetStore();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-linear-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🎲</span>
          </div>
          <div>
            <h1 className="text-white">{t("common.appName")}</h1>
            <p className="text-purple-300">
              Welcome, {user?.username.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
            <Wallet className="w-5 h-5 text-yellow-400" />
            <span className="text-white">${formatCurrency(balance)}</span>
          </div>
          {/* <Button
              onClick={navigateTestLab}
              className="bg-amber-600 hover:bg-amber-500 text-white border-0"
            >
              {t("common.lab")}
            </Button> */}
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white border-0"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t("login.logout")}
          </Button>
        </div>
      </div>
    </header>
  );
};
