# Belonging Loop

A polished frontend prototype for the Impact-A-Thon concept in [BELONGING-LOOP.md](./BELONGING-LOOP.md). It demonstrates a truthful, privacy-aware path from an individual's event wish to event preparation, a private event circle, and coordinator-reviewed support options.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://127.0.0.1:5173`).

## Validate

```bash
npm test
npm run build
```

## Prototype flows

- **My wish:** choose a low-pressure event preference. A close match explains why it fits and visibly preserves an unresolved support need; an unmatched wish becomes anonymous aggregate demand.
- **Before I go:** review an arrival guide and event facts with `Confirmed`, `Reported`, or `Not known` provenance.
- **Event circle:** join privately, review one moderated question, and optionally coordinate a small contribution.
- **Host workspace:** publish event facts and review mock paid-worker or verified-helper recommendations. Suggestions are never assignments; a coordinator and participant must approve.

## Boundaries

This is a frontend-only demonstration using mock data. It does not diagnose people, claim universal accessibility, automatically assign care, or expose public attendance. Event discovery would remain connected to the Teamup calendar in a production implementation.
