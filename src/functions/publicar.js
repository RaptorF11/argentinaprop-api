<!DOCTYPE html>
<html class="light" lang="es">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Publicador Pro | ArgentinaProp</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        primary: "#00629f",
                        "primary-container": "#40a9ff",
                        surface: "#f8f9fa"
                    }
                }
            }
        }
    </script>

    <style>
        body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: block;
        }
        [x-cloak] { display: none !important; }

        input, select, textarea {
            border: 1px solid #edeeef;
            border-radius: 1rem;
            padding: 1rem;
            font-size: 0.875rem;
            font-weight: 600;
            width: 100%;
        }

        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #00629f;
            box-shadow: 0 0 0 2px rgba(0, 98, 159, 0.1);
        }

        .section-card {
            background: white;
            padding: 2.5rem;
            border-radius: 2.5rem;
            border: 1px solid #f3f4f5;
            box-shadow: 0 10px 40px -15px rgba(0,0,0,0.05);
        }

        .label-pro {
            display: block;
            font-size: 9px;
            font-weight: 900;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: .16em;
            margin-bottom: .5rem;
            padding-left: .25rem;
            padding-right: .25rem;
        }
    </style>
</head>

<body class="bg-gray-50 text-gray-900 antialiased" x-data="unifiedPublish()" x-init="init()">

<header class="fixed top-0 w-full z-50 bg-white border-b border-gray-100 h-16 flex items-center px-6">
    <div class="max-w-7xl mx-auto w-full flex justify-between items-center">
        <a href="index.html" class="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-all">
            <span class="material-symbols-outlined">arrow_back</span>
            <span class="text-xs font-black uppercase tracking-widest">Salir</span>
        </a>

        <div class="flex items-center gap-3">
            <div class="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Publicador Pro ArgentinaProp</div>
            <div class="px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest" x-text="userRole"></div>
        </div>

        <div class="w-20"></div>
    </div>
</header>

<main class="pt-24 pb-32 px-6">
    <div class="max-w-4xl mx-auto space-y-12">

        <section class="section-card">
            <div class="flex items-center justify-between mb-10 border-b border-gray-50 pb-6">
                <div>
                    <h2 class="text-3xl font-black text-gray-900 italic tracking-tight">1. Carga Manual Pro</h2>
                    <p class="text-xs text-gray-400 font-semibold mt-2">Completá, revisá o editá la publicación antes de enviarla.</p>
                </div>
                <span class="text-[10px] font-black text-primary bg-primary/5 px-4 py-2 rounded-full uppercase tracking-widest">Máximo Detalle</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div class="col-span-full space-y-6">
                    <div>
                        <label class="label-pro">Título de la Publicación</label>
                        <input type="text" x-model="form.title" placeholder="Ej: Espectacular Depto 3 Ambientes con Balcón y Cochera">
                    </div>

                    <div>
                        <label class="label-pro">Descripción Detallada</label>
                        <textarea x-model="form.description" rows="6" placeholder="Descripción completa de la propiedad..."></textarea>
                    </div>
                </div>

                <div>
                    <label class="label-pro">Precio y Moneda</label>
                    <div class="flex gap-2">
                        <select x-model="form.currency" class="w-32">
                            <option>USD</option>
                            <option>ARS</option>
                        </select>
                        <input type="text" x-model="form.price" placeholder="150.000">
                    </div>
                </div>

                <div>
                    <label class="label-pro">Ubicación</label>
                    <input type="text" x-model="form.location" placeholder="Barrio, Ciudad">
                </div>

                <div>
                    <label class="label-pro">Tipo de Propiedad</label>
                    <select x-model="form.type">
                        <option value="departamento">Departamento</option>
                        <option value="casa">Casa</option>
                        <option value="ph">PH</option>
                        <option value="terreno">Terreno</option>
                        <option value="oficina">Oficina</option>
                        <option value="local">Local</option>
                    </select>
                </div>

                <div>
                    <label class="label-pro">Operación</label>
                    <select x-model="form.operation">
                        <option value="venta">Venta</option>
                        <option value="alquiler">Alquiler</option>
                        <option value="temporal">Alquiler Temporal</option>
                        <option value="desarrollos" x-show="userRole === 'desarrolladora'">Desarrollos</option>
                    </select>
                </div>

                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <label class="label-pro">Ambientes</label>
                        <input type="text" x-model="form.rooms" placeholder="Ej: 3">
                    </div>
                    <div>
                        <label class="label-pro">Baños</label>
                        <input type="text" x-model="form.bathrooms" placeholder="Ej: 2">
                    </div>
                    <div>
                        <label class="label-pro">M2 Totales</label>
                        <input type="text" x-model="form.area" placeholder="Ej: 85">
                    </div>
                </div>

                <div>
                    <label class="label-pro">Amenities</label>
                    <input type="text" x-model="form.amenities" placeholder="Parrilla, Piscina, Cochera...">
                </div>

                <div>
                    <label class="label-pro">Link YouTube</label>
                    <input type="url" x-model="form.videoUrl" placeholder="https://youtube.com/...">
                </div>

                <div>
                    <label class="label-pro">Link TikTok/Reels</label>
                    <input type="url" x-model="form.videoShortUrl" placeholder="https://tiktok.com/...">
                </div>

                <div class="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-50 pt-8">
                    <div class="col-span-full mb-2">
                        <span class="text-[10px] font-black text-gray-900 uppercase tracking-widest">Información de Contacto</span>
                    </div>

                    <div>
                        <label class="label-pro">Nombre / Inmobiliaria</label>
                        <input type="text" x-model="form.contactName" placeholder="Ej: Inmobiliaria Norte">
                    </div>

                    <div>
                        <label class="label-pro">Teléfono</label>
                        <input type="text" x-model="form.phone" placeholder="Ej: 11 1234 5678">
                    </div>

                    <div>
                        <label class="label-pro">WhatsApp</label>
                        <input type="text" x-model="form.whatsapp" placeholder="Ej: 5491112345678">
                    </div>
                </div>

                <div class="col-span-full">
                    <label class="label-pro">Foto de Portada</label>
                    <div @click="$refs.fileInput.click()" class="border-2 border-dashed border-gray-100 rounded-[2rem] p-16 text-center cursor-pointer hover:border-primary transition-all group relative overflow-hidden bg-gray-50/50 min-h-[260px]">
                        <template x-if="!previews.main">
                            <div class="flex flex-col items-center">
                                <span class="material-symbols-outlined text-gray-200 group-hover:text-primary text-[48px] mb-4">add_a_photo</span>
                                <p class="text-[11px] font-black text-gray-400 uppercase tracking-widest">Click para subir foto de portada</p>
                            </div>
                        </template>

                        <template x-if="previews.main">
                            <img :src="previews.main" class="absolute inset-0 w-full h-full object-cover">
                        </template>

                        <input type="file" x-ref="fileInput" @change="handleFile($event)" class="hidden" accept="image/*">
                    </div>
                </div>

                <div class="col-span-full">
                    <div class="flex items-center justify-between mb-3">
                        <label class="label-pro mb-0">Fotos de la Propiedad / Galería</label>
                        <button type="button" @click="$refs.galleryInput.click()" class="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full hover:bg-primary/20 transition-all">
                            Agregar Fotos
                        </button>
                    </div>

                    <input type="file" x-ref="galleryInput" @change="handleGalleryFiles($event)" class="hidden" accept="image/*" multiple>

                    <template x-if="previews.gallery.length === 0">
                        <div @click="$refs.galleryInput.click()" class="border-2 border-dashed border-gray-100 rounded-[2rem] p-10 text-center cursor-pointer hover:border-primary transition-all bg-gray-50/50">
                            <span class="material-symbols-outlined text-gray-200 text-[42px] mb-3 mx-auto">photo_library</span>
                            <p class="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                Click para subir fotos interiores o usar las detectadas por el scraper
                            </p>
                        </div>
                    </template>

                    <template x-if="previews.gallery.length > 0">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <template x-for="(img, index) in previews.gallery" :key="index">
                                <div class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 group">
                                    <img :src="img" class="w-full h-full object-cover">

                                    <button type="button" @click.stop="removeGalleryImage(index)" class="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white text-xs font-black opacity-0 group-hover:opacity-100 transition-all">
                                        ×
                                    </button>

                                    <button type="button" @click.stop="setAsCover(index)" class="absolute bottom-2 left-2 right-2 bg-white/90 text-gray-900 rounded-full py-1 text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                                        Usar portada
                                    </button>
                                </div>
                            </template>
                        </div>
                    </template>
                </div>

                <div class="col-span-full">
                    <template x-if="scrapeStatus">
                        <p class="mt-3 text-xs font-bold" :class="scrapeStatusType === 'ok' ? 'text-green-600' : scrapeStatusType === 'error' ? 'text-red-600' : 'text-gray-500'" x-text="scrapeStatus"></p>
                    </template>
                </div>

                <div class="col-span-full pt-6">
                    <button @click="publishManual()" :disabled="isOptimizing" class="w-full py-6 bg-gray-900 text-white text-[12px] font-black rounded-2xl uppercase tracking-[0.3em] hover:bg-primary transition-all shadow-2xl disabled:opacity-50">
                        <span x-text="isOptimizing ? 'PROCESANDO...' : 'PUBLICAR MANUALMENTE'"></span>
                    </button>
                </div>
            </div>
        </section>

        <section class="section-card bg-primary border-none shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 right-0 p-10 opacity-10">
                <span class="material-symbols-outlined text-[120px] text-white">bolt</span>
            </div>

            <div class="relative z-10">
                <h2 class="text-2xl font-black text-white italic mb-2 tracking-tight">2. Misil F1 / Scraper Pro</h2>
                <p class="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em] mb-8">
                    Pegá el link, extraé los datos, revisá y después publicá manualmente
                </p>

                <div class="flex flex-col md:flex-row gap-4">
                    <input type="url" x-model="singleUrl" placeholder="Link de propiedad..." class="flex-1 bg-white border-none text-gray-900">
                    <button @click="scrapeToForm()" :disabled="isImporting" class="bg-gray-900 text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black disabled:opacity-50">
                        <span x-text="isImporting ? 'EXTRAYENDO...' : 'EXTRAER DATOS'"></span>
                    </button>
                </div>

                <p class="text-[11px] text-white/70 font-semibold mt-4 leading-relaxed">
                    Este botón NO publica. Solo llena el formulario con título, descripción, precio, ubicación, contacto y fotos.
                </p>
            </div>
        </section>

        <section class="section-card">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h2 class="text-2xl font-black text-gray-900 italic tracking-tight">3. Carga Masiva</h2>
                    <p class="text-xs text-gray-400 font-semibold mt-2">Modo rápido para varios links.</p>
                </div>
                <span class="text-[9px] font-black text-gray-300 uppercase tracking-widest italic" x-text="bulkCount + ' links'"></span>
            </div>

            <textarea x-model="bulkUrls" rows="5" placeholder="Pegá lista de links separados por enter..." class="mb-6"></textarea>

            <button @click="processBulk()" :disabled="isBulkProcessing || bulkCount === 0" class="w-full py-5 bg-gray-50 text-gray-900 text-[11px] font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all disabled:opacity-50">
                <span x-text="isBulkProcessing ? 'PROCESANDO ' + currentBulkIndex + '/' + bulkCount : 'INICIAR RÁFAGA'"></span>
            </button>
        </section>

    </div>
</main>

<script src="utils/scraper-service.js"></script>
<script src="utils/image-utils.js"></script>
<script src="utils/supabase-config.js"></script>
<script src="utils/data-manager.js"></script>

<script>
function unifiedPublish() {
    return {
        userRole: 'inmobiliaria',
        form: {
            title: '',
            price: '',
            currency: 'USD',
            location: '',
            description: '',
            rooms: '',
            bedrooms: '',
            bathrooms: '',
            area: '',
            type: 'departamento',
            operation: 'venta',
            amenities: '',
            videoUrl: '',
            videoShortUrl: '',
            contactName: '',
            phone: '',
            whatsapp: '',
            sourceUrl: ''
        },
        singleUrl: '',
        bulkUrls: '',
        isOptimizing: false,
        isImporting: false,
        isBulkProcessing: false,
        currentBulkIndex: 0,
        scrapeStatus: '',
        scrapeStatusType: '',
        previews: { main: null, gallery: [] },
        optimizedImages: { main: null, gallery: [] },

        get bulkCount() {
            return this.bulkUrls.split('\n').filter(url => url.trim().startsWith('http')).length;
        },

        async init() {
            const session = JSON.parse(localStorage.getItem('test_session') || '{}');
            this.userRole = session.profile || session.role || 'inmobiliaria';
            if (this.userRole === 'desarrolladora') this.form.operation = 'desarrollos';
        },

        normalizeOperation(value) {
            const raw = String(value || '').toLowerCase().trim();
            if (['venta', 'vende', 'sell', 'sale', 'comprar', 'compra'].includes(raw)) return 'venta';
            if (['alquiler', 'alquila', 'rent', 'rental'].includes(raw)) return 'alquiler';
            if (['temporal', 'alquiler temporal', 'temporario', 'temporaria'].includes(raw)) return 'temporal';
            if (['desarrollo', 'desarrollos', 'emprendimiento'].includes(raw)) return 'desarrollos';
            return this.form.operation || 'venta';
        },

        normalizeType(value) {
            const raw = String(value || '').toLowerCase().trim();
            if (raw.includes('casa')) return 'casa';
            if (raw.includes('ph')) return 'ph';
            if (raw.includes('terreno') || raw.includes('lote')) return 'terreno';
            if (raw.includes('oficina')) return 'oficina';
            if (raw.includes('local')) return 'local';
            if (raw.includes('depto') || raw.includes('departamento') || raw.includes('apartment')) return 'departamento';
            return this.form.type || 'departamento';
        },

        async handleFile(e) {
            const file = e.target.files[0];
            if (!file) return;

            this.isOptimizing = true;
            try {
                const opt = await ImageOptimizer.optimize(file);
                this.optimizedImages.main = opt;
                this.previews.main = opt.full;
            } catch (err) {
                console.error(err);
            } finally {
                this.isOptimizing = false;
            }
        },

        async handleGalleryFiles(e) {
            const files = Array.from(e.target.files || []);
            if (!files.length) return;

            this.isOptimizing = true;
            try {
                for (const file of files) {
                    const opt = await ImageOptimizer.optimize(file);
                    this.optimizedImages.gallery.push(opt);
                    this.previews.gallery.push(opt.card || opt.full);
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.isOptimizing = false;
                e.target.value = '';
            }
        },

        removeGalleryImage(index) {
            this.previews.gallery.splice(index, 1);
            this.optimizedImages.gallery.splice(index, 1);
        },

        setAsCover(index) {
            const img = this.optimizedImages.gallery[index];
            if (!img) return;
            this.optimizedImages.main = img;
            this.previews.main = img.card || img.full;
        },

        buildCleanFormForSave() {
            return {
                title: this.form.title || 'Propiedad publicada en ArgentinaProp',
                description: this.form.description || 'Consultar descripción.',
                price: this.form.price || 'Consultar',
                currency: this.form.currency || 'USD',
                location: this.form.location || 'Consultar ubicación',

                rooms: this.form.rooms || '',
                bedrooms: this.form.bedrooms || this.form.rooms || '',
                bathrooms: this.form.bathrooms || '',
                area: this.form.area || '',

                type: this.normalizeType(this.form.type),
                operation: this.normalizeOperation(this.form.operation),

                amenities: this.form.amenities || '',
                videoUrl: this.form.videoUrl || '',
                videoShortUrl: this.form.videoShortUrl || '',
                sourceUrl: this.form.sourceUrl || this.singleUrl || '',

                contactName: this.form.contactName || '',
                phone: this.form.phone || '',
                whatsapp: this.form.whatsapp || '',

                tag: this.userRole === 'desarrolladora' ? 'DESARROLLO' : 'Nuevo'
            };
        },

        getAzureEndpoint() {
            return 'https://argentinapropapi-gef6hbdhera3a9an.brazilsouth-01.azurewebsites.net/api/publicar';
        },

        normalizeAmenitiesForAzure(value) {
            if (Array.isArray(value)) return value;
            return String(value || '')
                .split(',')
                .map(item => item.trim())
                .filter(Boolean);
        },

        getImagesUrlsForAzure(optimizedImages = {}) {
            const images = [];

            if (optimizedImages?.main?.full || optimizedImages?.main?.card) {
                images.push(optimizedImages.main.full || optimizedImages.main.card);
            }

            if (Array.isArray(optimizedImages?.gallery)) {
                optimizedImages.gallery.forEach(img => {
                    if (typeof img === 'string') images.push(img);
                    if (img && typeof img === 'object') images.push(img.full || img.card || img.url || '');
                });
            }

            if (this.previews?.main) images.push(this.previews.main);
            if (Array.isArray(this.previews?.gallery)) images.push(...this.previews.gallery);

            return [...new Set(images
                .map(img => String(img || '').trim())
                .filter(Boolean)
                .filter(img => !img.includes('[object Object]'))
            )];
        },

        buildAzurePayload(cleanForm, optimizedImages = {}) {
            const location = cleanForm.location || 'Consultar ubicación';

            return {
                title: cleanForm.title,
                description: cleanForm.description,
                price: cleanForm.price,
                currency: cleanForm.currency,
                operation: cleanForm.operation,
                type: cleanForm.type,

                address: cleanForm.address || location,
                city: cleanForm.city || location,
                state: cleanForm.state || 'Buenos Aires',
                neighborhood: cleanForm.neighborhood || location,

                total_area: Number(String(cleanForm.area || 0).replace(/[^0-9.]/g, '')) || 0,
                covered_area: Number(String(cleanForm.covered_area || cleanForm.area || 0).replace(/[^0-9.]/g, '')) || 0,
                rooms: Number(String(cleanForm.rooms || 0).replace(/[^0-9.]/g, '')) || 0,
                bedrooms: Number(String(cleanForm.bedrooms || cleanForm.rooms || 0).replace(/[^0-9.]/g, '')) || 0,
                bathrooms: Number(String(cleanForm.bathrooms || 0).replace(/[^0-9.]/g, '')) || 0,
                garages: Number(String(cleanForm.garages || 0).replace(/[^0-9.]/g, '')) || 0,

                amenities: this.normalizeAmenitiesForAzure(cleanForm.amenities),
                images_urls: this.getImagesUrlsForAzure(optimizedImages),

                status: 'active',
                featured: false,
                source_url: cleanForm.sourceUrl || '',
                contact_name: cleanForm.contactName || '',
                phone: cleanForm.phone || '',
                whatsapp: cleanForm.whatsapp || '',
                video_url: cleanForm.videoUrl || '',
                video_short_url: cleanForm.videoShortUrl || ''
            };
        },

        async sendToAzure(payload) {
            const response = await fetch(this.getAzureEndpoint(), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok || result.ok === false) {
                throw new Error(result.error || 'Azure no pudo guardar la propiedad.');
            }

            return result.property || result;
        },

        async publishManual() {
            if (!this.form.title) return alert('Por favor, ingresá un título.');

            this.isOptimizing = true;
            try {
                const cleanForm = this.buildCleanFormForSave();
                const payload = this.buildAzurePayload(cleanForm, this.optimizedImages || {});

                await this.sendToAzure(payload);

                alert('🚀 ¡PUBLICACIÓN ENVIADA!');
                window.location.href = 'index.html';
            } catch (err) {
                console.error('Error Azure publicar:', err);
                alert('Error al guardar: ' + err.message);
            } finally {
                this.isOptimizing = false;
            }
        },

        async toWebP(url) {
            if (!url) return 'img/property-placeholder.jpg';
            const clean = String(url).trim();
            if (!clean) return 'img/property-placeholder.jpg';

            const lower = clean.toLowerCase();

            if (lower.includes('unsplash.com')) {
                const base = clean.split('?')[0];
                return `${base}?auto=format&fit=crop&fm=webp&w=1000&q=80`;
            }

            if (lower.includes('cloudinary.com')) {
                return clean.replace('/upload/', '/upload/f_webp,q_80,w_1000/');
            }

            if (lower.includes('imgix.net') || lower.includes('prismic.io') || lower.includes('images.ctfassets.net')) {
                const sep = clean.includes('?') ? '&' : '?';
                return `${clean}${sep}fm=webp&w=1000&q=80`;
            }

            return clean;
        },

        async scrapeToForm() {
            if (!this.singleUrl || !this.singleUrl.trim().startsWith('http')) {
                return alert('Pegá un link válido primero.');
            }

            this.isImporting = true;
            this.scrapeStatus = 'Extrayendo datos de la publicación...';
            this.scrapeStatusType = 'loading';

            try {
                if (typeof ScraperService === 'undefined') {
                    throw new Error('ScraperService no está cargado.');
                }

                const meta = await ScraperService.fetchMetadata(this.singleUrl.trim(), this.userRole);

                if (!meta || meta.error) {
                    throw new Error(meta?.error || 'No se pudieron extraer datos del link.');
                }

                const priceData = meta.priceData || {};
                const allImages = Array.isArray(meta.images) ? meta.images.filter(Boolean) : [];
                const mainImage = allImages[0] || meta.image || meta.imageUrl || meta.thumbnail || '';
                const webpImage = await this.toWebP(mainImage);

                this.form.title = meta.title || this.form.title || 'Propiedad importada';
                this.form.description = meta.description || this.form.description || 'Consultar descripción.';
                this.form.price = priceData.price || meta.price || this.form.price || 'Consultar';
                this.form.currency = priceData.currency || meta.currency || this.form.currency || 'USD';
                this.form.location = meta.location || this.form.location || 'Consultar ubicación';

                this.form.rooms = meta.rooms || meta.bedrooms || this.form.rooms || '';
                this.form.bedrooms = meta.bedrooms || meta.rooms || this.form.rooms || '';
                this.form.bathrooms = meta.bathrooms || this.form.bathrooms || '';
                this.form.area = meta.area || meta.m2 || this.form.area || '';

                this.form.type = this.normalizeType(meta.type || this.form.type);
                this.form.operation = this.normalizeOperation(meta.operation || this.form.operation);

                this.form.contactName = meta.contactName || this.form.contactName || '';
                this.form.phone = meta.phone || this.form.phone || '';
                this.form.whatsapp = meta.whatsapp || this.form.whatsapp || meta.phone || '';

                this.form.sourceUrl = this.singleUrl.trim();

                const galleryUrls = allImages.slice(1, 12);

                this.optimizedImages.main = { full: webpImage, card: webpImage };
                this.optimizedImages.gallery = galleryUrls.map(img => ({ full: img, card: img }));

                this.previews.main = webpImage;
                this.previews.gallery = galleryUrls;

                this.scrapeStatus = `Datos extraídos. Se detectaron ${allImages.length} fotos. Revisá y publicá manualmente.`;
                this.scrapeStatusType = 'ok';

                setTimeout(() => {
                    window.scrollTo({ top: 80, behavior: 'smooth' });
                }, 150);

            } catch (err) {
                console.error('Error scraper:', err);
                this.scrapeStatus = 'Fallo al extraer datos: ' + (err.message || 'error desconocido');
                this.scrapeStatusType = 'error';
                alert('Fallo al extraer datos: ' + (err.message || 'error desconocido'));
            } finally {
                this.isImporting = false;
            }
        },

        async smartPublish() {
            return this.scrapeToForm();
        },

        async processBulk() {
            const urls = this.bulkUrls.split('\n').filter(url => url.trim().startsWith('http'));
            this.isBulkProcessing = true;
            this.currentBulkIndex = 0;

            for (const url of urls) {
                this.currentBulkIndex++;

                try {
                    const meta = await ScraperService.fetchMetadata(url, this.userRole);
                    if (meta.error) continue;

                    const allImages = Array.isArray(meta.images) ? meta.images.filter(Boolean) : [];
                    const mainImage = allImages[0] || meta.image || meta.imageUrl || meta.thumbnail || '';
                    const webpImage = await this.toWebP(mainImage);
                    const priceData = meta.priceData || {};

                    const propertyForm = {
                        title: meta.title || 'Propiedad importada',
                        description: meta.description || 'Consultar descripción.',
                        price: priceData.price || meta.price || 'Consultar',
                        currency: priceData.currency || meta.currency || 'USD',
                        location: meta.location || 'Consultar ubicación',

                        rooms: meta.rooms || '',
                        bedrooms: meta.bedrooms || meta.rooms || '',
                        bathrooms: meta.bathrooms || '',
                        area: meta.area || '',

                        type: this.normalizeType(meta.type),
                        operation: this.normalizeOperation(meta.operation),

                        amenities: meta.amenities || '',
                        contactName: meta.contactName || '',
                        phone: meta.phone || '',
                        whatsapp: meta.whatsapp || meta.phone || '',
                        sourceUrl: url,

                        tag: this.userRole === 'desarrolladora' ? 'DESARROLLO' : 'Nuevo'
                    };

                    const galleryUrls = allImages.slice(1, 12);

                    const optImg = {
                        main: { full: webpImage, card: webpImage },
                        gallery: galleryUrls.map(img => ({ full: img, card: img }))
                    };

                    const payload = this.buildAzurePayload(propertyForm, optImg);
                    await this.sendToAzure(payload);

                } catch (err) {
                    console.error(err);
                }

                await new Promise(r => setTimeout(r, 600));
            }

            this.isBulkProcessing = false;
            alert('🚀 CARGA MASIVA COMPLETADA');
            window.location.href = 'index.html';
        }
    }
}
</script>

</body>
</html>