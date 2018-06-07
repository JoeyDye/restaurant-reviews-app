// Check if browser implements service worker API
if ('serviceWorker' in navigator) {
  // Wait for document to load
  window.addEventListener(
    'load',
    // Register service worker
    navigator.serviceWorker
      .register('sw.js')
      .then(() => console.log('Service worker registered'))
      .catch(err => console.log('Service worker failed to register', err))
  );
}
