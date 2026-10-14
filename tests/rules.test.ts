import { describe, expect, it } from "vitest";
import {
  STAKE,
  STARTING_CHIPS,
  WIN_CHIPS,
  applyRoll,
  dieFromUnit,
  freshRound,
  nextRound,
  rollDice,
  settle,
  startNight,
  total,
} from "../src/rules.js";

describe("shootin dice pass line", () => {
  it("scores a pair of dice from 2 to 12", () => {
    expect(total([1, 1])).toBe(2);
    expect(total([6, 6])).toBe(12);
    expect(total([4, 3])).toBe(7);
  });

  it("maps a unit interval onto faces 1 to 6", () => {
    expect(dieFromUnit(0)).toBe(1);
    expect(dieFromUnit(0.999)).toBe(6);
    expect(dieFromUnit(0.5)).toBe(4);
  });

  it("uses the injected random source for both dice", () => {
    const values = [0, 0.99];
    const roll = rollDice(() => values.shift() ?? 0);
    expect(roll).toEqual([1, 6]);
  });

  it("wins the come-out on a natural seven", () => {
    const round = applyRoll(freshRound(), [3, 4]);
    expect(round.result).toBe("win");
    expect(round.point).toBeNull();
  });

  it("wins the come-out on eleven", () => {
    expect(applyRoll(freshRound(), [5, 6]).result).toBe("win");
  });

  it("loses the come-out on two, three and twelve", () => {
    expect(applyRoll(freshRound(), [1, 1]).result).toBe("lose");
    expect(applyRoll(freshRound(), [1, 2]).result).toBe("lose");
    expect(applyRoll(freshRound(), [6, 6]).result).toBe("lose");
  });

  it("sets the point on 4, 5, 6, 8, 9 and 10", () => {
    for (const roll of [[1, 3], [2, 3], [1, 5], [3, 5], [4, 5], [4, 6]] as const) {
      const round = applyRoll(freshRound(), roll);
      expect(round.result).toBe("continue");
      expect(round.phase).toBe("point");
      expect(round.point).toBe(roll[0] + roll[1]);
    }
  });

  it("wins when the point is thrown again", () => {
    const pointed = applyRoll(freshRound(), [3, 3]);
    const hit = applyRoll(pointed, [4, 2]);
    expect(hit.result).toBe("win");
    expect(hit.note).toMatch(/Point 6/);
  });

  it("loses on seven-out after a point", () => {
    const pointed = applyRoll(freshRound(), [2, 2]);
    const out = applyRoll(pointed, [1, 6]);
    expect(out.result).toBe("lose");
    expect(out.note).toMatch(/Seven-out/);
  });

  it("keeps the point when the roll is neither the point nor seven", () => {
    const pointed = applyRoll(freshRound(), [4, 5]);
    const next = applyRoll(pointed, [2, 3]);
    expect(next.result).toBe("continue");
    expect(next.phase).toBe("point");
    expect(next.point).toBe(9);
  });

  it("does not change a round that is already settled", () => {
    const won = applyRoll(freshRound(), [6, 5]);
    const again = applyRoll(won, [1, 1]);
    expect(again.result).toBe("win");
    expect(again.roll).toEqual([1, 1]);
  });

  it("pays the stake from the chip score on a win", () => {
    const night = startNight();
    night.round = applyRoll(freshRound(), [2, 5]);
    const settled = settle(night);
    expect(settled.chips).toBe(STARTING_CHIPS + STAKE);
    expect(settled.roundsWon).toBe(1);
    expect(settled.status).toBe("playing");
  });

  it("deducts the stake on a loss", () => {
    const night = startNight();
    night.round = applyRoll(freshRound(), [1, 1]);
    const settled = settle(night);
    expect(settled.chips).toBe(STARTING_CHIPS - STAKE);
    expect(settled.roundsLost).toBe(1);
  });

  it("marks the night won at the chip target", () => {
    const night = startNight();
    night.chips = WIN_CHIPS - STAKE;
    night.round = applyRoll(freshRound(), [3, 4]);
    expect(settle(night).status).toBe("won");
  });

  it("marks the night broke when the stake no longer fits", () => {
    const night = startNight();
    night.chips = STAKE;
    night.round = applyRoll(freshRound(), [6, 6]);
    const settled = settle(night);
    expect(settled.chips).toBe(0);
    expect(settled.status).toBe("broke");
  });

  it("opens a fresh come-out after a settled round", () => {
    const night = startNight();
    night.round = applyRoll(freshRound(), [5, 6]);
    const settled = settle(night);
    const next = nextRound(settled);
    expect(next.round.phase).toBe("come-out");
    expect(next.round.result).toBe("continue");
    expect(next.chips).toBe(settled.chips);
  });

  it("does not start another round after the night is over", () => {
    const night = startNight();
    night.chips = WIN_CHIPS;
    night.status = "won";
    night.round = applyRoll(freshRound(), [1, 1]);
    expect(nextRound(night).round.result).toBe("lose");
  });

  it("does not settle twice", () => {
    const night = startNight();
    night.round = applyRoll(freshRound(), [6, 1]);
    const once = settle(night);
    const twice = settle(once);
    expect(twice.chips).toBe(once.chips);
    expect(twice.roundsWon).toBe(1);
  });

  it("ignores settle while the point is still live", () => {
    const night = startNight();
    night.round = applyRoll(freshRound(), [2, 2]);
    expect(settle(night).chips).toBe(STARTING_CHIPS);
  });
});
