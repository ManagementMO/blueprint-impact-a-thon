# Winning Accessibility Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make accessibility impossible to miss while keeping the community-event journey calm, personal, and feasible for KW Habilitation.

**Architecture:** Split global accessibility controls, event presentation, host trust, and navigation into focused React components. Use app-level mode state for Listen, PECS, Easy Read, and color-vision palettes. Preserve hard-coded prototype data and browser speech synthesis; do not add external services or simulate autonomous care decisions.

**Tech Stack:** React 19, TypeScript, Vite, lucide-react, plain CSS, SpeechSynthesis.

## Global Constraints

- Every participant interaction has a visible label, icon, keyboard support, and accessible name.
- Do not use color as the only status signal; pair it with text and icons.
- One decision at a time for onboarding and help requests.
- Use Grade 3, plain-language copy in Easy Read and PECS states.
- Keep attendance private, media consent explicit, helper matching review-based, and registration external/prototype-only.
- Do not include public leaderboards, attendance streaks, or automatic helper assignment.

---

### Task 1: Accessibility foundations

**Files:**
- Create: `src/components/accessibility/AccessibilityBar.tsx`
- Create: `src/components/accessibility/ListenButton.tsx`
- Create: `src/components/accessibility/ColorModePicker.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Modify: `src/App.test.tsx`

- [ ] Write failing tests for PECS banner, color picker, and Audio First speech state.
- [ ] Add persistent four-control bar, language selector, CSS palette attributes, skip link, and app-wide reading modes.

### Task 2: Event safety and clarity

**Files:**
- Create: `src/components/host/HostProfile.tsx`
- Create: `src/components/events/AccessibilityLens.tsx`
- Create: `src/components/events/EventCard.tsx`
- Create: `src/components/events/EventDetail.tsx`
- Modify: `src/lib/events.ts`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] Add a large host profile and voice/video introduction to every event detail.
- [ ] Add access facts, visual timeline, attendance context, registration clarity, and accessibility lens.

### Task 3: One-decision journeys and differentiated features

**Files:**
- Create: `src/components/features/Onboarding.tsx`
- Create: `src/components/features/DiscoveryPreviews.tsx`
- Create: `src/components/nav/BottomNav.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] Add a five-step visual onboarding path with no required typing.
- [ ] Reduce participant navigation to Home, My Week, Community, and Support.
- [ ] Add polished WhatsApp and Chrome-extension concept previews.

### Task 4: Verification and delivery

**Files:**
- Modify: `README.md`

- [ ] Test desktop, mobile, keyboard interaction, and visual mode changes.
- [ ] Update handoff documentation.
- [ ] Commit and push.
