export const prerender = false; // Important: This tells Astro to run this on the server, not at build time

import type { APIRoute } from 'astro';

export async function GET({ request }: { request: Request }) {
    const INSTAGRAM_TOKEN = import.meta.env.INSTAGRAM_TOKEN;
    const INSTAGRAM_URL = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp,thumbnail_url&access_token=${INSTAGRAM_TOKEN}`;

    // Log simple para debug en terminal del servidor
    console.log('API: Solicitando datos a Instagram...');

    if (!INSTAGRAM_TOKEN || INSTAGRAM_TOKEN.startsWith('IGQ...')) {
        return new Response(
            JSON.stringify({
                error: 'Token no configurado o inválido',
                data: []
            }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        }
        );
    }

    try {
        const response = await fetch(INSTAGRAM_URL);

        if (!response.ok) {
            throw new Error(`Instagram API Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Filtramos solo lo necesario para enviar al cliente (limpieza de datos)
        const posts = data.data.map((post: any) => ({
            id: post.id,
            caption: post.caption || '',
            media_url: post.media_url,
            permalink: post.permalink,
            thumbnail_url: post.thumbnail_url, // Para videos
            media_type: post.media_type
        }));

        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                // Cache control: Guardar por 5 minutos para no saturar la API
                "Cache-Control": "public, max-age=300, s-maxage=300"
            }
        });

    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ error: 'Error al conectar con Instagram', details: String(error) }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
