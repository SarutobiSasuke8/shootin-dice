# Shootin Dice — Detailed Build Plan

**Repository:** https://github.com/SarutobiSasuke8/shootin-dice  
**Platform:** Browser-first (responsive, mobile-friendly)  
**Status:** Pre-production / Design locked

---

## 1. Project Vision

Shootin Dice is a browser-based street dice game focused on atmosphere, character, and the tension of the roll.  
Players hustle on New York street corners, climb reputation, take territory, and deal with the consequences of winning and losing big.

The game prioritizes:
- Tangible, weighty dice
- Strong character presence and reactions
- Explicit street language (with clean toggle)
- Stylized comic visuals that feel bold and graphic
- A sense of place and progression without becoming a complex simulation

**Tone targets (meaning, not direct references):**
- Dynamic comic-book energy: bold outlines, exaggerated expressions, graphic impact, motion, and panel-like framing
- Sharp street-cartoon attitude with attitude and bite
- Gritty, grounded street realism in writing, social texture, and consequences
- Unfiltered street / gang culture energy in language, threats, and hierarchy

---

## 2. Core Pillars

1. **The Roll Feels Real** — Dice have weight, bounce, impact, and satisfying settle.
2. **Characters Own the Screen** — Opponents react hard. Dialogue and body language drive atmosphere.
3. **Territory Matters** — Winning money is good. Taking corners and climbing the street hierarchy is better.
4. **Language Has Weight** — Explicit by default. Clean mode is a first-class feature, not an afterthought.
5. **Scope Stays Controlled** — Stylized 2D, focused systems, no feature creep into full combat or open world.

---

## 3. Visual & Audio Direction

### Visual Style
- Fully 2D, stylized comic approach
- Bold black outlines, strong silhouettes, exaggerated facial expressions
- Heavy use of graffiti texture, tags, spray effects, and graphic text treatments
- Dynamic framing: tight close-ups on faces during threats, wider shots of the corner, comic-style impact frames on big moments
- Color: high contrast, saturated where it counts, gritty urban palette (concrete, night lights, money green, blood red accents)
- Backgrounds evolve with territory control (tags change, crew presence increases, corner “ownership” feels visual)

### Perspective
- Characters: primarily 3/4 view with dynamic comic camera punches
- Dice circle: angled top-down / three-quarter view so dice, money, and chalk read clearly
- Big win/loss moments can break into graphic panel treatments or full-screen reaction cards

### Dice
- High-quality 2D dice with strong “juice”
- Weight, momentum, bounce, impact frames, screen shake, chalk/dust particles, money scatter
- Priority on feel over literal 3D. Lightweight 3D dice module is a possible later enhancement only if needed.

### Audio
- Suno-generated hip-hop tracks (menu, tension, big win, loss, corner takeover)
- Critical: high-quality dice sounds (roll, bounce, settle, money movement)
- Character vocal reactions (short ad-libs, laughs, threats) layered under text
- Environmental bed (distant traffic, voices, city night) that escalates with heat

---

## 4. Game Modes

All three modes available early:

1. **Classic Street Craps** (core mode)  
   Pass line, point, odds, basic side action. Authentic street rules simplified for flow and mobile.

2. **Quick Hustle**  
   Faster higher/lower + point system. Lower complexity, higher pace.

3. **Winner Take All**  
   Pure pot shooting with escalating side bets and maximum tension. High risk, high reward.

Modes share the same character reaction, language, and progression systems.

---

## 5. Core Loop

1. Arrive at a corner
2. Face one or more AI opponents with distinct personalities
3. Choose mode and buy-in
4. Roll → bet → react → resolve
5. Win/lose money + reputation + heat
6. Opponent and crowd react (cheers, insults, threats, physical pressure)
7. Leave, get pushed off, or stay and push further
8. Return to map → choose next corner or manage crew/bankroll

Short sessions should feel complete. Longer sessions should feel like a night of hustling.

---

## 6. Progression System — Corner Empire

**Setting:** Fictionalized but grounded New York street world.

- Start as a low-level hustler on one corner
- Earn money + reputation
- Unlock new corners across different neighborhoods
- Each corner has a local power structure and a “boss” or crew that must be beaten in a high-stakes session to take control
- Controlling a corner changes the visual state (tags, presence, respect level) and improves passive opportunities
- Reputation and heat meters affect how opponents talk to you and how aggressive the street feels
- Simple crew system: small group that grows with territory (mostly flavor + minor bonuses in v1)

**Money:** Real pressure. You can go broke. New players get a soft starting bankroll and a light early-game safety net so the first night is not instantly punishing.

---

## 7. Characters & AI

- Multiple distinct AI opponents with unique:
  - Speech patterns and vocabulary
  - Aggression level
  - Play style tendencies
  - Visual design and reaction set
- Examples of archetypes (not final names):
  - Young hothead
  - Cold older head
  - Flashy talker
  - Quiet dangerous type
  - Local boss with heavier presence
- Player has light customization (face, clothes, a couple of style tags) + small crew that appears in the background as you rise.

Dialogue is data-driven so new lines and characters can be added without code changes.

---

## 8. Language & Content System

- **Explicit mode (default for first version):** Full street language, including strong slurs used in character-appropriate ways.
- **Clean mode:** First-class toggle. All dialogue lives in dual banks (or tagged lines). Switching modes swaps or rewrites in real time.
- Language is treated as a system, not scattered strings. This makes future localization, moderation, or platform adjustments straightforward.
- Threats and insults escalate with heat, reputation difference, and recent results.

---

## 9. UI / UX Breakdown

### Main Table View
- Angled dice circle as the focus
- Large character presence (opponent(s) dominate side or upper area)
- Clear bankroll, current bet, point, and mode indicators
- Big, thumb-friendly betting controls
- Speech bubbles / tagged text that feel sprayed or stamped on screen

### Reaction Layer
- Big win/loss overlays with graphic impact
- Character lean-in, shove, money snatch, or “get the fuck off my corner” moments
- Screen shake, particle, and text treatments tied to outcome intensity

### Meta Screens
- Simple New York-style block / corner map
- Crew and bankroll management (kept light)
- Opponent / corner select with personality and threat level preview

### Principles
- Readable on phone in one hand
- High contrast
- Minimal chrome — atmosphere over UI clutter
- Fast to get back into a roll

---

## 10. Technical Architecture (Scope-Controlled)

**Recommended stack (browser-first, low complexity):**
- **Frontend:** HTML5 + TypeScript or modern JavaScript
- **Rendering:** Phaser 3 or PixiJS (excellent 2D, good mobile performance, strong animation tools)
- **State:** Simple modular store (or lightweight state management)
- **Audio:** Howler.js or native Web Audio for precise dice and voice layering
- **Persistence:** localStorage first (save bankroll, corners, reputation, settings). Cloud later if needed.
- **Build:** Vite for fast iteration
- **Deployment:** Static hosting (fits “browser platform”)

**No heavy engines.** No full 3D pipeline in v1. No multiplayer networking in v1.

**Key systems to build as data-driven modules:**
- Dice engine + juice
- Betting / rules engine (per mode)
- Dialogue / language bank system
- Character reaction system
- Progression / corner ownership
- Save / load

---

## 11. Asset Pipeline (AI-Friendly)

All major visual assets designed to be generated and iterated with AI image tools:

- Character turnarounds and expression sheets
- Corner backgrounds at different ownership states
- Dice, money, chalk, props
- UI frames, speech bubble styles, tag fonts
- Impact and reaction overlays

Style guide will be written once and reused as consistent prompting foundation.

Audio: Suno tracks + custom or sourced dice/foley. Short vocal ad-libs can be generated or recorded later.

---

## 12. Development Phases (Detailed)

### Phase 0 — Foundation (1–2 weeks)
- Repo structure, Vite + Phaser/Pixi setup
- Basic responsive canvas
- Input handling (mouse + touch)
- Simple scene management
- localStorage save skeleton
- Language toggle architecture (empty banks)

### Phase 1 — Core Dice Loop (2–3 weeks)
- 2D dice with weight, bounce, settle, screen shake, particles
- Basic Classic Street Craps rules (pass / don’t pass / point)
- Betting UI
- Win/loss resolution
- Placeholder character + speech bubble reactions
- Sound hooks for dice

**Milestone:** You can roll, bet, win/lose money, and feel the dice.

### Phase 2 — Atmosphere & Characters (2–3 weeks)
- Multiple AI opponents with distinct dialogue banks
- Reaction system (cheer / insult / threat / physical pressure)
- Explicit + clean language banks fully wired
- Big win/loss overlay system
- Basic heat / reputation meters

**Milestone:** A single corner session feels alive and characterful.

### Phase 3 — Progression & Map (2 weeks)
- Corner map (New York style)
- Territory ownership states
- Unlocking new corners and opponents
- Simple crew presence
- Bankroll pressure + early safety net

**Milestone:** Full vertical slice — arrive, hustle, take a corner, feel progression.

### Phase 4 — Modes, Polish, Content (2–3 weeks)
- Quick Hustle + Winner Take All modes
- Expanded dialogue and reactions
- Visual polish pass (tags changing, better juice, UI refinement)
- Suno track integration
- Settings (language toggle, audio, etc.)
- Basic onboarding / first-night flow

**Milestone:** Playable vertical slice ready for internal testing and iteration.

### Phase 5 — Hardening & Platform (ongoing)
- Mobile browser performance and touch polish
- Save robustness
- Content tools for adding lines/characters easily
- Analytics hooks if desired
- Preparation for wider browser platform release

---

## 13. Scope Control Rules

- No full combat system in v1
- No open world or free roaming
- No deep RPG character stats
- No real-time multiplayer in v1
- No photorealism or heavy 3D
- Dialogue and reactions are data, not hard-coded
- Every new feature must answer: “Does this make the dice and the corner feel better?”

---

## 14. Additional Suggestions

1. **Dice feel is sacred.** Spend extra time on the roll animation and sound. It is the single most important tactile element.
2. **Make the language system extremely easy to expand.** New characters and new lines should be JSON (or similar) drops.
3. **First-night experience.** Design a short guided opening that teaches the core loop while still feeling like a real street introduction.
4. **Heat as a narrative tool.** High heat should change how people talk to you and how the corner feels, not just be a number.
5. **Crew as flavor first.** Keep mechanical impact light in v1 so it doesn’t dilute the dice focus.
6. **Accessibility.** Language toggle is already strong. Also consider screen shake intensity option and text size.
7. **Content warning / rating clarity.** Be upfront about explicit language and street themes on the landing page.
8. **Future multiplayer path.** Design the rules and state so online later is possible without rewriting the core, but do not build it now.

---

## Next Immediate Actions

1. Confirm this build plan.
2. Set up the actual project scaffold (Vite + chosen 2D library).
3. Write the visual style guide (prompt foundation for AI assets).
4. Implement Phase 0 + start Phase 1 dice prototype.

---

*This document is the living source of truth for scope and priorities. Update it when major decisions change.*
