/**
 * Dice utilities — roll three 6-sided dice and produce results in the range 3..18.
 */

/** Return a random integer between 1 and 6 (inclusive) */
function rollOneDie(): number {
  return Math.floor(Math.random() * 6) + 1;
}

export type ThreeDiceResult = {
  dice: [number, number, number];
  total: number; // sum of the three dice, range 3..18
};

/**
 * Roll three fair six-sided dice and return the individual dice and total.
 * Example: { dice: [2,5,1], total: 8 }
 */
export function rollThreeDice(): ThreeDiceResult {
  const a = rollOneDie();
  const b = rollOneDie();
  const c = rollOneDie();
  const dice: [number, number, number] = [a, b, c];
  return { dice, total: a + b + c };
}
