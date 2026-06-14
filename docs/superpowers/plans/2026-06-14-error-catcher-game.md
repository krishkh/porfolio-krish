# Error Catcher Game Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Phaser 3 falling-errors minigame that launches as a modal when the user clicks the MovingChara sprite on /me.

**Architecture:** Pure Phaser 3 game inside a single `MainScene`. A thin React wrapper (`PhaserGame.tsx`) mounts/destroys the Phaser instance. A client component (`GameTrigger.tsx`) owns the open/close state and replaces the current MovingChara div in me/page.tsx. Pure utility functions in `gameUtils.ts` are unit-tested with Jest; the Phaser scene itself is not unit-tested.

**Tech Stack:** Next.js 14 (App Router), Phaser 3, TypeScript, Tailwind CSS, Jest + ts-jest

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `src/components/Game/types.ts` | Constants (ERRORS, POWERUPS, ACHIEVEMENTS) and shared types |
| Create | `src/components/Game/gameUtils.ts` | Pure functions: score→rank, spawn delay, fall speed, achievement checks, localStorage helpers |
| Create | `src/components/Game/__tests__/gameUtils.test.ts` | Unit tests for gameUtils |
| Create | `src/components/Game/scenes/MainScene.ts` | Entire Phaser game scene |
| Create | `src/components/Game/PhaserGame.tsx` | React client component: mounts Phaser into a div ref, destroys on unmount |
| Create | `src/components/Game/GameModal.tsx` | Modal overlay: dims background, centers canvas, close on X/Escape/backdrop |
| Create | `src/components/Game/GameTrigger.tsx` | Client component: holds open state, renders MovingChara + GameModal |
| Modify | `src/app/me/page.tsx` | Replace MovingChara div with `<GameTrigger />` |
| Create | `jest.config.ts` | Jest config with ts-jest and @/ path alias |
| Modify | `package.json` | Add `"test": "jest"` script |

---

## Task 1: Install dependencies + configure Jest

**Files:**
- Modify: `package.json`
- Create: `jest.config.ts`

- [ ] **Step 1: Install Phaser and Jest**

```bash
npm install phaser
npm install --save-dev jest @types/jest ts-jest
```

- [ ] **Step 2: Create jest.config.ts**

```ts
// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          moduleResolution: 'node',
          module: 'commonjs',
        },
      },
    ],
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
};

export default config;
```

- [ ] **Step 3: Add test script to package.json**

Open `package.json` and add `"test": "jest"` to the `scripts` object:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "jest"
}
```

- [ ] **Step 4: Commit**

```bash
git add jest.config.ts package.json package-lock.json
git commit -m "chore: install phaser and configure jest"
```

---

## Task 2: Types and constants

**Files:**
- Create: `src/components/Game/types.ts`

- [ ] **Step 1: Create types.ts**

```ts
// src/components/Game/types.ts

export const ERRORS = [
  '500 Internal Error',
  'Memory Leak',
  'Null Reference',
  'DB Timeout',
  'Merge Conflict',
  'Missing Env Var',
  'Infinite Loop',
] as const;

export const POWERUPS = [
  'CI/CD Fix',
  'Unit Tests',
  'Monitoring Alert',
  'DB Backup',
  'Coffee',
] as const;

export interface Achievement {
  id: string;
  name: string;
  description: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'ship_friday', name: 'Ship On Friday Night', description: 'Reach score 150' },
  { id: 'works_on_my_machine', name: 'Works On My Machine', description: 'Destroy 50 errors' },
  { id: 'devops_wizard', name: 'DevOps Wizard', description: 'Collect 10 powerups' },
  { id: 'cto', name: 'Reached CTO', description: 'Score 300+' },
];

export interface GameState {
  score: number;
  errorsDestroyed: number;
  powerupsCollected: number;
}

export interface BestScore {
  score: number;
  rank: string;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Game/types.ts
git commit -m "feat: add game types and constants"
```

---

## Task 3: Game utilities (TDD)

**Files:**
- Create: `src/components/Game/gameUtils.ts`
- Create: `src/components/Game/__tests__/gameUtils.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// src/components/Game/__tests__/gameUtils.test.ts
import {
  getScoreRank,
  getNextSpawnDelay,
  getFallSpeed,
  checkNewAchievements,
} from '../gameUtils';

describe('getScoreRank', () => {
  it('returns Junior Developer for 0', () => expect(getScoreRank(0)).toBe('Junior Developer'));
  it('returns Junior Developer for 49', () => expect(getScoreRank(49)).toBe('Junior Developer'));
  it('returns Software Engineer for 50', () => expect(getScoreRank(50)).toBe('Software Engineer'));
  it('returns Software Engineer for 99', () => expect(getScoreRank(99)).toBe('Software Engineer'));
  it('returns Senior Engineer for 100', () => expect(getScoreRank(100)).toBe('Senior Engineer'));
  it('returns Tech Lead for 150', () => expect(getScoreRank(150)).toBe('Tech Lead'));
  it('returns Principal Engineer for 200', () => expect(getScoreRank(200)).toBe('Principal Engineer'));
  it('returns CTO for 300', () => expect(getScoreRank(300)).toBe('CTO'));
  it('returns CTO for 999', () => expect(getScoreRank(999)).toBe('CTO'));
});

describe('getNextSpawnDelay', () => {
  it('returns 1500 at 0s', () => expect(getNextSpawnDelay(0)).toBe(1500));
  it('returns 1500 at 29s', () => expect(getNextSpawnDelay(29)).toBe(1500));
  it('returns 1300 at 30s', () => expect(getNextSpawnDelay(30)).toBe(1300));
  it('returns 1100 at 60s', () => expect(getNextSpawnDelay(60)).toBe(1100));
  it('returns 900 at 90s', () => expect(getNextSpawnDelay(90)).toBe(900));
  it('returns 500 at 120s', () => expect(getNextSpawnDelay(120)).toBe(500));
  it('returns 500 at 200s (clamped)', () => expect(getNextSpawnDelay(200)).toBe(500));
});

describe('getFallSpeed', () => {
  it('returns 150 at 0s', () => expect(getFallSpeed(0)).toBe(150));
  it('returns 160 at 30s', () => expect(getFallSpeed(30)).toBe(160));
  it('returns 170 at 60s', () => expect(getFallSpeed(60)).toBe(170));
  it('caps at 220', () => expect(getFallSpeed(10000)).toBe(220));
});

describe('checkNewAchievements', () => {
  it('unlocks ship_friday at score 150', () => {
    const result = checkNewAchievements(
      { score: 150, errorsDestroyed: 0, powerupsCollected: 0 },
      new Set()
    );
    expect(result).toContain('ship_friday');
  });

  it('does not re-unlock ship_friday if already unlocked', () => {
    const result = checkNewAchievements(
      { score: 150, errorsDestroyed: 0, powerupsCollected: 0 },
      new Set(['ship_friday'])
    );
    expect(result).not.toContain('ship_friday');
  });

  it('unlocks works_on_my_machine at 50 errors destroyed', () => {
    const result = checkNewAchievements(
      { score: 0, errorsDestroyed: 50, powerupsCollected: 0 },
      new Set()
    );
    expect(result).toContain('works_on_my_machine');
  });

  it('unlocks devops_wizard at 10 powerups collected', () => {
    const result = checkNewAchievements(
      { score: 0, errorsDestroyed: 0, powerupsCollected: 10 },
      new Set()
    );
    expect(result).toContain('devops_wizard');
  });

  it('unlocks cto at score 300', () => {
    const result = checkNewAchievements(
      { score: 300, errorsDestroyed: 0, powerupsCollected: 0 },
      new Set()
    );
    expect(result).toContain('cto');
  });

  it('can unlock multiple achievements at once', () => {
    const result = checkNewAchievements(
      { score: 300, errorsDestroyed: 50, powerupsCollected: 10 },
      new Set()
    );
    expect(result).toHaveLength(4);
  });

  it('returns empty array when nothing new is unlocked', () => {
    const result = checkNewAchievements(
      { score: 0, errorsDestroyed: 0, powerupsCollected: 0 },
      new Set()
    );
    expect(result).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run tests — expect FAIL (module not found)**

```bash
npm test
```

Expected: `Cannot find module '../gameUtils'`

- [ ] **Step 3: Implement gameUtils.ts**

```ts
// src/components/Game/gameUtils.ts
import { ACHIEVEMENTS, BestScore, GameState } from './types';

export function getScoreRank(score: number): string {
  if (score >= 300) return 'CTO';
  if (score >= 200) return 'Principal Engineer';
  if (score >= 150) return 'Tech Lead';
  if (score >= 100) return 'Senior Engineer';
  if (score >= 50) return 'Software Engineer';
  return 'Junior Developer';
}

export function getNextSpawnDelay(elapsedSeconds: number): number {
  if (elapsedSeconds >= 120) return 500;
  if (elapsedSeconds >= 90) return 900;
  if (elapsedSeconds >= 60) return 1100;
  if (elapsedSeconds >= 30) return 1300;
  return 1500;
}

export function getFallSpeed(elapsedSeconds: number): number {
  const increments = Math.floor(elapsedSeconds / 30);
  return Math.min(150 + increments * 10, 220);
}

export function checkNewAchievements(
  state: GameState,
  alreadyUnlocked: Set<string>
): string[] {
  const newlyUnlocked: string[] = [];
  if (state.score >= 150 && !alreadyUnlocked.has('ship_friday')) newlyUnlocked.push('ship_friday');
  if (state.errorsDestroyed >= 50 && !alreadyUnlocked.has('works_on_my_machine')) newlyUnlocked.push('works_on_my_machine');
  if (state.powerupsCollected >= 10 && !alreadyUnlocked.has('devops_wizard')) newlyUnlocked.push('devops_wizard');
  if (state.score >= 300 && !alreadyUnlocked.has('cto')) newlyUnlocked.push('cto');
  return newlyUnlocked;
}

export function loadBestScore(): BestScore {
  try {
    const stored = localStorage.getItem('errorCatcherBestScore');
    if (stored) return JSON.parse(stored) as BestScore;
  } catch { /* ignore */ }
  return { score: 0, rank: 'Junior Developer' };
}

export function saveBestScore(score: number, rank: string): void {
  try {
    localStorage.setItem('errorCatcherBestScore', JSON.stringify({ score, rank }));
  } catch { /* ignore */ }
}

export function loadAchievements(): Set<string> {
  try {
    const stored = localStorage.getItem('errorCatcherAchievements');
    if (stored) return new Set(JSON.parse(stored) as string[]);
  } catch { /* ignore */ }
  return new Set();
}

export function saveAchievements(achievements: Set<string>): void {
  try {
    localStorage.setItem('errorCatcherAchievements', JSON.stringify([...achievements]));
  } catch { /* ignore */ }
}

export function loadSoundEnabled(): boolean {
  try {
    return localStorage.getItem('errorCatcherSoundEnabled') !== 'false';
  } catch { /* ignore */ }
  return true;
}

export function saveSoundEnabled(enabled: boolean): void {
  try {
    localStorage.setItem('errorCatcherSoundEnabled', String(enabled));
  } catch { /* ignore */ }
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test
```

Expected: `Tests: 18 passed, 18 total`

- [ ] **Step 5: Commit**

```bash
git add src/components/Game/gameUtils.ts src/components/Game/__tests__/gameUtils.test.ts
git commit -m "feat: add game utilities with tests"
```

---

## Task 4: MainScene (Phaser game logic)

**Files:**
- Create: `src/components/Game/scenes/MainScene.ts`

Canvas is 480×640. Layout:
- y 0–70: HUD (score, rank, mute icon, HP bar)
- y 70–530: Play area (items spawn at top, hit server at bottom)
- y 530–640: Production Server visual

- [ ] **Step 1: Create MainScene.ts**

```ts
// src/components/Game/scenes/MainScene.ts
import Phaser from 'phaser';
import {
  getScoreRank,
  getNextSpawnDelay,
  getFallSpeed,
  checkNewAchievements,
  loadBestScore,
  saveBestScore,
  loadAchievements,
  saveAchievements,
  loadSoundEnabled,
  saveSoundEnabled,
} from '../gameUtils';
import { ACHIEVEMENTS, ERRORS, POWERUPS, GameState } from '../types';

const W = 480;
const H = 640;
const PLAY_TOP = 72;
const PLAY_BOTTOM = 530;
const ITEM_W = 220;
const ITEM_H = 44;

export class MainScene extends Phaser.Scene {
  private hp = 100;
  private score = 0;
  private elapsedSeconds = 0;
  private errorsDestroyed = 0;
  private powerupsCollected = 0;
  private activeItems: Phaser.GameObjects.Container[] = [];
  private unlockedAchievements: Set<string> = new Set();
  private soundEnabled = true;
  private gameOverActive = false;

  private hpBarFill!: Phaser.GameObjects.Graphics;
  private scoreLabel!: Phaser.GameObjects.Text;
  private rankLabel!: Phaser.GameObjects.Text;
  private muteBtn!: Phaser.GameObjects.Text;
  private hitMsg!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.hp = 100;
    this.score = 0;
    this.elapsedSeconds = 0;
    this.errorsDestroyed = 0;
    this.powerupsCollected = 0;
    this.activeItems = [];
    this.gameOverActive = false;
    this.unlockedAchievements = loadAchievements();
    this.soundEnabled = loadSoundEnabled();

    this.buildHUD();
    this.buildServerVisual();
    this.startElapsedClock();
    this.scheduleSpawn();
  }

  // ─── HUD ────────────────────────────────────────────────────────────────

  private buildHUD() {
    const hudBg = this.add.graphics();
    hudBg.fillStyle(0x080810, 0.95);
    hudBg.fillRect(0, 0, W, PLAY_TOP - 4);

    this.scoreLabel = this.add.text(14, 10, 'Score: 0', {
      fontSize: '15px', color: '#ffffff', fontFamily: 'monospace',
    });

    this.rankLabel = this.add.text(W / 2, 10, 'Junior Developer', {
      fontSize: '12px', color: '#888888', fontFamily: 'monospace',
    }).setOrigin(0.5, 0);

    this.muteBtn = this.add.text(W - 14, 10, this.soundEnabled ? '🔊' : '🔇', {
      fontSize: '17px',
    }).setOrigin(1, 0).setInteractive({ cursor: 'pointer' });

    this.muteBtn.on('pointerup', () => {
      this.soundEnabled = !this.soundEnabled;
      saveSoundEnabled(this.soundEnabled);
      this.muteBtn.setText(this.soundEnabled ? '🔊' : '🔇');
    });

    // HP bar track
    this.add.text(14, 34, 'Production HP', {
      fontSize: '10px', color: '#555555', fontFamily: 'monospace',
    });
    const hpBg = this.add.graphics();
    hpBg.fillStyle(0x222222);
    hpBg.fillRect(14, 48, W - 28, 12);

    this.hpBarFill = this.add.graphics();
    this.redrawHPBar();
  }

  private redrawHPBar() {
    this.hpBarFill.clear();
    const pct = Math.max(0, this.hp) / 100;
    const color = pct > 0.6 ? 0x00ff88 : pct > 0.3 ? 0xffcc00 : 0xff3333;
    this.hpBarFill.fillStyle(color);
    this.hpBarFill.fillRect(14, 48, (W - 28) * pct, 12);
  }

  // ─── Server visual ──────────────────────────────────────────────────────

  private buildServerVisual() {
    const bg = this.add.graphics();
    bg.fillStyle(0x080810, 0.95);
    bg.fillRect(0, PLAY_BOTTOM, W, H - PLAY_BOTTOM);

    // divider line
    const line = this.add.graphics();
    line.lineStyle(1, 0x333355, 1);
    line.lineBetween(0, PLAY_BOTTOM, W, PLAY_BOTTOM);

    this.add.text(W / 2, PLAY_BOTTOM + 10, '🖥  Production Server', {
      fontSize: '13px', color: '#00ff88', fontFamily: 'monospace',
    }).setOrigin(0.5, 0);

    this.hitMsg = this.add.text(W / 2, PLAY_BOTTOM + 42, '', {
      fontSize: '11px', color: '#ff4444', fontFamily: 'monospace',
    }).setOrigin(0.5, 0).setAlpha(0);
  }

  private flashHitMessage(label: string) {
    this.hitMsg.setText(`${label} hit Production! −10 HP`).setAlpha(1);
    this.tweens.add({
      targets: this.hitMsg, alpha: 0, delay: 1400, duration: 400,
    });
  }

  // ─── Timing ─────────────────────────────────────────────────────────────

  private startElapsedClock() {
    this.time.addEvent({
      delay: 1000,
      repeat: -1,
      callback: () => { if (!this.gameOverActive) this.elapsedSeconds++; },
    });
  }

  private scheduleSpawn() {
    const delay = getNextSpawnDelay(this.elapsedSeconds);
    this.time.delayedCall(delay, () => {
      if (!this.gameOverActive) {
        this.spawnItem();
        this.scheduleSpawn();
      }
    });
  }

  // ─── Items ──────────────────────────────────────────────────────────────

  private spawnItem() {
    if (this.activeItems.length >= 15) return;

    const isError = Math.random() < 0.8;
    const pool = isError ? [...ERRORS] : [...POWERUPS];
    const label = pool[Math.floor(Math.random() * pool.length)];
    const x = Phaser.Math.Between(ITEM_W / 2 + 12, W - ITEM_W / 2 - 12);

    const container = this.makeItemContainer(x, PLAY_TOP, label, isError);
    this.activeItems.push(container);
  }

  private makeItemContainer(
    x: number, y: number, label: string, isError: boolean
  ): Phaser.GameObjects.Container {
    const border = isError ? 0xff4444 : 0x00ff88;
    const fill   = isError ? 0x1a0808 : 0x081a0e;

    const bg = this.add.graphics();
    bg.fillStyle(fill, 0.97);
    bg.fillRoundedRect(-ITEM_W / 2, -ITEM_H / 2, ITEM_W, ITEM_H, 6);
    bg.lineStyle(1.5, border, 1);
    bg.strokeRoundedRect(-ITEM_W / 2, -ITEM_H / 2, ITEM_W, ITEM_H, 6);

    const text = this.add.text(0, 0, label, {
      fontSize: '12px',
      color: isError ? '#ff9999' : '#99ffcc',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    const c = this.add.container(x, y, [bg, text]);
    c.setSize(ITEM_W, ITEM_H);
    c.setInteractive({ cursor: 'pointer' });
    c.setData('isError', isError);
    c.setData('label', label);
    c.on('pointerup', () => this.onItemClick(c));
    return c;
  }

  private onItemClick(c: Phaser.GameObjects.Container) {
    if (this.gameOverActive) return;
    const isError: boolean = c.getData('isError');
    const { x, y } = c;
    this.removeItem(c);

    if (isError) {
      this.score += 10;
      this.errorsDestroyed++;
      this.scoreLabel.setText(`Score: ${this.score}`);
      this.rankLabel.setText(getScoreRank(this.score));
      this.floatText(x, y, '+10', '#00ff88');
    } else {
      this.hp = Math.min(100, this.hp + 5);
      this.powerupsCollected++;
      this.redrawHPBar();
      this.floatText(x, y, '+5 HP', '#00ccff');
    }

    this.processAchievements();
  }

  private removeItem(c: Phaser.GameObjects.Container) {
    const i = this.activeItems.indexOf(c);
    if (i !== -1) this.activeItems.splice(i, 1);
    c.destroy();
  }

  private floatText(x: number, y: number, msg: string, color: string) {
    const t = this.add.text(x, y, msg, {
      fontSize: '18px', color, fontFamily: 'monospace', fontStyle: 'bold',
    }).setOrigin(0.5);
    this.tweens.add({
      targets: t, y: y - 64, alpha: 0, duration: 800, ease: 'Power2',
      onComplete: () => t.destroy(),
    });
  }

  // ─── Update loop ────────────────────────────────────────────────────────

  update(_time: number, delta: number) {
    if (this.gameOverActive) return;

    const speed = getFallSpeed(this.elapsedSeconds);
    const toRemove: Phaser.GameObjects.Container[] = [];

    for (const item of this.activeItems) {
      item.y += (speed * delta) / 1000;
      if (item.y >= PLAY_BOTTOM) {
        if (item.getData('isError') as boolean) {
          this.hp = Math.max(0, this.hp - 10);
          this.redrawHPBar();
          this.flashHitMessage(item.getData('label') as string);
        }
        toRemove.push(item);
        if (this.hp <= 0) { this.removeItem(item); this.endGame(); return; }
      }
    }

    for (const item of toRemove) this.removeItem(item);
  }

  // ─── Achievements ───────────────────────────────────────────────────────

  private processAchievements() {
    const state: GameState = {
      score: this.score,
      errorsDestroyed: this.errorsDestroyed,
      powerupsCollected: this.powerupsCollected,
    };
    const fresh = checkNewAchievements(state, this.unlockedAchievements);
    for (const id of fresh) {
      this.unlockedAchievements.add(id);
      const a = ACHIEVEMENTS.find(x => x.id === id)!;
      this.showAchievementToast(a.name);
    }
    if (fresh.length > 0) saveAchievements(this.unlockedAchievements);
  }

  private showAchievementToast(name: string) {
    const bg = this.add.graphics();
    bg.fillStyle(0x12122a, 0.97);
    bg.fillRoundedRect(0, 0, 270, 56, 8);
    bg.lineStyle(1.5, 0xffd700, 1);
    bg.strokeRoundedRect(0, 0, 270, 56, 8);

    const t1 = this.add.text(12, 8,  '🏆 Achievement Unlocked', { fontSize: '10px', color: '#ffd700', fontFamily: 'monospace' });
    const t2 = this.add.text(12, 26, name,                       { fontSize: '13px', color: '#ffffff', fontFamily: 'monospace', fontStyle: 'bold' });

    const c = this.add.container(W - 282, H + 60, [bg, t1, t2]);
    this.tweens.add({
      targets: c, y: H - 88, duration: 380, ease: 'Back.easeOut',
      onComplete: () => {
        this.time.delayedCall(2500, () => {
          this.tweens.add({
            targets: c, y: H + 60, duration: 280, ease: 'Power2.easeIn',
            onComplete: () => c.destroy(),
          });
        });
      },
    });
  }

  // ─── Game over ──────────────────────────────────────────────────────────

  private endGame() {
    this.gameOverActive = true;
    // destroy remaining items
    for (const item of [...this.activeItems]) item.destroy();
    this.activeItems = [];

    const rank = getScoreRank(this.score);
    const best = loadBestScore();
    if (this.score > best.score) saveBestScore(this.score, rank);

    this.buildGameOverScreen(rank, best.score, best.rank);
  }

  private buildGameOverScreen(rank: string, bestScore: number, bestRank: string) {
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.88);
    overlay.fillRect(0, 0, W, H);

    let y = 130;
    const cx = W / 2;

    this.add.text(cx, y, 'PRODUCTION DOWN', {
      fontSize: '22px', color: '#ff3333', fontFamily: 'monospace', fontStyle: 'bold',
    }).setOrigin(0.5); y += 52;

    this.add.text(cx, y, `Score: ${this.score}`, {
      fontSize: '20px', color: '#ffffff', fontFamily: 'monospace',
    }).setOrigin(0.5); y += 36;

    this.add.text(cx, y, rank, {
      fontSize: '22px', color: '#ffd700', fontFamily: 'monospace', fontStyle: 'bold',
    }).setOrigin(0.5); y += 36;

    this.add.text(cx, y, `Best: ${bestScore}  —  ${bestRank}`, {
      fontSize: '12px', color: '#666666', fontFamily: 'monospace',
    }).setOrigin(0.5); y += 54;

    if (rank === 'CTO') {
      this.add.text(cx, y, '🏆 You have successfully defended production.', {
        fontSize: '13px', color: '#ffd700', fontFamily: 'monospace',
        wordWrap: { width: 340 }, align: 'center',
      }).setOrigin(0.5); y += 58;

      const projBtn = this.makeButton(cx, y, 'View My Projects →', '#00ff88');
      projBtn.on('pointerup', () => {
        const nav = this.registry.get('onNavigate') as ((p: string) => void) | undefined;
        nav?.('/projects');
      });
      y += 56;
    }

    const restartBtn = this.makeButton(cx, y, 'Play Again', '#ffffff');
    restartBtn.on('pointerup', () => this.scene.restart());
  }

  private makeButton(x: number, y: number, label: string, textColor: string): Phaser.GameObjects.Container {
    const draw = (bg: Phaser.GameObjects.Graphics, hover: boolean) => {
      bg.clear();
      bg.fillStyle(hover ? 0x2a2a55 : 0x181830, 1);
      bg.fillRoundedRect(-110, -22, 220, 44, 8);
      bg.lineStyle(1.5, hover ? 0x7777cc : 0x3333aa, 1);
      bg.strokeRoundedRect(-110, -22, 220, 44, 8);
    };

    const bg  = this.add.graphics();
    draw(bg, false);
    const txt = this.add.text(0, 0, label, {
      fontSize: '14px', color: textColor, fontFamily: 'monospace',
    }).setOrigin(0.5);

    const c = this.add.container(x, y, [bg, txt]);
    c.setSize(220, 44).setInteractive({ cursor: 'pointer' });
    c.on('pointerover', () => draw(bg, true));
    c.on('pointerout',  () => draw(bg, false));
    return c;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Game/scenes/MainScene.ts
git commit -m "feat: implement MainScene Phaser game logic"
```

---

## Task 5: PhaserGame React wrapper

**Files:**
- Create: `src/components/Game/PhaserGame.tsx`

- [ ] **Step 1: Create PhaserGame.tsx**

```tsx
// src/components/Game/PhaserGame.tsx
'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function PhaserGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!containerRef.current) return;

    let game: import('phaser').Game;

    (async () => {
      const [Phaser, { MainScene }] = await Promise.all([
        import('phaser'),
        import('./scenes/MainScene'),
      ]);

      if (!containerRef.current) return;

      game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 480,
        height: 640,
        backgroundColor: '#0a0a10',
        parent: containerRef.current,
        scene: MainScene,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      });

      game.registry.set('onNavigate', (path: string) => router.push(path));
    })();

    return () => {
      game?.destroy(true);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: 480, height: 640 }}
      className="rounded-lg overflow-hidden"
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Game/PhaserGame.tsx
git commit -m "feat: add PhaserGame React wrapper"
```

---

## Task 6: GameModal overlay

**Files:**
- Create: `src/components/Game/GameModal.tsx`

- [ ] **Step 1: Create GameModal.tsx**

```tsx
// src/components/Game/GameModal.tsx
'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const PhaserGame = dynamic(() => import('./PhaserGame'), { ssr: false });

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function GameModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-9 right-0 text-white/70 text-xl font-bold hover:text-red-400 transition-colors leading-none"
          aria-label="Close game"
        >
          ✕ close
        </button>
        <PhaserGame />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Game/GameModal.tsx
git commit -m "feat: add GameModal overlay"
```

---

## Task 7: Wire up MovingChara trigger in me/page.tsx

`me/page.tsx` is a server component. The open/close state must live in a client component. Create `GameTrigger.tsx` to own that state, then swap it in.

**Files:**
- Create: `src/components/Game/GameTrigger.tsx`
- Modify: `src/app/me/page.tsx`

- [ ] **Step 1: Create GameTrigger.tsx**

```tsx
// src/components/Game/GameTrigger.tsx
'use client';
import { useState } from 'react';
import MovingChara from '@/components/MovingChara';
import GameModal from './GameModal';

export default function GameTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 h-44 overflow-hidden cursor-pointer"
        onClick={() => setOpen(true)}
        title="Click me!"
      >
        <MovingChara />
      </div>
      <GameModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
```

- [ ] **Step 2: Update me/page.tsx**

Open `src/app/me/page.tsx`. Replace:

```tsx
import MovingChara from "@/components/MovingChara";
```

with:

```tsx
import GameTrigger from "@/components/Game/GameTrigger";
```

Then replace:

```tsx
      <div className="fixed bottom-0 left-0 right-0 h-44 overflow-hidden pointer-events-none">
        <MovingChara />
      </div>
```

with:

```tsx
      <GameTrigger />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Game/GameTrigger.tsx src/app/me/page.tsx
git commit -m "feat: wire up game trigger on MovingChara click"
```

---

## Task 8: Smoke test in browser

- [ ] **Step 1: Run dev server**

```bash
npm run dev
```

- [ ] **Step 2: Open http://localhost:3000/me**

Verify:
- Moving character walks across bottom of screen
- Cursor changes to pointer when hovering character
- Clicking character opens the modal

- [ ] **Step 3: Verify game canvas loads**

Verify:
- Black canvas with HUD (score, rank, mute icon, HP bar) appears
- Production Server section visible at bottom
- Errors and powerups begin falling after ~1.5s
- Items have uniform styled containers (not raw text)

- [ ] **Step 4: Verify click interactions**

Verify:
- Clicking an error destroys it and shows floating `+10`
- Clicking a powerup destroys it and shows `+5 HP`
- Missing errors triggers hit message at bottom and reduces HP bar
- HP bar changes color green → yellow → red as HP decreases

- [ ] **Step 5: Verify game over**

Let HP hit 0. Verify:
- Game over screen appears with score + rank title
- "Play Again" restarts the game
- If score ≥ 300 (CTO), the projects link appears

- [ ] **Step 6: Verify modal close**

Verify:
- X button closes modal
- Clicking backdrop closes modal
- Pressing Escape closes modal
- Reopening modal starts a fresh game

- [ ] **Step 7: Verify localStorage persistence**

Play once, note best score. Close modal, reopen, trigger game over. Verify best score from prior session appears on game over screen.

- [ ] **Step 8: Run build to confirm no TS errors**

```bash
npm run build
```

Expected: exits 0 with no TypeScript errors.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: error catcher game complete"
```
