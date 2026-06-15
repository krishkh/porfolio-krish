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
const PLAY_BOTTOM = 520;
const ITEM_W = 250;
const ITEM_H = 52;

const ERROR_ICONS: Record<string, string> = {
  '500 Internal Error': '💥',
  'Memory Leak': '🔥',
  'Null Reference': '🚫',
  'DB Timeout': '⏱',
  'Merge Conflict': '⚔️',
  'Missing Env Var': '❓',
  'Infinite Loop': '♾️',
};

const POWERUP_ICONS: Record<string, string> = {
  'CI/CD Fix': '🚀',
  'Unit Tests': '🧪',
  'Monitoring Alert': '🔔',
  'DB Backup': '💾',
  'Coffee': '☕',
};

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

    this.buildBackground();
    this.buildHUD();
    this.buildServerVisual();
    this.startElapsedClock();
    this.scheduleSpawn();
  }

  private buildBackground() {
    const grid = this.add.graphics();
    grid.lineStyle(1, 0x111133, 0.5);
    for (let x = 0; x <= W; x += 40) grid.lineBetween(x, PLAY_TOP, x, PLAY_BOTTOM);
    for (let y = PLAY_TOP; y <= PLAY_BOTTOM; y += 40) grid.lineBetween(0, y, W, y);
  }

  private buildHUD() {
    const hudBg = this.add.graphics();
    hudBg.fillStyle(0x080810, 0.98);
    hudBg.fillRect(0, 0, W, PLAY_TOP - 4);
    hudBg.setDepth(9);

    this.scoreLabel = this.add.text(14, 8, 'Score: 0', {
      fontSize: '15px', color: '#ffffff', fontFamily: 'monospace', fontStyle: 'bold',
    }).setDepth(10);

    this.rankLabel = this.add.text(W / 2, 8, 'Junior Developer', {
      fontSize: '12px', color: '#7788aa', fontFamily: 'monospace',
    }).setOrigin(0.5, 0).setDepth(10);

    this.add.text(14, 30, '🛡 SERVER HP', {
      fontSize: '9px', color: '#445566', fontFamily: 'monospace',
    }).setDepth(10);

    this.muteBtn = this.add.text(W - 14, 44, this.soundEnabled ? '🔊' : '🔇', {
      fontSize: '15px',
    }).setOrigin(1, 0.5).setInteractive({ cursor: 'pointer' }).setDepth(11);

    this.muteBtn.on('pointerup', () => {
      this.soundEnabled = !this.soundEnabled;
      saveSoundEnabled(this.soundEnabled);
      this.muteBtn.setText(this.soundEnabled ? '🔊' : '🔇');
    });

    const hpBg = this.add.graphics().setDepth(9);
    hpBg.fillStyle(0x111122);
    hpBg.fillRoundedRect(14, 44, W - 56, 16, 3);
    hpBg.lineStyle(1, 0x223344, 1);
    hpBg.strokeRoundedRect(14, 44, W - 56, 16, 3);

    this.hpBarFill = this.add.graphics();
    this.redrawHPBar();
    this.hpBarFill.setDepth(10);
  }

  private redrawHPBar() {
    this.hpBarFill.clear();
    const pct = Math.max(0, this.hp) / 100;
    const color = pct > 0.6 ? 0x00ff88 : pct > 0.3 ? 0xffcc00 : 0xff3333;
    this.hpBarFill.fillStyle(color, 0.9);
    this.hpBarFill.fillRoundedRect(14, 44, (W - 56) * pct, 16, 3);
  }

  private buildServerVisual() {
    const bg = this.add.graphics().setDepth(9);
    bg.fillStyle(0x050509, 1);
    bg.fillRect(0, PLAY_BOTTOM, W, H - PLAY_BOTTOM);

    // Separator glow line
    const sep = this.add.graphics().setDepth(9);
    sep.lineStyle(2, 0x00ff88, 0.6);
    sep.lineBetween(0, PLAY_BOTTOM, W, PLAY_BOTTOM);

    // Server rack chassis
    const rx = 30, ry = PLAY_BOTTOM + 10, rw = W - 60, rh = 58;
    const rack = this.add.graphics().setDepth(10);
    rack.fillStyle(0x0c0c1a, 1);
    rack.fillRoundedRect(rx, ry, rw, rh, 5);
    rack.lineStyle(1.5, 0x00cc66, 0.9);
    rack.strokeRoundedRect(rx, ry, rw, rh, 5);

    // Drive bay slots (decorative lines)
    rack.lineStyle(1, 0x112233, 0.8);
    for (let i = 1; i < 4; i++) {
      rack.lineBetween(rx + rw * 0.28, ry + i * (rh / 4), rx + rw * 0.9, ry + i * (rh / 4));
    }

    // Server label
    this.add.text(rx + 12, ry + 8, '🖥  PRODUCTION SERVER', {
      fontSize: '12px', color: '#00ff88', fontFamily: 'monospace', fontStyle: 'bold',
    }).setDepth(11);

    this.add.text(rx + 12, ry + 30, 'status: online  |  uptime: 99.9%', {
      fontSize: '9px', color: '#336644', fontFamily: 'monospace',
    }).setDepth(11);

    // LED indicator row
    const ledData = [
      { color: 0x00ff88, blink: false },
      { color: 0x00ff88, blink: false },
      { color: 0xffcc00, blink: true },
      { color: 0x00aaff, blink: false },
    ];
    ledData.forEach(({ color, blink }, i) => {
      const led = this.add.graphics().setDepth(11);
      led.fillStyle(color, 1);
      led.fillCircle(rx + 14 + i * 16, ry + 49, 4);
      if (blink) {
        this.tweens.add({ targets: led, alpha: 0.15, duration: 700, yoyo: true, repeat: -1 });
      }
    });

    // HDD activity light (rapid blink)
    const hdd = this.add.graphics().setDepth(11);
    hdd.fillStyle(0x00ccff, 1);
    hdd.fillRect(rx + rw - 22, ry + 42, 12, 7);
    this.tweens.add({ targets: hdd, alpha: 0.05, duration: 180, yoyo: true, repeat: -1 });

    this.hitMsg = this.add.text(W / 2, PLAY_BOTTOM + 76, '', {
      fontSize: '11px', color: '#ff4444', fontFamily: 'monospace',
    }).setOrigin(0.5, 0).setAlpha(0).setDepth(11);
  }

  private flashHitMessage(label: string) {
    this.hitMsg.setText(`${label} hit Production! −10 HP`).setAlpha(1);
    this.tweens.add({
      targets: this.hitMsg, alpha: 0, delay: 1400, duration: 400,
    });
  }

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
    const border  = isError ? 0xff4444 : 0x00ff88;
    const fill    = isError ? 0x1a0505 : 0x05180d;
    const txtColor = isError ? '#ffaaaa' : '#aaffcc';
    const icon = isError
      ? (ERROR_ICONS[label] ?? '⚠️')
      : (POWERUP_ICONS[label] ?? '✨');

    // Outer glow
    const glow = this.add.graphics();
    glow.lineStyle(6, border, 0.18);
    glow.strokeRoundedRect(-ITEM_W / 2 - 4, -ITEM_H / 2 - 4, ITEM_W + 8, ITEM_H + 8, 9);

    const bg = this.add.graphics();
    bg.fillStyle(fill, 1);
    bg.fillRoundedRect(-ITEM_W / 2, -ITEM_H / 2, ITEM_W, ITEM_H, 6);
    bg.lineStyle(1.5, border, 1);
    bg.strokeRoundedRect(-ITEM_W / 2, -ITEM_H / 2, ITEM_W, ITEM_H, 6);

    const iconText = this.add.text(-ITEM_W / 2 + 14, 0, icon, {
      fontSize: '18px',
    }).setOrigin(0.5);

    const labelText = this.add.text(-ITEM_W / 2 + 30, 0, label, {
      fontSize: '12px', color: txtColor, fontFamily: 'monospace',
    }).setOrigin(0, 0.5);

    const c = this.add.container(x, y, [glow, bg, iconText, labelText]);
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
          if (this.hp <= 0) { toRemove.push(item); break; }
        }
        toRemove.push(item);
      }
    }

    for (const item of toRemove) this.removeItem(item);
    if (this.hp <= 0) this.endGame();
  }

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
          if (this.gameOverActive) { c.destroy(); return; }
          this.tweens.add({
            targets: c, y: H + 60, duration: 280, ease: 'Power2.easeIn',
            onComplete: () => c.destroy(),
          });
        });
      },
    });
  }

  private endGame() {
    this.gameOverActive = true;
    for (const item of [...this.activeItems]) item.destroy();
    this.activeItems = [];

    const rank = getScoreRank(this.score);
    const prevBest = loadBestScore();
    if (this.score > prevBest.score) saveBestScore(this.score, rank);
    const displayBest = this.score > prevBest.score
      ? { score: this.score, rank }
      : prevBest;

    this.buildGameOverScreen(rank, displayBest.score, displayBest.rank);
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
