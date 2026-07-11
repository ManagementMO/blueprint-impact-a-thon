# Belonging Loop Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Build a polished, responsive frontend prototype that demonstrates Maya's complete Belonging Loop journey and the matching nonprofit host/coordinator flow.

**Architecture:** A Vite React single-page app holds a small local product model and view state. The participant experience and host/coordinator experience share one event object so edits in the host view visibly update the public event preview. All staffing, chat, attendance, and contribution behavior is explicitly mock or local-only.

**Tech Stack:** React, TypeScript, Vite, lucide-react, plain CSS.

## Global Constraints

- Keep external registration as an outbound link, not a rebuilt checkout flow.
- Model needs as situational preferences, never diagnoses.
- Display access-fact provenance and allow Unknown as an honest state.
- Label worker and helper recommendations as mock suggestions requiring coordinator review and participant acceptance.
- Keep attendance private by default and scope social interaction to the event.
- Use cooperative readiness feedback only; no XP, streaks, or leaderboards.
- Verify desktop and mobile behavior with a real browser before commit.

---

### Task 1: Frontend foundation

**Files:**
- Create: package.json
- Create: vite.config.ts
- Create: tsconfig.json
- Create: index.html
- Create: src/main.tsx
- Create: src/App.tsx
- Create: src/styles.css

- [x] Create the Vite React TypeScript configuration and install dependencies.
- [x] Add the shared event model and route-free application shell.
- [x] Add the field-guide design tokens, responsive layout primitives, typography, focus states, and reduced-motion behavior.
- [x] Run npm run build.

### Task 2: Participant journey

**Files:**
- Modify: src/App.tsx
- Modify: src/styles.css

- [x] Build the Wish First choice path with visual, text, and audio affordances.
- [x] Build a matched event result and an explicit anonymous-wish fallback.
- [x] Build the Before I Go arrival preview with sourced, dated Confirmed, Reported, and Not known facts.
- [x] Build the private Event Circle, contribution board, and optional cooperative readiness state.
- [x] Run npm run build.

### Task 3: Host and coordinator proof

**Files:**
- Modify: src/App.tsx
- Modify: src/styles.css

- [x] Build the host event-posting form with structured access fields and external registration preservation.
- [x] Build a separate paid-support and verified-helper coordinator panel with mock suggestions, constraints, review, and acceptance copy.
- [x] Ensure host edits update the participant preview locally.
- [x] Run npm run build.

### Task 4: Visual QA and handoff

**Files:**
- Create: README.md

- [x] Add local setup and demo-flow instructions.
- [x] Start the local dev server and inspect desktop/mobile screenshots.
- [x] Correct layout, overflow, interaction, or accessibility defects found during browser QA.
- [x] Run npm run build.
- [ ] Commit and push the finished prototype.
