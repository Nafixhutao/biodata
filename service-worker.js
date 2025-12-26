const CACHE_NAME = 'nazxf-bio-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/hutao.jpg'
];

// Install Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache).catch(err => {
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

// Helper function to check if request should be cached
function shouldCache(request) {
    const url = new URL(request.url);

    // Only cache http/https requests
    if (!url.protocol.startsWith('http')) {
        return false;
    }

    // Don't cache POST, PUT, DELETE requests
    if (request.method !== 'GET') {
        return false;
    }

    // Don't cache chrome extensions
    if (url.protocol === 'chrome-extension:') {
        return false;
    }

    // Don't cache video/audio files (they use Range requests)
    if (request.url.match(/\.(mp4|webm|ogg|mp3|wav|m4a)$/i)) {
        return false;
    }

    // Don't cache large files
    if (request.url.match(/\.(zip|rar|7z|tar|gz)$/i)) {
        return false;
    }

    return true;
}

// Fetch Event - Cache first, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;

    // Skip non-cacheable requests
    if (!shouldCache(request)) {
        event.respondWith(fetch(request));
        return;
    }

    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                // Return cached version if available
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Otherwise fetch from network
                return fetch(request)
                    .then(response => {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Cache the new response
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(request, responseToCache);
                            })
                            .catch(err => {
                                // Silently fail cache put
                                console.log('Cache put skipped:', err.message);
                            });

                        return response;
                    })
                    .catch(err => {
                        console.log('Fetch failed, serving offline:', err);
                        // Could return offline page here
                        return new Response('Offline - Please check your connection', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
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
