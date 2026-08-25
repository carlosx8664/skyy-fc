import React from 'react';

interface SquadSeasonSelectorProps {
  currentSeason: string;
  onSeasonChange: (season: string) => void;
  isDarkMode: boolean;
  availableSeasons: string[];
}

export const SquadSeasonSelector = ({ 
  currentSeason, 
  onSeasonChange, 
  isDarkMode,
  availableSeasons 
}: SquadSeasonSelectorProps) => {
  // If no seasons available, show default options
  const seasons = availableSeasons.length > 0 
    ? availableSeasons 
    : ['2025/26', '2026/27'];
  
  return (
    <div className="flex gap-2 flex-wrap">
      {seasons.map(season => (
        <button
          key={season}
          onClick={() => onSeasonChange(season)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border-2
            ${currentSeason === season
              ? 'text-black border-[#EFDC43] bg-[#EFDC43]'
              : isDarkMode
                ? 'text-white border-white/20 bg-transparent hover:border-white/50'
                : 'text-zinc-700 border-zinc-300 bg-transparent hover:border-zinc-500'}`}
        >
          {season}
        </button>
      ))}
    </div>
  );
};