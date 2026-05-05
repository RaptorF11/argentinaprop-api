const { corsHeaders } = require('./cors');

function noContent() {
  return {
    status: 204,
    headers: corsHeaders
  };
}

function ok(jsonBody) {
  return {
    status: 200,
    headers: corsHeaders,
    jsonBody
  };
}

function badRequest(message) {
  return {
    status: 400,
    headers: corsHeaders,
    jsonBody: {
      ok: false,
      error: message
    }
  };
}

function serverError(message = 'Internal server error') {
  return {
    status: 500,
    headers: corsHeaders,
    jsonBody: {
      ok: false,
      error: message
    }
  };
}

module.exports = {
  badRequest,
  noContent,
  ok,
  serverError
};
