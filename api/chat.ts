const DEFAULT_EXTERNAL_CHAT_API_URL = 'https://api.utopiacd.online/api/external/chat';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.EXTERNAL_CHAT_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Missing EXTERNAL_CHAT_API_KEY' });
    return;
  }

  try {
    const upstreamResponse = await fetch(
      process.env.EXTERNAL_CHAT_API_URL || DEFAULT_EXTERNAL_CHAT_API_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        },
        body: JSON.stringify(req.body)
      }
    );

    res.status(upstreamResponse.status);

    const contentType = upstreamResponse.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    if (!upstreamResponse.body) {
      res.end();
      return;
    }

    const reader = upstreamResponse.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }

    res.write(decoder.decode());
    res.end();
  } catch (error) {
    console.error('Chat proxy failed:', error);
    res.status(502).json({ error: 'Chat proxy failed' });
  }
}
