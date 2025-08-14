// netlify/functions/nasa.js
exports.handler = async (event) => {
  try {
    const API = process.env.NASA_API_KEY;

    // Health check: /.netlify/functions/nasa?health=1
    if (event.queryStringParameters?.health === '1') {
      return json(200, { ok: true, hasKey: Boolean(API), node: process.version });
    }

    if (!API) {
      const msg = 'Server not configured: set NASA_API_KEY in Netlify env vars and redeploy.';
      console.error(msg);
      return json(500, { error: msg });
    }

    const p = event.queryStringParameters || {};
    const rover = p.rover || 'perseverance';
    const type  = p.type  || 'manifest';
    const sol   = p.sol;

    let url;
    if (type === 'manifest') {
      url = new URL(`https://api.nasa.gov/mars-photos/api/v1/manifests/${encodeURIComponent(rover)}`);
      url.searchParams.set('api_key', API);
    } else if (type === 'latest') {
      url = new URL(`https://api.nasa.gov/mars-photos/api/v1/rovers/${encodeURIComponent(rover)}/latest_photos`);
      url.searchParams.set('api_key', API);
    } else if (type === 'photos' && sol) {
      url = new URL(`https://api.nasa.gov/mars-photos/api/v1/rovers/${encodeURIComponent(rover)}/photos`);
      url.searchParams.set('sol', String(sol));
      url.searchParams.set('api_key', API);
    } else {
      return json(400, { error: 'Bad params' });
    }

    // Safe log (redacts key)
    const safe = new URL(url.toString());
    safe.searchParams.set('api_key', '***');
    console.log('Calling NASA:', safe.toString());

    const res = await fetch(url);
    const text = await res.text();

    if (!res.ok) {
      console.error('NASA error', res.status, text.slice(0, 300));
    }

    return {
      statusCode: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300'
      },
      body: text
    };
  } catch (err) {
    console.error('Function error:', err);
    return json(500, { error: 'Internal server error' });
  }
};

function json(status, obj) {
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(obj)
  };
}
