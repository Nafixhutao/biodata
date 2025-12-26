const CACHE_NAME = 'nazxf-bio-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/hutao.jpg',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
];

// Install Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache.map(url => {
                    return new Request(url, { cache: 'reload' });
                })).catch(err => {
                    console.log('Service Worker: Cache failed for some files', err);
                });
            })
    );
    self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Fetch Event - Network First, fallback to Cache
self.addEventListener('fetch', event => {
    const { request } = event;

    // Skip caching for video files and large media (they use Range requests)
    const isVideo = request.url.match(/\.(mp4|webm|ogg)$/i);
    const isLargeFile = request.url.match(/\.(mp4|webm|ogg|zip|rar)$/i);

    if (isVideo || isLargeFile) {
        // Just fetch without caching for large files
        event.respondWith(fetch(request));
        return;
    }

    event.respondWith(
        fetch(request)
            .then(response => {
                // Only cache successful full responses (200, not 206 partial)
                if (!response || response.status !== 200 || response.type === 'error') {
                    return response;
                }

                // Clone the response
                const responseToCache = response.clone();

                // Cache the fetched response (skip video/large files)
                caches.open(CACHE_NAME)
                    .then(cache => {
                        cache.put(request, responseToCache);
                    })
                    .catch(err => {
                        console.log('Cache put error:', err);
                    });

                return response;
            })
            .catch(() => {
                // If fetch fails, return from cache
                return caches.match(request)
                    .then(response => {
                        if (response) {
                            return response;
                        }
                        // Return a custom offline page if needed
                        if (request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Handle messages from the client
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
