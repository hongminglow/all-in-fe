import type { TBetOptions } from "~/types/bet";
import { BET_OPTIONS } from "~/constant/bet";
import { cn } from "~/utils/general";

export const BetTypeLabel = ({
  type,
  target,
}: {
  type: TBetOptions;
  target?: number | null;
}) => {
  if (!type) return null;

  return (
    <p
      className={cn("text-sm text-white font-medium", {
        "text-blue-500": type === BET_OPTIONS.SMALL,
        "text-red-500": type === BET_OPTIONS.BIG,
        "text-purple-500": type === BET_OPTIONS.ODD,
        "text-green-500": type === BET_OPTIONS.EVEN,
        "text-yellow-500": type === BET_OPTIONS.TRIPLE,
      })}
    >
      {type === BET_OPTIONS.SINGLE ? target : type.toUpperCase()}
    </p>
  );
};
