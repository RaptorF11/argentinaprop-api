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

            operation: body.operation || 'venta',

            type: body.type || 'departamento',

            address: body.address || 'Sin dirección',

            city: body.city || 'Buenos Aires',

            state: body.state || 'CABA',

            neighborhood: body.neighborhood || 'Palermo',

            latitude: body.latitude || null,

            longitude: body.longitude || null,

            total_area: body.total_area || 0,

            covered_area: body.covered_area || 0,

            rooms: body.rooms || 0,

            bedrooms: body.bedrooms || 0,

            bathrooms: body.bathrooms || 0,

            garages: body.garages || 0,

            condition: body.condition || 'good',

            orientation: body.orientation || null,

            amenities: body.amenities || [],

            images_urls: body.images_urls || [],

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