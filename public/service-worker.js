// Cache name - change this when you update your game
const CACHE_NAME = 'landen-grad-v1';

// Files to cache - add all your important assets here
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/app.js',
  '/assets/bg.png',
  '/assets/logo.png',
  // Add more assets as needed
];

// Install event - caches assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Activate event - cleans up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('Service Worker: Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Return cached asset
        }
        return fetch(event.request); // Fetch from network
      })
  );
});