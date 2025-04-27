export {};             // keep module scope

import React, { useEffect, useState } from 'react';
import { fetchTickerData } from '../services/tickerService';
import type { Game } from '../types/Game';  // ← use relative path

const leagues = ['ALL', 'NBA', 'NFL', 'NHL', 'MLB'] as const;
type LeagueOption = (typeof leagues)[number];

const badgeColor: Record<string, string> = {
  nba: 'bg-purple-600',
  nfl: 'bg-green-600',
  nhl: 'bg-blue-600',
  mlb: 'bg-red-600',
};

const LiveTicker: React.FC = () => {
  const [selected, setSelected] = useState<LeagueOption>('ALL');
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    loadTicker();
    const id = setInterval(loadTicker, 30_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const loadTicker = async () => {
    const leagueParam = selected === 'ALL' ? '' : selected.toLowerCase();
    const data = await fetchTickerData(leagueParam, 20);
    setGames(data);
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-[999] text-white">
      {/* toggle */}
      <div className="flex gap-4 px-4 py-1 bg-black/90 border-b border-gray-700">
        {leagues.map(opt => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={
              'text-xs font-semibold transition-colors ' +
              (opt === selected
                ? 'text-yellow-300 underline'
                : 'text-gray-400 hover:text-white')
            }
          >
            {opt}
          </button>
        ))}
      </div>

      {/* ticker */}
      <div className="h-10 flex items-center overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900">
        {games.length === 0 ? (
          <div className="w-full text-center text-gray-400 text-sm">
            No games for {selected === 'ALL' ? 'any league' : selected}.
          </div>
        ) : (
          <div className="whitespace-nowrap animate-marquee text-sm">
            {games.map((g, idx) => (
              <span key={idx} className="mx-6">
                <span
                  className={`text-[10px] px-1 mr-2 rounded ${
                    badgeColor[g.league] ?? 'bg-gray-700'
                  }`}
                >
                  {g.league.toUpperCase()}
                </span>
                {g.home} {g.homeScore} – {g.awayScore} {g.away}{' '}
                <span className="text-gray-400">({g.status})</span>
                {idx !== games.length - 1 && (
                  <span className="inline-block w-px h-4 bg-gray-500 animate-pulse mx-4" />
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveTicker;
