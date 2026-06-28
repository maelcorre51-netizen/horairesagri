// HorairesAgri — Service Worker
const CACHE_NAME = 'horairesagri-v1';
const ASSETS = [
  '/horairesagri/',
  '/horairesagri/index.html',
  '/horairesagri/css/style.css',
  '/horairesagri/js/firebase-config.js',
  '/horairesagri/js/app.js',
  '/horairesagri/manifest.json',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
