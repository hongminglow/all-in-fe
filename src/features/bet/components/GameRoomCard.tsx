import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { ROLES } from "~/constant/auth";
import { cn } from "~/utils/general";
import { verifyPermissionAccess } from "~/utils/permission";
import { Users, Crown, Zap } from "lucide-react";
import type { BetRoom } from "~/types/bet";
import { useTranslation } from "react-i18next";
import { useUserStore } from "~/store/useUserStore";
import type { TRoles } from "~/types/auth";

type TGameRoomCardProps = {
  room: BetRoom;
  onJoin: (room: BetRoom) => void;
};

const getRoomIcon = (type: TRoles) => {
  switch (type) {
    case ROLES.REGULAR_PLAYER:
      return <Users className="w-5 h-5" />;
    case ROLES.VIP_PLAYER:
      return <Zap className="w-5 h-5" />;
    case ROLES.VVIP_PLAYER:
      return <Crown className="w-5 h-5" />;
    default:
      return <Users className="w-5 h-5" />;
  }
};

export const GameRoomCard = ({ room, onJoin }: TGameRoomCardProps) => {
  const { t } = useTranslation();
  const user = useUserStore((store) => store.user);

  return (
    <Card className="bg-white/5 backdrop-blur-lg border border-white/10 transition-all duration-300 overflow-hidden group">
      {/* Room Header with Gradient */}
      <div
        className={cn(" p-4 flex items-center justify-between bg-linear-to-r", {
          "from-yellow-600 to-orange-600":
            room.permission === ROLES.REGULAR_PLAYER,
          "from-cyan-600 to-blue-600": room.permission === ROLES.VIP_PLAYER,
          "from-purple-600 to-indigo-600":
            room.permission === ROLES.VVIP_PLAYER,
        })}
      >
        <div className="flex items-center gap-2 text-white">
          {getRoomIcon(room.permission)}
          <span>{room.name}</span>
        </div>
        {room.permission === ROLES.VIP_PLAYER && (
          <Badge className="bg-cyan-400 text-white">VIP</Badge>
        )}
        {room.permission === ROLES.VVIP_PLAYER && (
          <Badge className="bg-purple-500 text-white">VVIP</Badge>
        )}
      </div>

      {/* Room Details */}
      <div className="p-6">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-purple-200">
            <span>Min Bet:</span>
            <span className="text-yellow-400">${room.minBet}</span>
          </div>
          <div className="flex justify-between text-purple-200">
            <span>Max Bet:</span>
            <span className="text-yellow-400">${room.maxBet}</span>
          </div>
          <div className="flex justify-between text-purple-200">
            <span>Players:</span>
            <span className="text-green-400">
              {room.players}/{room.maxPlayers}
            </span>
          </div>
        </div>

        {/* Player Count Bar */}
        <div className="mb-4">
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-linear-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${(room.players / room.maxPlayers) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <Button
          className="w-full bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 hover:cursor-pointer text-white"
          onClick={() => onJoin(room)}
          disabled={
            !verifyPermissionAccess(room.permission, user?.role ?? null)
          }
        >
          {t("home.joinRoom")}
        </Button>
      </div>
    </Card>
  );
};
