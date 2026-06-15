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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 text-white/70 text-sm font-bold hover:text-red-400 transition-colors leading-none bg-black/40 rounded px-2 py-1"
          aria-label="Close game"
        >
          ✕ close
        </button>
        <PhaserGame />
      </div>
    </div>
  );
}
