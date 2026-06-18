const CACHE_NAME = 'boiler-inspection-v11'; // バージョンを上げる
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './db.js',
  './icon.png',
  'https://unpkg.com/html5-qrcode',
  'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js' // ←新しいURLに変更
];


// インストール時にキャッシュを作成
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// オフラインの時はキャッシュから返す
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});