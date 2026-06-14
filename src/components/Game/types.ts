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
