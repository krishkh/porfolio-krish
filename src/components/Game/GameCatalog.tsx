'use client';
import { useEffect } from 'react';

interface Game {
  id: string;
  title: string;
  description: string;
  tag: string;
}

const GAMES: Game[] = [
  {
    id: 'error-catcher',
    title: 'Error Catcher',
    description: 'Defend the production server from falling bugs. Let powerups through, destroy errors.',
    tag: 'arcade',
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onSelectGame: (id: string) => void;
}

export default function GameCatalog({ open, onClose, onSelectGame }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-[#0a0a14] border border-white/10 rounded-xl p-6 w-[360px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white/40 hover:text-white/80 transition-colors text-lg leading-none"
          aria-label="Close catalog"
        >
          ✕
        </button>

        <h2 className="text-white font-mono font-bold text-lg mb-1">🕹 Arcade</h2>
        <p className="text-white/30 font-mono text-xs mb-5">hidden easter eggs — click to play</p>

        <ul className="flex flex-col gap-3">
          {GAMES.map((game) => (
            <li key={game.id}>
              <button
                onClick={() => { onClose(); onSelectGame(game.id); }}
                className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/40 rounded-lg px-4 py-3 transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-mono font-semibold text-sm group-hover:text-green-400 transition-colors">
                    {game.title}
                  </span>
                  <span className="text-[10px] font-mono text-white/30 border border-white/10 rounded px-1.5 py-0.5">
                    {game.tag}
                  </span>
                </div>
                <p className="text-white/40 font-mono text-xs leading-relaxed">{game.description}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
