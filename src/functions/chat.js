const { app } = require('@azure/functions');
const { badRequest, noContent, ok } = require('../lib/responses');
const { corsHeaders } = require('../lib/cors');

function getOpenAIConfig() {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview';

  if (!endpoint || !apiKey || !deployment) {
    throw new Error('Missing Azure OpenAI configuration');
  }

  return {
    endpoint: endpoint.replace(/\/+$/, ''),
    apiKey,
    deployment,
    apiVersion
  };
}

async function parseJson(request) {
  try {
    return await request.json();
  } catch (error) {
    return null;
  }
}

function buildMessages(body) {
  if (Array.isArray(body.messages) && body.messages.length > 0) {
    return body.messages;
  }

  if (typeof body.message === 'string' && body.message.trim()) {
    return [
      {
        role: 'user',
        content: body.message.trim()
      }
    ];
  }

  return null;
}

function chatServerError() {
  return {
    status: 500,
    headers: corsHeaders,
    jsonBody: {
      reply: 'Error interno del servidor.'
    }
  };
}

app.http('chat', {
  methods: ['GET', 'POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    try {
      if (request.method === 'OPTIONS') return noContent();

      if (request.method === 'GET') {
        return ok({ ok: true, message: 'Chat ArgentinaProp activo' });
      }

      const body = await parseJson(request);
      if (!body) return badRequest('Invalid JSON body');

      const messages = buildMessages(body);
      if (!messages) return badRequest('Missing message or messages');

      const { endpoint, apiKey, deployment, apiVersion } = getOpenAIConfig();
      const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey
        },
        body: JSON.stringify({
          messages,
          temperature: Number.isFinite(Number(body.temperature)) ? Number(body.temperature) : 0.7,
          max_tokens: Number.isFinite(Number(body.max_tokens)) ? Number(body.max_tokens) : 500
        })
      });

      const data = await response.json();

      if (!response.ok) {
        context.log('CHAT AZURE OPENAI ERROR:', JSON.stringify(data));
        return chatServerError();
      }

      const reply = data.choices?.[0]?.message?.content || '';
      return ok({ reply });
    } catch (error) {
      context.log('CHAT ERROR:', error.message);
      return chatServerError();
    }
  }
});
