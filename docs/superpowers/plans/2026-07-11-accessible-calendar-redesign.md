# Accessible Calendar Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the crowded participant experience with a calm, picture-first community-event calendar, while keeping detailed coordination tools separate for staff.

**Architecture:** A single React app holds hard-coded event data and lightweight local interaction state. Participant views are organized around five bottom-navigation destinations; a staff-only workspace is opened through a distinct control and never shares the participant navigation density.

**Tech Stack:** React, TypeScript, Vite, lucide-react, plain CSS, browser SpeechSynthesis.

## Global Constraints

- Keep the participant journey to find, understand, register for, prepare for, support, and save an event.
- Preserve facts as confirmed, reported, or not known; do not claim universal accessibility.
- Keep registration external/prototype-only and never auto-assign care.
- Make chat scoped and moderated per event, attendance private by default, and media consent explicit.
- Provide Standard, Easy Read, Audio First, and PECS presentation controls.
- Use large touch targets, visible audio controls, high contrast, and responsive layouts.

---

### Task 1: Event model and behavior tests

**Files:**
- Modify: `src/lib/belonging.ts`
- Modify: `src/lib/belonging.test.ts`
- Modify: `src/App.test.tsx`

- [x] Add three realistic event records, visual metadata, registration state, arrival steps, support details, and plain-language copy.
- [x] Add failing tests for event saving, Audio First labels, PECS state, and recommendation selection.
- [x] Implement the smallest state helpers needed to pass those tests.

### Task 2: Participant-first shell and event views

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [x] Replace the desktop sidebar with a five-item bottom navigation for participant views.
- [x] Build Home category tiles and a microphone-first request action.
- [x] Build Recommended cards, visual event detail, registration clarity, arrival sequence, and speak controls.
- [x] Build My Week, Event Circle, and Support views with the requested hard-coded content.

### Task 3: Accessibility modes and staff boundary

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [x] Add persistent Standard, Easy Read, Audio First, and PECS mode controls.
- [x] Add visible playback controls and slow-speech behavior.
- [x] Keep staff creation, moderation, and coordination in a separate workspace with prototype-only data.

### Task 4: QA, handoff, and delivery

**Files:**
- Modify: `README.md`

- [x] Update the demo instructions for participant and staff flows.
- [x] Verify tests and production build.
- [x] Inspect desktop and mobile flows in Playwright and correct visual defects.
- [ ] Commit and push the redesign.
