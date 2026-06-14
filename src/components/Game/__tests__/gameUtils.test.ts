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
