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
