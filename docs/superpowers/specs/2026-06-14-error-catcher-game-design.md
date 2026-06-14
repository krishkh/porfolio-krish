# Error Catcher Game — Design Spec

**Date:** 2026-06-14  
**Status:** Approved (rev 2)

## Overview

A Phaser.js-based falling-errors game embedded in the portfolio as an easter egg. Triggered by clicking the `MovingChara` character on the `/me` homepage. Opens as a modal/dialog overlay. The theme: defend your production server from incoming errors.

---

## Architecture

```
MovingChara (click) → opens GameModal
GameModal
  └── PhaserGame (React wrapper, client component)
        └── Phaser.Game instance
              └── MainScene  — all game logic: spawner, HUD, score, HP, game over
```

- Single scene (`MainScene`) handles everything — spawn, score, HP, HUD, game over.
- `PhaserGame` mounts Phaser into a `div` ref via `useEffect`, destroys instance on unmount.
- Phaser imported dynamically (client-only) to avoid SSR issues.
- `GameModal` manages open/close state, dims background, centers canvas, renders X close button.
- `MovingChara` in `me/page.tsx` gets `pointer-events-auto`, `cursor-pointer`, and an `onClick` prop.

---

## File Structure

```
src/
  components/
    Game/
      GameModal.tsx        — modal wrapper, open/close, backdrop
      PhaserGame.tsx       — mounts/destroys Phaser.Game instance
      scenes/
        MainScene.ts       — entire game (spawn, HUD, score, HP, achievements, game over)
  app/
    me/
      page.tsx             — add onClick + GameModal
```

---

## Game Logic

### Spawner — Progressive Difficulty

Spawn interval decreases over time. Fall speed increases only slightly.

| Time elapsed | Spawn interval |
|-------------|---------------|
| 0s | 1500ms |
| 30s | 1300ms |
| 60s | 1100ms |
| 90s | 900ms |
| 120s+ | 500ms (minimum) |

Fall speed: starts at 150px/s, increases by 10px/s every 30s, max 220px/s.

Max 15 items on screen simultaneously.

### Item Distribution

- **80% Errors** (harmful if missed)
- **20% Powerups** (safe to miss, beneficial if clicked)

### Items

Rendered as **Phaser rectangles with centered text** — uniform width (e.g. 220px), rounded corners via graphics. Text is centered inside. No raw text objects — consistent visual width regardless of label length.

| Category | Items | Click effect | Miss effect |
|----------|-------|-------------|------------|
| Errors | `500 Internal Server Error`, `Memory Leak`, `Null Reference`, `Database Timeout`, `Merge Conflict`, `Missing Env Variable`, `Infinite Loop` | +10 score, floating `+10` feedback | −10 HP, "X hit Production!" message |
| Powerups | `CI/CD Fix`, `Unit Tests`, `Monitoring Alert`, `Database Backup`, `Coffee` | +5 HP (capped 100), floating `+5 HP` feedback | No penalty |

### Click Feedback

On click, a floating text label rises from the destroyed item and fades out:
- Errors: green `+10`
- Powerups: cyan `+5 HP`

Implemented via Phaser tween on a temporary Text object.

### Production Server Visual

Bottom of the canvas shows:

```
🖥 Production Server
██████████  100%
```

HP bar color: green (>60), yellow (30–60), red (<30).

When an error reaches the bottom, a brief message flashes above the server:

```
Database Timeout hit Production! −10 HP
```

### Score → Rank

| Score | Rank |
|-------|------|
| 0–49 | Junior Developer |
| 50–99 | Software Engineer |
| 100–149 | Senior Engineer |
| 150–199 | Tech Lead |
| 200–299 | Principal Engineer |
| 300+ | CTO |

---

## Game Over Screen

- Overlay on MainScene (not a new scene).
- Shows: final score, rank title, best score from localStorage.
- "Play Again" button restarts MainScene.
- If rank is **CTO**, show special unlock:

```
🏆 You have successfully defended production.
[ View Krish's Projects → ]
```

Button navigates to `/projects` (Next.js router, via a callback prop passed into the Phaser scene).

---

## Achievements

Stored in `localStorage` as a set of unlocked IDs. Shown as toast-style popups mid-game and listed on game over screen.

| ID | Name | Condition |
|----|------|-----------|
| `ship_friday` | Ship On Friday Night | Reach score 150 |
| `works_on_my_machine` | Works On My Machine | Destroy 50 errors in one session |
| `devops_wizard` | DevOps Wizard | Collect 10 powerups in one session |
| `cto` | Reached CTO | Score 300+ |

No backend. All `localStorage`.

---

## Sound Architecture

`soundEnabled: boolean` stored in `localStorage` (default `true`). Toggle button in HUD (mute icon).

No sounds implemented yet — architecture ready for click/hit/powerup SFX later.

---

## Persistence

`localStorage` keys:
- `errorCatcherBestScore` — `{ score: number, rank: string }`
- `errorCatcherAchievements` — `string[]` of unlocked achievement IDs
- `errorCatcherSoundEnabled` — `boolean`

---

## Dismissal / Lifecycle

- Clicking X or backdrop closes modal.
- `PhaserGame` `useEffect` cleanup destroys `Phaser.Game` instance.
- No pause mechanic — modal close = destroy.

---

## Dependencies

- `phaser` npm package (~1MB, loaded client-side only via dynamic import).
