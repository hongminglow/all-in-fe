import { useState } from "react";
import { History, TrendingUp } from "lucide-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { GameProvider } from "~/features/bet/context/GameContext";
import { CountDownBanner } from "~/features/bet/components/CountDownBanner";
import { DiceRoller } from "~/features/bet/components/DiceRoller";
import { BetController } from "../features/bet/components/BetController";
import { BetProvider } from "../features/bet/context/BetContext";

interface Bet {
  type: string;
  amount: number;
  label: string;
}

interface GameResult {
  dice: [number, number, number];
  total: number;
  timestamp: number;
  result: "win" | "lose";
  payout: number;
}

type GamePhase = "betting" | "rolling" | "result";

export const BetPage = () => {
  //   const [dice, setDice] = useState<[number, number, number]>([1, 2, 3]);
  const [gamePhase, setGamePhase] = useState<GamePhase>("betting");
  const [bets, setBets] = useState<Bet[]>([]);
  const [betAmount, setBetAmount] = useState(10);
  const [history, setHistory] = useState<GameResult[]>([]);

  const handleAutoRoll = () => {
    if (bets.length === 0) {
      toast.info("No bets placed. Starting new round...");
      setTimeout(() => {
        // setTimeLeft(60);
        setGamePhase("betting");
      }, 2000);
      return;
    }

    const totalBetAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);
    // setBalance((prev) => prev - totalBetAmount);
    setGamePhase("rolling");

    const rollInterval = setInterval(() => {
      //   setDice([
      //     Math.floor(Math.random() * 6) + 1,
      //     Math.floor(Math.random() * 6) + 1,
      //     Math.floor(Math.random() * 6) + 1,
      //   ] as [number, number, number]);
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);

      const finalDice: [number, number, number] = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];
      //   setDice(finalDice);

      const total = finalDice.reduce((sum, die) => sum + die, 0);
      let totalWinnings = 0;

      bets.forEach((bet) => {
        const payout = calculatePayout(bet, finalDice, total);
        totalWinnings += payout;
      });

      if (totalWinnings > 0) {
        // setBalance((prev) => prev + totalWinnings);
        toast.success(`You won $${totalWinnings}!`);
      } else {
        toast.error("Better luck next time!");
      }

      setHistory((prev) => [
        {
          dice: finalDice,
          total,
          timestamp: Date.now(),
          result: totalWinnings > 0 ? "win" : "lose",
          payout: totalWinnings - totalBetAmount,
        },
        ...prev.slice(0, 9),
      ]);

      setGamePhase("result");

      setTimeout(() => {
        setBets([]);
        // setTimeLeft(60);
        setGamePhase("betting");
      }, 3000);
    }, 2000);
  };

  const calculatePayout = (
    bet: Bet,
    currentDice: [number, number, number],
    total: number
  ): number => {
    if (bet.type.startsWith("total-")) {
      const targetTotal = parseInt(bet.type.split("-")[1], 10);

      if (total === targetTotal) {
        const multiplier =
          targetTotal === 3 || targetTotal === 18
            ? 50
            : targetTotal <= 5 || targetTotal >= 16
            ? 20
            : 10;
        return bet.amount * multiplier;
      }
    }

    if (bet.type === "small" && total >= 4 && total <= 10) {
      return bet.amount * 2;
    }

    if (bet.type === "big" && total >= 11 && total <= 17) {
      return bet.amount * 2;
    }

    if (bet.type === "odd" && total % 2 === 1) {
      return bet.amount * 2;
    }

    if (bet.type === "even" && total % 2 === 0) {
      return bet.amount * 2;
    }

    if (bet.type.startsWith("single-")) {
      const num = parseInt(bet.type.split("-")[1], 10);
      const count = currentDice.filter((value) => value === num).length;
      if (count > 0) {
        return bet.amount * (count + 1);
      }
    }

    if (
      bet.type === "triple" &&
      currentDice[0] === currentDice[1] &&
      currentDice[1] === currentDice[2]
    ) {
      return bet.amount * 30;
    }

    return 0;
  };

  const placeBet = (type: string, label: string) => {
    if (gamePhase !== "betting") {
      toast.error("Betting is closed!");
      return;
    }

    if (betAmount <= 0) {
      toast.error("Invalid bet amount!");
      return;
    }

    setBets((prev) => {
      const existing = prev.find((bet) => bet.type === type);

      if (existing) {
        return prev.map((bet) =>
          bet.type === type
            ? {
                ...bet,
                amount: bet.amount + betAmount,
              }
            : bet
        );
      }

      return [
        ...prev,
        {
          type,
          amount: betAmount,
          label,
        },
      ];
    });

    toast.success(`Bet placed: $${betAmount} on ${label}`);
  };

  const clearBets = () => {
    if (gamePhase !== "betting") {
      toast.error("Cannot clear bets now!");
      return;
    }

    setBets([]);
    toast.info("All bets cleared");
  };

  return (
    <GameProvider>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-3">
        <BetProvider>
          <div className="space-y-6 lg:col-span-2">
            <CountDownBanner />

            <DiceRoller />

            <BetController />
          </div>

          <div className="space-y-6">
            {bets.length > 0 ? (
              <Card className="border-white/20 bg-white/10 p-6 backdrop-blur-lg">
                <div className="rounded-lg bg-white/5 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-purple-200">Your Bets:</p>
                    <Button
                      onClick={clearBets}
                      disabled={gamePhase !== "betting"}
                      className="h-8 text-xs text-white hover:bg-red-700"
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {bets.map((bet) => (
                      <div
                        key={bet.type}
                        className="flex justify-between text-white"
                      >
                        <span>{bet.label}</span>
                        <span className="text-yellow-400">${bet.amount}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/20 pt-2 text-white">
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span className="text-yellow-400">
                          ${bets.reduce((sum, bet) => sum + bet.amount, 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : null}

            <Card className="border-white/20 bg-white/10 p-6 backdrop-blur-lg">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white">Recent Results</h3>
                  <p className="text-sm text-purple-200">
                    Track your performance
                  </p>
                </div>
                <History className="h-5 w-5 text-purple-200" />
              </div>

              <div className="space-y-4">
                {history.length === 0 ? (
                  <p className="text-sm text-purple-200">
                    No game history yet. Place a bet to get started!
                  </p>
                ) : (
                  history.map((game, index) => (
                    <div
                      key={game.timestamp}
                      className="rounded-lg border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center justify-between text-white">
                        <span>Round {history.length - index}</span>
                        <span
                          className={
                            game.result === "win"
                              ? "text-green-400"
                              : "text-red-400"
                          }
                        >
                          {game.result === "win" ? "+" : ""}${game.payout}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm text-purple-200">
                        <span>Dice: {game.dice.join("-")}</span>
                        <span>Total: {game.total}</span>
                      </div>
                      <div className="mt-2 text-xs text-purple-300">
                        {new Date(game.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card className="border-white/20 bg-white/10 p-6 backdrop-blur-lg">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white">Performance Stats</h3>
                  <p className="text-sm text-purple-200">
                    Keep track of your game
                  </p>
                </div>
                <TrendingUp className="h-5 w-5 text-purple-200" />
              </div>

              <div className="space-y-3 text-sm text-purple-200">
                <div className="flex justify-between">
                  <span>Total Rounds Played</span>
                  <span>{history.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Win Rate</span>
                  <span>
                    {history.length === 0
                      ? "0%"
                      : `${Math.round(
                          (history.filter((game) => game.result === "win")
                            .length /
                            history.length) *
                            100
                        )}%`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Best Payout</span>
                  <span>
                    {history.length === 0
                      ? "$0"
                      : `$${Math.max(...history.map((game) => game.payout))}`}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </BetProvider>
      </div>
    </GameProvider>
  );
};
