export default async function handler(request) {
  const API_BASE = 'https://api.marsvista.dev/api/v1';
  const API_KEY = process.env.MARS_API_KEY;

  const url = new URL(request.url);
  const endpoint = url.searchParams.get('endpoint');

  if (!API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Mars Vista API key is not configured.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  if (!endpoint) {
    return new Response(
      JSON.stringify({ error: 'Missing endpoint.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'X-API-Key': API_KEY,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to contact Mars Vista API.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}