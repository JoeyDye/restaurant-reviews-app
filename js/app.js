// Check if browser implements service worker API
if ('serviceWorker' in navigator) {
  // Wait for document to load
  window.addEventListener(
    'load',
    // Register service worker
    navigator.serviceWorker
      .register('js/sw.js')
      .then(res => console.log('Service worker registered', res))
      .catch(err => console.log('Service worker failed to register', err))
  );
}
