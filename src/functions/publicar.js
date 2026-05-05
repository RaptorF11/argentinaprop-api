const { app } = require('@azure/functions');
const { badRequest, noContent, ok, serverError } = require('../lib/responses');
const { getSupabaseClient } = require('../lib/supabaseClient');

async function parseJson(request) {
  try {
    return await request.json();
  } catch (error) {
    return null;
  }
}

function toNumber(value) {
  const number = Number(value || 0);
  return Number.isFinite(number) ? number : 0;
}

function buildProperty(body) {
  return {
    title: body.title || 'Propiedad sin titulo',
    description: body.description || 'Consultar descripcion',
    price: toNumber(body.price),
    currency: body.currency || 'USD',
    operation: body.operation || 'venta',
    type: body.type || 'departamento',
    location: body.location || body.address || body.neighborhood || 'Consultar',
    rooms: toNumber(body.rooms),
    bedrooms: toNumber(body.bedrooms),
    bathrooms: toNumber(body.bathrooms),
    area: toNumber(body.area || body.total_area || body.covered_area),
    amenities: Array.isArray(body.amenities) ? body.amenities : [],
    images: Array.isArray(body.images) ? body.images : [],
    status: body.status || 'active',
    featured: Boolean(body.featured || false),
    created_at: new Date().toISOString()
  };
}

app.http('publicar', {
  methods: ['GET', 'POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    try {
      if (request.method === 'OPTIONS') return noContent();

      if (request.method === 'GET') {
        return ok({ ok: true, message: 'Backend ArgentinaProp activo' });
      }

      const body = await parseJson(request);
      if (!body) return badRequest('Invalid JSON body');

      const supabase = getSupabaseClient();
      const nuevaPropiedad = buildProperty(body);

      const { data, error } = await supabase
        .from('properties')
        .insert([nuevaPropiedad])
        .select()
        .single();

      if (error) throw error;

      return ok({ ok: true, property: data });
    } catch (error) {
      context.log('PUBLICAR ERROR:', error.message);
      return serverError('Error interno del servidor');
    }
  }
});
