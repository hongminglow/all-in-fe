import { useTranslation } from "react-i18next";
import { formatCompactNumber, formatCurrency } from "~/utils/format";
import { GAME_SUMMARY_CONFIG } from "~/constant/misc";

export const GameSummaryBanner = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-linear-to-br from-yellow-600/40 to-orange-600/40 backdrop-blur-lg border-2 border-yellow-500/50 rounded-xl p-8 text-center shadow-2xl">
        <div className="text-5xl text-yellow-300 mb-3">
          {formatCurrency(GAME_SUMMARY_CONFIG.activePlayers)}
        </div>
        <div className="text-yellow-100">{t("home.activePlayers")}</div>
      </div>
      <div className="bg-linear-to-br from-green-600/40 to-emerald-600/40 backdrop-blur-lg border-2 border-green-500/50 rounded-xl p-8 text-center shadow-2xl">
        <div className="text-5xl text-green-300 mb-3">
          ${formatCompactNumber(GAME_SUMMARY_CONFIG.wonToday)}
        </div>
        <div className="text-green-100">{t("home.wonToday")}</div>
      </div>
      <div className="bg-linear-to-br from-cyan-600/40 to-blue-600/40 backdrop-blur-lg border-2 border-cyan-500/50 rounded-xl p-8 text-center shadow-2xl">
        <div className="text-5xl text-cyan-300 mb-3">
          {formatCurrency(GAME_SUMMARY_CONFIG.gamesPlayed)}
        </div>
        <div className="text-cyan-100">{t("home.gamesPlayed")}</div>
      </div>
    </div>
  );
};
