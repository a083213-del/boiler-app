const CACHE_NAME = 'boiler-inspection-v10'; // ←数字を1つ上げてください（例: v10）
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './db.js',
  './icon.png',
  'https://unpkg.com/html5-qrcode',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js' // ←これを追加
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