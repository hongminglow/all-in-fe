import { useBetContext } from "~/features/bet/context/BetContext";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { BET_OPTIONS, BET_REDUCER_ACTIONS, GAME_PHASE } from "~/constant/bet";
import { useGameContext } from "~/features/bet/context/GameContext";

export const CurrentAccumulatedBets = () => {
  const { state: gameState } = useGameContext();
  const { state, dispatch } = useBetContext();

  const isDisabledBet = gameState.gamePhase !== GAME_PHASE.START;

  const clearBets = () => {
    dispatch({ type: BET_REDUCER_ACTIONS.CLEAR_STAKE });
  };

  if (!state.accumulatedBet.length) return null;

  return (
    <Card className="border-white/20 bg-white/10 p-6 backdrop-blur-lg">
      <div className="rounded-lg bg-white/5 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-purple-200">Your Bets:</p>
          <Button
            onClick={clearBets}
            disabled={isDisabledBet}
            className="h-8 text-xs text-white hover:bg-red-700"
          >
            Clear All
          </Button>
        </div>
        <div className="space-y-2">
          {state.accumulatedBet.map((bet) => (
            <div key={bet.id} className="flex justify-between text-white">
              <span>
                {bet.type === BET_OPTIONS.SINGLE
                  ? bet.target
                  : bet.type.toUpperCase()}
              </span>
              <span className="text-yellow-400">${bet.subtotal}</span>
            </div>
          ))}
          <div className="border-t border-white/20 pt-2 text-white">
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="text-yellow-400">
                $
                {state.accumulatedBet.reduce(
                  (sum, bet) => sum + bet.subtotal,
                  0
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
