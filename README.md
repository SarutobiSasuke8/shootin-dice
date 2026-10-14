# Shootin Dice

A browser pass-line dice game. One night, one corner, no cash-out.

Chips are a score. You are not staking real money, and nothing in this build pays out.

## Run

Requirements: Node.js 20+.

```bash
npm install
npm run dev
```

Open the URL Vite prints. Press Roll or Space. After a round settles, press Next roll (or Space again). Reach 200 chips and the corner is yours. Drop below the 10-chip stake and the night is over.

```bash
npm test
npm run build
```

## Rules

Pass line only.

- Come-out: 7 or 11 wins, 2, 3 or 12 loses, and 4, 5, 6, 8, 9 or 10 becomes the point.
- Point: roll the point again to win, or 7 to lose. Any other roll continues.
- Each settled round moves the chip score by 10.

## What this MVP leaves out

`BUILD_PLAN.md` describes territory, crews, three game modes, explicit and clean language banks, and generated art and audio. This build is the playable core only: pass-line resolution, a chip score, a win and loss screen, and tests. Language stays clean. There is no betting market and no real-money feature.
