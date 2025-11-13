import { motion } from "motion/react";

import { Card } from "~/components/ui/card";
import { useGameContext } from "~/features/bet/context/GameContext";
import { GAME_PHASE } from "~/constant/bet";

const pipCoordinates = [
  { cx: 25, cy: 25 }, // top-left
  { cx: 25, cy: 50 }, // mid-left
  { cx: 25, cy: 75 }, // bottom-left
  { cx: 50, cy: 50 }, // center
  { cx: 75, cy: 25 }, // top-right
  { cx: 75, cy: 50 }, // mid-right
  { cx: 75, cy: 75 }, // bottom-right
];

const pipLayout: Record<number, number[]> = {
  1: [3],
  2: [0, 6],
  3: [0, 3, 6],
  4: [0, 2, 4, 6],
  5: [0, 2, 3, 4, 6],
  6: [0, 1, 2, 4, 5, 6],
};

type DiceFaceProps = {
  value: number;
  isRolling: boolean;
};

const DiceFace = ({ value, isRolling }: DiceFaceProps) => {
  const variant = pipLayout[value] ?? pipLayout[1];

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="h-24 w-24 rounded-2xl shadow-2xl"
      animate={
        isRolling
          ? {
              rotate: [0, 90, 180, 270, 360],
            }
          : { rotate: 0 }
      }
      transition={{
        duration: 0.6,
        ease: "linear",
        repeat: isRolling ? Infinity : 0,
      }}
    >
      <rect
        x={5}
        y={5}
        width={90}
        height={90}
        rx={16}
        ry={16}
        fill="#f9fafb"
        stroke="#1f2937"
        strokeWidth={5}
      />
      {variant.map((idx) => {
        const { cx, cy } = pipCoordinates[idx];
        return (
          <circle
            key={`${value}-${idx}`}
            cx={cx}
            cy={cy}
            r={8}
            fill="#111827"
          />
        );
      })}
    </motion.svg>
  );
};

export const DiceRoller = () => {
  const { state } = useGameContext();
  const diceResult = state.result;
  const isRolling = state.gamePhase === GAME_PHASE.ROLLING;
  const total = diceResult.reduce((sum, value) => sum + value, 0);

  return (
    <Card className="border-white/20 bg-indigo-900/50 p-8 backdrop-blur-lg">
      <div className="mb-6 text-center">
        <h1 className="text-white text-5xl font-bold">{total}</h1>
        <h3 className="mb-2 text-white">Dice Results</h3>
        {isRolling && (
          <p className="text-sm text-purple-200">Rolling dice&hellip;</p>
        )}
      </div>

      <div className="mb-8 flex items-center justify-center gap-6">
        {diceResult.map((value, index) => (
          <DiceFace key={`dice-${index}`} value={value} isRolling={isRolling} />
        ))}
      </div>
    </Card>
  );
};
