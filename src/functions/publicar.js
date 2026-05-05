const { app } = require('@azure/functions');
const { createClient } = require('@supabase/supabase-js');

app.http('publicar', {
  methods: ['GET', 'POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    try {
      if (request.method === 'OPTIONS') {
        return {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        };
      }

      if (request.method === 'GET') {
        return {
          status: 200,
          headers: { 'Access-Control-Allow-Origin': '*' },
          jsonBody: {
            ok: true,
            message: 'Backend ArgentinaProp activo'
          }
        };
      }

      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Faltan SUPABASE_URL o SUPABASE_SERVICE_KEY en Azure.');
      }

      const supabase = createClient(supabaseUrl, supabaseKey);
      const body = await request.json();

      const nuevaPropiedad = {
        title: body.title || 'Propiedad sin título',
        description: body.description || 'Consultar descripción.',
        price: body.price || 0,
        currency: body.currency || 'USD',
        operation: body.operation || 'venta',
        type: body.type || 'departamento',

        address: body.address  body.location  'Sin dirección',
        city: body.city  body.location  'Buenos Aires',
        state: body.state || 'Buenos Aires',
        neighborhood: body.neighborhood  body.location  'Consultar',

        total_area: body.total_area || 0,
        covered_area: body.covered_area || 0,
        rooms: body.rooms || 0,
        bedrooms: body.bedrooms || 0,
        bathrooms: body.bathrooms || 0,
        garages: body.garages || 0,

        amenities: Array.isArray(body.amenities) ? body.amenities : [],
        images_urls: Array.isArray(body.images_urls) ? body.images_urls : [],

        status: body.status || 'active',
        featured: body.featured || false,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('properties')
        .insert([nuevaPropiedad])
        .select()
        .single();

      if (error) {
        context.log('SUPABASE ERROR:', error.message);
        return {
          status: 500,
          headers: { 'Access-Control-Allow-Origin': '*' },
          jsonBody: { ok: false, error: error.message }
        };
      }

      return {
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        jsonBody: { ok: true, property: data }
      };

    } catch (err) {
      context.log('GENERAL ERROR:', err.message);
      return {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        jsonBody: { ok: false, error: err.message }
      };
    }
  }
});