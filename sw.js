const CACHE_NAME = 'boiler-inspection-v12'; // 数字を上げる
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './db.js',
  './icon.png',
  'https://unpkg.com/html5-qrcode',
  'https://unpkg.com/qrcode-generator@1.4.4/qrcode.js' // ←ここを新しいURLに変更
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