const API = process.env.NASA_API_KEY; // keep secret server-side

exports.handler = async function(event) {
  if (!API) {
    return { statusCode: 500, body: 'Missing NASA_API_KEY' };
  }

  const p = event.queryStringParameters || {};
  const rover = p.rover || 'perseverance';
  const type  = p.type  || 'manifest';
  const sol   = p.sol;

  let url;
  if (type === 'manifest') {
    url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${API}`;
  } else if (type === 'latest') {
    url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${API}`;
  } else if (type === 'photos' && sol != null) {
    url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${encodeURIComponent(sol)}&api_key=${API}`;
  } else {
    return { statusCode: 400, body: 'Bad params' };
  }

  try {
    const res = await fetch(url);
    const body = await res.text();
    return {
      statusCode: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300'
      },
      body
    };
  } catch (err) {
    return { statusCode: 502, body: 'Upstream fetch failed: ' + String(err) };
  }
};
