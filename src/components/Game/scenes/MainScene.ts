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

  private buildServerVisual() {
    const bg = this.add.graphics();
    bg.fillStyle(0x080810, 0.95);
    bg.fillRect(0, PLAY_BOTTOM, W, H - PLAY_BOTTOM);

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

  private endGame() {
    this.gameOverActive = true;
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
