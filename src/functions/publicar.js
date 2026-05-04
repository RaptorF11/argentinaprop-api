const { app } = require('@azure/functions');
const { createClient } = require('@supabase/supabase-js');

app.http('publicar', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',

    handler: async (request, context) => {
        try {
            if (request.method === 'GET') {
                return {
                    status: 200,
                    jsonBody: {
                        ok: true,
                        message: 'Backend ArgentinaProp activo'
                    }
                };
            }

            const supabase = createClient(
                process.env.SUPABASE_URL,
                process.env.SUPABASE_SERVICE_KEY
            );

            const body = await request.json();

            const nuevaPropiedad = {
                title: body.title || 'Propiedad sin título',
                description: body.description || 'Consultar descripción.',
                price: body.price || 'Consultar',
                currency: body.currency || 'USD',
                location: body.location || 'Consultar ubicación',
                operation: body.operation || 'venta',
                type: body.type || 'departamento',
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
                    jsonBody: {
                        ok: false,
                        error: error.message
                    }
                };
            }

            return {
                status: 200,
                jsonBody: {
                    ok: true,
                    property: data
                }
            };

        } catch (err) {
            context.log('GENERAL ERROR:', err.message);

            return {
                status: 500,
                jsonBody: {
                    ok: false,
                    error: err.message
                }
            };
        }
    }
});