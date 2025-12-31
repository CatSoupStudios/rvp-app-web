import React, { useState, useEffect } from 'react';

// Tipos básicos para nuestros posts
interface InstagramPost {
    id: string;
    caption: string;
    media_url: string;
    permalink: string;
    thumbnail_url?: string;
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
}

const InstagramGallery = () => {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Llamamos a NUESTRA propia API, no a Instagram directamente
        fetch('/api/instagram')
            .then(res => {
                if (!res.ok) throw new Error('Error al cargar la galería');
                return res.json();
            })
            .then(data => {
                if (data.error) {
                    console.warn('API Error:', data.error);
                    // Si hay error (ej. falta token), dejamos array vacío o mostramos mensaje sutil
                    setPosts([]);
                } else if (Array.isArray(data)) {
                    setPosts(data.slice(0, 12)); // Mostramos max 12 fotos
                }
            })
            .catch(err => {
                console.error(err);
                setError('Could not load gallery.');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-xl" />
                ))}
            </div>
        );
    }

    if (error || posts.length === 0) {
        return (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-gray-500 font-medium">Follow us on Instagram to see our latest work</p>
                <a
                    href="https://www.instagram.com/rangelvalleypainting/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                    @rangelvalleypainting
                </a>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post) => (
                <a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-xl aspect-square shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                    <img
                        src={post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}
                        alt={post.caption ? post.caption.slice(0, 100) : 'Instagram Post'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* Overlay al pasar el mouse */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-white text-xs md:text-sm font-medium line-clamp-2">
                            {post.caption || 'View on Instagram'}
                        </p>
                    </div>

                    {/* Icono de Instagram discreto en la esquina */}
                    <div className="absolute top-2 right-2 opacity-80 drop-shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" className="w-5 h-5 md:w-6 md:h-6">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default InstagramGallery;
