// src/services/tickerService.ts
import axios from 'axios';
import type { Game } from '../types/Game';

/**
 * In development we hit our local functions proxy at /api/ticker.
 * In production we hit the same path, which you’ve mapped to /.netlify/functions/ticker.
 */
const API_BASE =
  process.env.NEXT_PUBLIC_TICKER_API ??
  '/api/ticker';

console.log('🔗 Using Ticker API Base URL (Init):', API_BASE);

const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10_000,
});

export async function fetchTickerData(
  league = '',
  limit = 5,
): Promise<Game[]> {
  try {
    // this will call e.g. GET /api/ticker?league=nba&limit=5
    const res = await axiosInstance.get<Game[]>('', {
      params: { league, limit },
    });
    console.log(
      '🟢 fetchTickerData URL:',
      `${API_BASE}?league=${league}&limit=${limit}`,
    );
    return res.data;
  } catch (err: unknown) {
    console.error(
      '❌ Error fetching ticker data:',
      err instanceof Error ? err.message : err,
    );
    return [];
  }
}
