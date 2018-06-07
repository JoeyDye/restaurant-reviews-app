let staticCacheName = 'restaurant-static-v1';
const cacheFiles = ['/', 'restaurant.html', 'img/', 'js/', 'app.js', 'sw.js'];

// Listen for install
self.addEventListener('install', e => {
  // Wait until promise is resolved
  e.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(cacheFiles);
    })
  );
});

// Listen for activate
self.addEventListener('activate', e => {
  e.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cachNames
            .filter(cacheName => cacheName !== staticCacheName)
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .catch(err => console.log('Nothing in cache', err))
  );
});

// Listen for requests
self.addEventListener('fetch', e => {
  // If file is in cache, respond with cached file, else fetch file
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
