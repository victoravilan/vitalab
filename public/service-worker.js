// Service Worker for VitaLab PWA
const CACHE_NAME = 'vitalab-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/img/icon-180.png',
  '/img/icon-192.png',
  '/img/icon-512.png',
  '/img/logo-vitalab.png',
  // Add more assets as needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
