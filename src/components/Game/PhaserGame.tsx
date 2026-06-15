'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function PhaserGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;
    let game: import('phaser').Game | null = null;

    (async () => {
      const [Phaser, { MainScene }] = await Promise.all([
        import('phaser'),
        import('./scenes/MainScene'),
      ]);

      if (cancelled || !containerRef.current) return;

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
      cancelled = true;
      game?.destroy(true);
      game = null;
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
