let staticCacheName = 'restaurant-static-v2';
const cacheFiles = ['/', 'restaurant.html', 'img/', 'js/', 'app.js', 'sw.js'];

// Listen for install
self.addEventListener('install', e => {
  console.log('[Service worker] installed');

  // Wait until promise is resolved
  e.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('Service worker caching cacheFiles');
      return cache.addAll(cacheFiles);
    })
  );
});

// Listen for activate
self.addEventListener('activate', e => {
  console.log('[Service worker] activated');

  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cachNames
          .filter(cacheName => cacheName !== staticCacheName)
          .map(cacheName => caches.delete(cacheName))
      );
      console.log('promise complete!');
    })
  );
});

// Listen for fetch
self.addEventListener('fetch', e => {
  console.log('[ServiceWorker] fetching', e.request.url);

  const requestUrl = new URL(e.request.url);

  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
