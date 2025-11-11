import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  DICE_ROLL_OUTCOME_CONFIG,
  QUICK_BET_OPTIONS_CONFIG,
} from "~/constant/misc";
import { useGameContext } from "~/features/bet/context/GameContext";
import {
  BET_OPTIONS,
  BET_REDUCER_ACTIONS,
  GAME_PHASE,
  GAME_PREFIX_QUICK_BET,
} from "~/constant/bet";
import { cn } from "~/utils/general";
import type { TQuickBetDetails } from "~/types/bet";
import { useBetContext } from "~/features/bet/context/BetContext";
import { Input } from "~/components/ui/input";

export const BetController = () => {
  const { state: gameState } = useGameContext();
  const { state: betState, dispatch: betDispatch } = useBetContext();

  const isDisabledBet = gameState.gamePhase !== GAME_PHASE.START;

  const placeBet = (betDetails: TQuickBetDetails) => {
    betDispatch({
      type: BET_REDUCER_ACTIONS.APPEND_STAKE,
      payload: {
        stake: {
          ...betDetails,
          id: crypto.randomUUID(),
          subtotal: betState.betAmount,
        },
      },
    });
  };

  return (
    <Card className="border-white/10 bg-white/5 p-6 backdrop-blur-lg">
      <h3 className="mb-4 text-white">Quick Bets</h3>
      <div className="mb-4 grid grid-cols-5 gap-2">
        {QUICK_BET_OPTIONS_CONFIG.map((betOption) => (
          <Button
            key={betOption.type}
            disabled={isDisabledBet}
            onClick={() => placeBet(betOption)}
            className={cn(
              "flex h-16 flex-col items-center justify-center p-2 text-white",
              {
                "bg-blue-600 hover:bg-blue-700":
                  betOption.type === BET_OPTIONS.SMALL,
                "bg-red-600 hover:bg-red-700":
                  betOption.type === BET_OPTIONS.BIG,
                "bg-purple-600 hover:bg-purple-700":
                  betOption.type === BET_OPTIONS.ODD,
                "bg-green-600 hover:bg-green-700":
                  betOption.type === BET_OPTIONS.EVEN,
                "bg-yellow-600 hover:bg-yellow-700":
                  betOption.type === BET_OPTIONS.TRIPLE,
              }
            )}
          >
            <div>{betOption.label}</div>
            <div className="text-xs opacity-80 items-center">
              {betOption.odds} x
            </div>
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="mb-4 text-white">Bet Amount</h3>
          <Input
            type="number"
            value={betState.betAmount}
            onChange={(e) => {
              betDispatch({
                type: BET_REDUCER_ACTIONS.CHANGE_BET_AMOUNT,
                payload: Number(e.target.value),
              });
            }}
            disabled={isDisabledBet}
            onWheel={(e) => e.currentTarget.blur()}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault();
              }
            }}
            className="mt-2 border-white/20 bg-white/10 text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min={1}
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {GAME_PREFIX_QUICK_BET.map((amount) => (
            <Button
              key={`preset-${amount}`}
              disabled={isDisabledBet}
              onClick={() => {
                betDispatch({
                  type: BET_REDUCER_ACTIONS.CHANGE_BET_AMOUNT,
                  payload: amount,
                });
              }}
              className="bg-purple-600/30 text-white hover:bg-purple-600/50"
            >
              ${amount}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            disabled={isDisabledBet}
            onClick={() =>
              betDispatch({ type: BET_REDUCER_ACTIONS.INCREMENT_BET_AMOUNT })
            }
            className="bg-green-600/60 text-white hover:bg-green-600"
          >
            +10
          </Button>
          <Button
            disabled={isDisabledBet}
            onClick={() =>
              betDispatch({ type: BET_REDUCER_ACTIONS.DECREMENT_BET_AMOUNT })
            }
            className="bg-red-600/60 text-white hover:bg-red-600"
          >
            -10
          </Button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {DICE_ROLL_OUTCOME_CONFIG.map((outcome) => (
          <Button
            key={outcome.target}
            onClick={() => placeBet(outcome)}
            disabled={isDisabledBet}
            className="flex h-14 flex-col items-center justify-center bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <div>{outcome.label}</div>
            <div className="text-xs opacity-80">{outcome.odds} x</div>
          </Button>
        ))}
      </div>
    </Card>
  );
};
