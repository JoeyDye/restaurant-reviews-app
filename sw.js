let staticCacheName = 'restaurant-static-v1';
const cacheFiles = ['/', 'restaurant.html', 'img/', 'js/'];

/**
 * @description Add files to cache on install
 */
self.addEventListener('install', e => {
  // Wait until promise is resolved
  e.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(cacheFiles);
    })
  );
});

/**
 * @description Delete old caches on activate
 */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== staticCacheName)
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .catch(err => console.log('Nothing in cache', err))
  );
});

/**
 * @description Respond with cached files if in cache. If not, fetch files.
 */
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
