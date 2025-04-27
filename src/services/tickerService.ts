import axios from 'axios';
import https from 'https';
import type { Game } from '../types/Game'; // ← relative path keeps tsc happy

/* ──────────────────────────────────────────────────────────── */
/*  Config                                                     */
/* ──────────────────────────────────────────────────────────── */

const API_BASE =
  process.env.NEXT_PUBLIC_TICKER_API ??
  'https://api.sportifyinsider.com/api/v1/ticker';

console.log('🔗 Using Ticker API Base URL (Init):', API_BASE);

const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10_000,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }), // dev-only
});

/* ──────────────────────────────────────────────────────────── */
/*  Public helper                                              */
/* ──────────────────────────────────────────────────────────── */

export async function fetchTickerData(
  league: string = '',
  limit: number = 5,
): Promise<Game[]> {
  const fullURL = `${API_BASE}?league=${league}&limit=${limit}`;

  if (process.env.NODE_ENV === 'development') {
    console.log('🟢 Final Request URL:', fullURL);
  }

  try {
    const res = await axiosInstance.get<Game[]>('', {
      params: { league, limit },
    });
    return res.data;
  } catch (err: unknown) {
    /*  ESLint: @typescript-eslint/no-explicit-any compliant  */
    if (err instanceof Error) {
      console.error('❌ Error fetching ticker data:', err.message);
    } else {
      console.error('❌ Error fetching ticker data:', err);
    }
    return [];
  }
}
