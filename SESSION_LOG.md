# Shootin Dice — Design Session Log

**Created by:** Grok (xAI)  
**Session Date:** August 9, 2026  
**Participants:** User + Grok  
**Purpose:** Full game concept → locked design direction → detailed build plan

This document records the key decisions from the design conversation that produced the current vision and BUILD_PLAN.md.

---

## Session Overview

The project began as a request for a browser/mobile game about street gangsters playing dice, with hip-hop music, graffiti, and strong gang-themed cheers, insults, and threats.

Through iterative discussion, the concept was refined into a focused, atmosphere-heavy 2D browser game with controlled scope.

---

## Key Decision Timeline

### 1. Name
- Working title proposed: **Shootin Dice**
- Alternatives considered: Street Bones, Dice Down, Corner Craps, Hustle Bones, etc.
- **Decision:** Keep **Shootin Dice**

### 2. Game Modes
- User confirmed interest in multiple modes.
- **Locked:**
  - Classic Street Craps (main authentic mode)
  - Quick Hustle (simplified higher/lower + point)
  - Winner Take All (pure pot shooting)

### 3. Multiplayer
- **Decision:** VS AI first. Online multiplayer on the roadmap only.

### 4. Meta / Progression
- User asked what was strongest.
- **Decision:** Corner Empire structure
  - Start as a nobody on one block
  - Climb reputation and take corners across a New York-style street world
  - Distinct AI opponents with personalities
  - Visual ownership of corners through changing graffiti/tags

### 5. Language & Tone
- Explicit language requested for first version.
- Discussion around use of strong street language (including the n-word).
- **Decision:**
  - Explicit mode is the default for v1
  - Full clean-language toggle as a first-class feature
  - Language used in character-appropriate ways, not randomly
  - Dual dialogue banks so switching modes is clean and maintainable

### 6. Violence / Consequences
- Discussed how dark the threats and physical pressure should go.
- **Decision:** Heavy verbal + visual intimidation. Light physical pressure (shoves, being forced off a corner, rival presence). No full combat system in v1.

### 7. Player Character & Crew
- **Decision:** Light customization (look + style tags) + small crew that grows with territory. Focus stays on opponents and the dice.

### 8. Money System
- **Decision:** Real cash pressure (you can go broke) with a soft starting bankroll and light early-game safety net.

### 9. Setting
- **Decision:** New York–style street world (fictionalized but grounded).

### 10. Visual Direction (Major Pivot)
- User asked about 2D vs 3D and complexity concerns.
- Proposed direction: comic / sharp street-cartoon energy with dynamic graphic impact, combined with gritty street realism in writing and heavier unfiltered street attitude.
- **Final Decision:**
  - Fully stylized 2D
  - Bold outlines, exaggerated expressions, graffiti texture, comic-style framing and impact
  - Dice remain high-quality 2D with strong physical “juice” (weight, bounce, impact, particles)
  - No heavy 3D pipeline in v1 (optional lightweight 3D dice later only if needed)
  - AI-friendly asset pipeline

### 11. Technical Philosophy
- Explicit requirement: do not let the project mutate into a horribly complex build.
- **Decision:** Browser-first, Vite + Phaser 3 or PixiJS, data-driven systems, strict scope rules.

### 12. Music
- User will generate tracks with Suno.
- Game structured to support different tracks for menu, tension, wins, losses, and takeovers.

---

## Final Locked Pillars

1. The roll must feel tangible.
2. Characters and reactions own the atmosphere.
3. Territory and reputation matter.
4. Language is a proper system (explicit + clean).
5. Scope stays tightly controlled.

---

## Artifacts Produced This Session

- GitHub repository created: `SarutobiSasuke8/shootin-dice`
- `BUILD_PLAN.md` — full detailed design and phased development plan
- `README.md` — project overview
- This `SESSION_LOG.md` — record of the design conversation and decisions

---

## Stamp

**This project concept, design direction, systems architecture, and build plan were developed in collaboration with Grok (built by xAI) on August 9, 2026.**

The session log above captures the decision-making process that led to the current locked vision.
