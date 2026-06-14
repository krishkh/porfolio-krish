import { BestScore, GameState } from './types';

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
  const increments = Math.floor(Math.max(elapsedSeconds, 0) / 30);
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
