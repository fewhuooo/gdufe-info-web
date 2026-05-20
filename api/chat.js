const DEFAULT_EXTERNAL_CHAT_API_URL = 'https://api.utopiacd.online/api/external/chat';

module.exports = async function handler(req, res) {
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

  const isStreamingRequest = req.body?.stream !== false;

  const writeStreamEvent = (payload) => {
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };

  try {
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');

    if (isStreamingRequest) {
      res.status(200);
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.write(': connected\n\n');
      res.flushHeaders?.();
    }

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

    if (!isStreamingRequest) {
      res.status(upstreamResponse.status);
    }

    const contentType = upstreamResponse.headers.get('content-type');
    if (contentType && !res.headersSent) {
      res.setHeader('Content-Type', contentType);
    }

    if (!upstreamResponse.ok) {
      const errorText = await upstreamResponse.text().catch(() => '');
      if (isStreamingRequest) {
        writeStreamEvent({
          content: `抱歉，知识库服务返回异常（${upstreamResponse.status}）。请稍后再试。`
        });
        res.write('data: [DONE]\n\n');
        res.end();
        return;
      }

      res.status(upstreamResponse.status).json({
        error: 'External chat API failed',
        status: upstreamResponse.status,
        detail: errorText.slice(0, 500)
      });
      return;
    }

    if (!upstreamResponse.body) {
      if (isStreamingRequest) {
        res.write('data: [DONE]\n\n');
      }
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
    if (isStreamingRequest) {
      res.write('data: [DONE]\n\n');
    }
    res.end();
  } catch (error) {
    console.error('Chat proxy failed:', error);
    if (isStreamingRequest && res.headersSent) {
      writeStreamEvent({
        content: '抱歉，知识库问答服务暂时无法响应。请稍后再试，或联系网站管理员检查接口配置。'
      });
      res.write('data: [DONE]\n\n');
      res.end();
      return;
    }

    res.status(502).json({
      error: 'Chat proxy failed',
      detail: error instanceof Error ? error.message : String(error)
    });
  }
};
