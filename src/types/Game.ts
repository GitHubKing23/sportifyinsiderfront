/**
 * Shared shape for every game returned by the ticker API.
 * Having the `export` keyword makes this file an ES-module,
 * so it may be imported with `import type { Game } from '@types/Game'`.
 */
export interface Game {
    league: string;
    home: string;
    away: string;
    homeScore: string;
    awayScore: string;
    homeLogo: string;
    awayLogo: string;
    status: string;
    startTime?: string;
  }
  
  /* keep the file in module scope */
  export {};
  