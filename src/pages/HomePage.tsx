import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { usePlayMusic } from "~/hooks/usePlayMusic";
import { BETTING_ROOMS } from "~/constant/bet";
import { Header } from "~/components/layout/Header";
import type { BetRoom } from "~/types/bet";
import { GameSummaryBanner } from "~/features/bet/components/GameSummaryBanner";
import { GameRoomCard } from "~/features/bet/components/GameRoomCard";

export const HomePage = () => {
  // Play lobby BGM
  usePlayMusic();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSelectRoom = (room: BetRoom) => {
    navigate(`/bet/${room.gameType}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Banner - Moved to Top */}
        <GameSummaryBanner />

        <div className="mb-8">
          <h2 className="text-white mb-2">{t("home.chooseRoom")}</h2>
          <p className="text-purple-300">{t("home.selectRoom")}</p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BETTING_ROOMS.map((room) => (
            <GameRoomCard key={room.id} room={room} onJoin={handleSelectRoom} />
          ))}
        </div>
      </main>
    </div>
  );
};
