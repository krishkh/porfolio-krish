'use client';
import { useState } from 'react';
import MovingChara from '@/components/MovingChara';
import GameCatalog from './GameCatalog';
import GameModal from './GameModal';

export default function GameTrigger() {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);

  function handleSelectGame(id: string) {
    if (id === 'error-catcher') setGameOpen(true);
  }

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 h-44 overflow-hidden cursor-pointer"
        onClick={() => setCatalogOpen(true)}
        title="Click me!"
      >
        <MovingChara />
      </div>
      <GameCatalog
        open={catalogOpen}
        onClose={() => setCatalogOpen(false)}
        onSelectGame={handleSelectGame}
      />
      <GameModal open={gameOpen} onClose={() => setGameOpen(false)} />
    </>
  );
}
