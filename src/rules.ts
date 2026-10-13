export type Die = 1 | 2 | 3 | 4 | 5 | 6;
export type Roll = readonly [Die, Die];
export type Phase = "come-out" | "point";
export type RoundResult = "win" | "lose" | "continue";

export const STARTING_CHIPS = 100;
export const STAKE = 10;
export const WIN_CHIPS = 200;

export interface Round {
  phase: Phase;
  point: number | null;
  roll: Roll | null;
  result: RoundResult;
  note: string;
  accounted: boolean;
}

export interface Night {
  chips: number;
  roundsWon: number;
  roundsLost: number;
  status: "playing" | "won" | "broke";
  round: Round;
}

const FACES: Die[] = [1, 2, 3, 4, 5, 6];

export function dieFromUnit(unit: number): Die {
  const index = Math.min(5, Math.max(0, Math.floor(unit * 6)));
  return FACES[index];
}

export function rollDice(rng: () => number = Math.random): Roll {
  return [dieFromUnit(rng()), dieFromUnit(rng())];
}

export function total(roll: Roll): number {
  return roll[0] + roll[1];
}

export function freshRound(): Round {
  return {
    phase: "come-out",
    point: null,
    roll: null,
    result: "continue",
    note: "Come-out roll. Seven or eleven wins. Two, three or twelve loses.",
    accounted: false,
  };
}

export function startNight(): Night {
  return {
    chips: STARTING_CHIPS,
    roundsWon: 0,
    roundsLost: 0,
    status: "playing",
    round: freshRound(),
  };
}

function wonRound(roll: Roll, note: string): Round {
  return { phase: "come-out", point: null, roll, result: "win", note, accounted: false };
}

function lostRound(roll: Roll, note: string): Round {
  return { phase: "come-out", point: null, roll, result: "lose", note, accounted: false };
}

/** Resolve one pass-line roll. Chips are a score, not money that can be cashed out. */
export function applyRoll(round: Round, roll: Roll): Round {
  if (round.result !== "continue") return { ...round, roll };
  const sum = total(roll);

  if (round.phase === "come-out") {
    if (sum === 7 || sum === 11) return wonRound(roll, `Natural ${sum}. The pass line wins.`);
    if (sum === 2 || sum === 3 || sum === 12) return lostRound(roll, `Craps ${sum}. The pass line loses.`);
    return {
      phase: "point",
      point: sum,
      roll,
      result: "continue",
      note: `Point is ${sum}. Hit it again before a seven.`,
      accounted: false,
    };
  }

  if (sum === round.point) return wonRound(roll, `Point ${sum} hit. The pass line wins.`);
  if (sum === 7) return lostRound(roll, "Seven-out. The pass line loses.");
  return {
    ...round,
    roll,
    result: "continue",
    note: `Rolled ${sum}. Point is still ${round.point}.`,
  };
}

export function settle(night: Night): Night {
  if (night.round.result === "continue" || night.round.accounted || night.status !== "playing") return night;
  const delta = night.round.result === "win" ? STAKE : -STAKE;
  const chips = night.chips + delta;
  const roundsWon = night.roundsWon + (night.round.result === "win" ? 1 : 0);
  const roundsLost = night.roundsLost + (night.round.result === "lose" ? 1 : 0);
  let status: Night["status"] = "playing";
  if (chips >= WIN_CHIPS) status = "won";
  else if (chips < STAKE) status = "broke";
  return {
    chips,
    roundsWon,
    roundsLost,
    status,
    round: { ...night.round, accounted: true },
  };
}

export function nextRound(night: Night): Night {
  if (night.status !== "playing") return night;
  return { ...night, round: freshRound() };
}
