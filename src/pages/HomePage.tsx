import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { BETTING_ROOMS } from "~/constant/bet";
import type { BetRoom } from "~/types/bet";
import { GameSummaryBanner } from "~/features/bet/components/GameSummaryBanner";
import { GameRoomCard } from "~/features/bet/components/GameRoomCard";

export const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSelectRoom = (room: BetRoom) => {
    navigate(`/bet/${room.gameType}/${room.id}`, {
      state: {
        roomName: room.name,
      },
    });
  };

  return (
    <div>
      {/* Game Summary Banner */}
      <GameSummaryBanner />

      <div className="mb-8">
        <h2 className="text-white mb-2">{t("home.chooseRoom")}</h2>
        <p className="text-purple-300">{t("home.selectRoom")}</p>
      </div>

      {/* Game Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BETTING_ROOMS.map((room) => (
          <GameRoomCard key={room.id} room={room} onJoin={handleSelectRoom} />
        ))}
      </div>
    </div>
  );
};
