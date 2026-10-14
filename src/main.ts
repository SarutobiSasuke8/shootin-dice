import "./style.css";
import {
  STAKE,
  WIN_CHIPS,
  applyRoll,
  nextRound,
  rollDice,
  settle,
  startNight,
  total,
  type Die,
  type Night,
  type Roll,
} from "./rules.js";

const PIP_LAYOUT: Record<Die, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Missing #app");

let night: Night = startNight();
let rolling = false;

function dieMarkup(face: Die): string {
  const on = new Set(PIP_LAYOUT[face]);
  const pips = Array.from({ length: 9 }, (_, index) => `<span class="pip${on.has(index) ? " on" : ""}"></span>`).join("");
  return `<div class="die${rolling ? " rolling" : ""}" aria-hidden="true">${pips}</div>`;
}

function render(): void {
  const round = night.round;
  const faces: Roll = round.roll ?? [1, 1];
  const ended = night.status !== "playing";
  const canRoll = !ended && round.result === "continue" && !rolling;
  app!.innerHTML = `
    <main class="app">
      <header class="mast">
        <div>
          <p class="kicker">Corner pass line</p>
          <h1>Shootin Dice</h1>
        </div>
        <p class="chips">Chips <strong>${night.chips}</strong><span>Stake ${STAKE} · target ${WIN_CHIPS}</span></p>
      </header>
      <section class="table" aria-live="polite">
        <p class="note">${round.note}</p>
        <div class="dice-row">
          ${dieMarkup(faces[0])}
          ${dieMarkup(faces[1])}
        </div>
        <p class="point">${round.phase === "point" ? `Point ${round.point}` : "Come-out"}${round.roll ? ` · last roll ${total(round.roll)}` : ""}</p>
        <div class="actions">
          <button id="roll" ${canRoll ? "" : "disabled"}>Roll</button>
          <button id="again" class="ghost" ${round.result === "continue" || ended ? "disabled" : ""}>Next roll</button>
        </div>
      </section>
      <section class="rules">
        <p>Pass line only. Come-out: 7 or 11 wins, 2, 3 or 12 loses, anything else becomes the point. Then hit the point before a 7.</p>
        <p>Chips are a score for the night, not cash. Double them to own the corner, or drop below the stake and you are out. Space rolls. No real-money play.</p>
      </section>
    </main>
    <div class="overlay" ${ended ? "" : "hidden"}>
      <div class="card ${night.status}">
        <h2>${night.status === "won" ? "Corner's yours" : "You're broke"}</h2>
        <p>${night.status === "won" ? `You reached ${night.chips} chips.` : `You finished on ${night.chips} chips.`}</p>
        <p>${night.roundsWon} wins, ${night.roundsLost} losses.</p>
        <button id="restart">Play again</button>
      </div>
    </div>
  `;

  document.querySelector("#roll")?.addEventListener("click", () => void onRoll());
  document.querySelector("#again")?.addEventListener("click", () => {
    night = nextRound(night);
    render();
  });
  document.querySelector("#restart")?.addEventListener("click", () => {
    night = startNight();
    render();
  });
}

async function onRoll(): Promise<void> {
  if (rolling || night.status !== "playing" || night.round.result !== "continue") return;
  rolling = true;
  render();
  await new Promise((resolve) => setTimeout(resolve, 460));
  night = { ...night, round: applyRoll(night.round, rollDice()) };
  if (night.round.result !== "continue") night = settle(night);
  rolling = false;
  render();
}

document.addEventListener("keydown", (event) => {
  if (event.code !== "Space" || event.repeat) return;
  const target = event.target as HTMLElement | null;
  if (target && (target.tagName === "BUTTON" || target.tagName === "INPUT")) return;
  event.preventDefault();
  if (night.status !== "playing") {
    night = startNight();
    render();
    return;
  }
  if (night.round.result !== "continue") {
    night = nextRound(night);
    render();
    return;
  }
  void onRoll();
});

render();
