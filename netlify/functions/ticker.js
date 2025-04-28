// netlify/functions/ticker.js

exports.handler = async function(event, context) {
    // dynamically import fetch from node-fetch (v3+ is ESM-only)
    const { default: fetch } = await import('node-fetch');
  
    // rebuild the raw query string, e.g. "?league=nba&limit=5"
    const qs = event.rawQueryString ? `?${event.rawQueryString}` : '';
    const upstreamUrl = `https://api.sportifyinsider.com/api/v1/ticker${qs}`;
  
    try {
      const apiRes = await fetch(upstreamUrl, { timeout: 10_000 });
      const body   = await apiRes.text();
      const contentType = apiRes.headers.get('content-type') || 'application/json';
  
      return {
        statusCode: apiRes.status,
        headers: { 'Content-Type': contentType },
        body,
      };
    } catch (err) {
      console.error('[ticker λ] upstream error:', err);
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Bad Gateway' }),
      };
    }
  };
  