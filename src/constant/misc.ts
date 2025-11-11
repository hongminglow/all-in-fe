import { numbersToRange } from "~/utils/format";
import { BET_OPTIONS } from "./bet";
import type { TQuickBetDetails } from "~/types/bet";

export const LANGUAGES = {
  ENGLISH: "en",
  CHINESE: "zh",
} as const;

export const GAME_SUMMARY_CONFIG = {
  activePlayers: 1280,
  wonToday: 2400000,
  gamesPlayed: 15678,
};

export const GAME_ROUND_CONFIG = {
  countdown: 60,
  [BET_OPTIONS.SMALL]: [4, 5, 6, 7, 8, 9, 10],
  [BET_OPTIONS.BIG]: [11, 12, 13, 14, 15, 16, 17],
  [BET_OPTIONS.ODD]: [3, 5, 7, 9, 11, 13, 15, 17],
  [BET_OPTIONS.EVEN]: [4, 6, 8, 10, 12, 14, 16],
  [BET_OPTIONS.TRIPLE]: [
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ],
};

export const QUICK_BET_OPTIONS_CONFIG: Array<TQuickBetDetails> = [
  {
    type: BET_OPTIONS.SMALL,
    label: "SMALL",
    target: null,
    odds: 1.9,
    range: numbersToRange(GAME_ROUND_CONFIG[BET_OPTIONS.SMALL]),
  },
  {
    type: BET_OPTIONS.BIG,
    label: "BIG",
    target: null,
    odds: 2.0,
    range: numbersToRange(GAME_ROUND_CONFIG[BET_OPTIONS.BIG]),
  },
  {
    type: BET_OPTIONS.ODD,
    target: null,
    label: "ODD",
    odds: 3.5,
    range: numbersToRange(GAME_ROUND_CONFIG[BET_OPTIONS.ODD]),
  },
  {
    type: BET_OPTIONS.EVEN,
    label: "EVEN",
    target: null,
    odds: 1.2,
    range: numbersToRange(GAME_ROUND_CONFIG[BET_OPTIONS.EVEN]),
  },
  {
    type: BET_OPTIONS.TRIPLE,
    label: "TRIPLE",
    target: null,
    odds: 5.0,
    range: numbersToRange(GAME_ROUND_CONFIG[BET_OPTIONS.TRIPLE]),
  },
];

export const DICE_ROLL_OUTCOME_CONFIG: Array<TQuickBetDetails> = [
  {
    type: BET_OPTIONS.SINGLE,
    label: "3",
    target: 3,
    odds: 1.9,
    range: "3",
  },
  {
    type: BET_OPTIONS.SINGLE,
    label: "4",
    target: 4,
    odds: 1.9,
    range: "4",
  },
  {
    type: BET_OPTIONS.SINGLE,
    label: "5",
    target: 5,
    odds: 1.9,
    range: "5",
  },
  {
    type: BET_OPTIONS.SINGLE,
    label: "6",
    target: 6,
    odds: 1.9,
    range: "6",
  },
  {
    type: BET_OPTIONS.SINGLE,
    label: "7",
    target: 7,
    odds: 1.9,
    range: "7",
  },
  {
    type: BET_OPTIONS.SINGLE,
    label: "8",
    target: 8,
    odds: 1.9,
    range: "8",
  },
  {
    type: BET_OPTIONS.SINGLE,
    label: "9",
    target: 9,
    odds: 1.9,
    range: "9",
  },
  {
    type: BET_OPTIONS.SINGLE,
    label: "10",
    target: 10,
    odds: 1.9,
    range: "10",
  },
  {
    type: BET_OPTIONS.SINGLE,
    label: "11",
    target: 11,
    odds: 1.9,
    range: "11",
  },
  {
    type: BET_OPTIONS.SINGLE,
    label: "12",
    target: 12,
    odds: 1.9,
    range: "12",
  },
  {
    type: BET_OPTIONS.SINGLE,
    label: "13",
    target: 13,
    odds: 1.9,
    range: "13",
  },
  {
    type: BET_OPTIONS.SINGLE,
    label: "14",
    target: 14,
    odds: 1.9,
    range: "14",
  },
  {
    type: BET_OPTIONS.SINGLE,
    label: "15",
    target: 15,
    odds: 1.9,
    range: "15",
  },
  {
    type: BET_OPTIONS.SINGLE,
    label: "16",
    target: 16,
    odds: 1.9,
    range: "16",
  },
  {
    type: BET_OPTIONS.SINGLE,
    label: "17",
    target: 17,
    odds: 1.9,
    range: "17",
  },
  {
    type: BET_OPTIONS.SINGLE,
    label: "18",
    target: 18,
    odds: 1.9,
    range: "18",
  },
];
