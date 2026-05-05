const { app } = require('@azure/functions');
const { createClient } = require('@supabase/supabase-js');

app.http('publicar', {
  methods: ['GET', 'POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    try {
      if (request.method === 'OPTIONS') return { status: 204, headers: corsHeaders };

      if (request.method === 'GET') {
        return {
          status: 200,
          headers: corsHeaders,
          jsonBody: { ok: true, message: 'Backend ArgentinaProp activo' }
        };
      }

      const body = await request.json();

      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_KEY
      );

      const nuevaPropiedad = {
        title: body.title || 'Propiedad sin título',
        description: body.description || 'Consultar descripción',
        price: Number(body.price || 0),
        currency: body.currency || 'USD',
        operation: body.operation || 'venta',
        type: body.type || 'departamento',
        address: body.address || body.location || 'Sin dirección',
        city: body.city || 'Buenos Aires',
        state: body.state || 'Buenos Aires',
        neighborhood: body.neighborhood || body.location || 'Consultar',
        total_area: Number(body.total_area || body.area || 0),
        covered_area: Number(body.covered_area || body.area || 0),
        rooms: Number(body.rooms || 0),
        bedrooms: Number(body.bedrooms || 0),
        bathrooms: Number(body.bathrooms || 0),
        garages: Number(body.garages || 0),
        amenities: Array.isArray(body.amenities) ? body.amenities : [],
        images_urls: Array.isArray(body.images_urls) ? body.images_urls : [],
        status: body.status || 'active',
        featured: Boolean(body.featured || false),
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('properties')
        .insert([nuevaPropiedad])
        .select()
        .single();

      if (error) throw error;

      return {
        status: 200,
        headers: corsHeaders,
        jsonBody: { ok: true, property: data }
      };
    } catch (error) {
      context.log('PUBLICAR ERROR:', error.message);
      return {
        status: 500,
        headers: corsHeaders,
        jsonBody: { ok: false, error: error.message }
      };
    }
  }
});
