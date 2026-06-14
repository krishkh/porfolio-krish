# Error Catcher Game — Design Spec

**Date:** 2026-06-14  
**Status:** Approved

## Overview

A Phaser.js-based falling-errors game embedded in the portfolio as an easter egg. Triggered by clicking the `MovingChara` character on the `/me` homepage. Opens as a modal/dialog overlay.

---

## Architecture

```
MovingChara (click) → opens GameModal
GameModal
  └── PhaserGame (React wrapper, client component)
        └── Phaser.Game instance
              ├── MainScene  — spawner, items, click detection, score, HP
              └── UIScene    — HP bar, score text, rank overlay
```

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
        MainScene.ts       — core game loop
        UIScene.ts         — HUD overlay (HP bar, score, rank)
  app/
    me/
      page.tsx             — add onClick + GameModal
```

---

## Game Logic

### Spawner
- Drops one item every ~1.5 seconds from a random X at the top of the canvas.
- Fall speed increases every 30 seconds (difficulty ramp).
- Max 10 items on screen simultaneously.

### Items

| Category | Items | Miss penalty |
|----------|-------|-------------|
| Errors (click to destroy) | `500 Internal Server Error`, `Memory Leak`, `Null Reference`, `Database Timeout`, `Merge Conflict`, `Missing Env Variable`, `Infinite Loop` | −10 HP |
| Powerups (click to collect) | `CI/CD Fix`, `Unit Tests`, `Monitoring Alert`, `Database Backup`, `Coffee` | None (safe to miss) |

- Items are Phaser Text objects with `setInteractive()`.
- Click destroys item and adds +10 score (errors) or +5 HP (powerups, capped at 100).
- Missed errors reduce HP when they exit the bottom of the canvas.

### HP System
- Starts at 100.
- HP bar displayed at top of UIScene: green (>60), yellow (30–60), red (<30).
- HP hits 0 → game over.

### Score → Rank

| Score | Rank |
|-------|------|
| 0–49 | Junior Developer |
| 50–99 | Software Engineer |
| 100–149 | Senior Engineer |
| 150–199 | Tech Lead |
| 200–299 | Principal Engineer |
| 300+ | CTO |

### Game Over Screen
- Displayed in UIScene as an overlay.
- Shows final score, rank title, and "Play Again" button.
- "Play Again" restarts MainScene.

---

## Persistence

- `localStorage` key: `errorCatcherBestScore`
- Stores: `{ score: number, rank: string }`
- Best score shown on game over screen.

---

## Dismissal / Lifecycle

- Clicking X or backdrop closes modal.
- `PhaserGame` `useEffect` cleanup destroys `Phaser.Game` instance.
- No pause mechanic needed — modal close = destroy.

---

## Dependencies

- `phaser` npm package (adds ~1MB to bundle, loaded client-side only via dynamic import).
