const CACHE_NAME = 'ojol-ai-cache-v1';
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap',
  'https://unpkg.com/lucide@latest',
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11'
];

// Tahap Install: Melakukan caching aset inti shell aplikasi
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Tahap Aktivasi: Membersihkan cache lama jika ada pembaruan versi
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Tahap Fetching: Strategi Network-First dengan Fallback ke Cache untuk aset statis
self.addEventListener('fetch', (event) => {
  // Abaikan request eksternal API (Firebase, OpenRouter, dll) agar tidak mengganggu transaksi data real-time
  if (event.request.url.includes('firebase') || event.request.url.includes('api')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Jika response valid, simpan salinan terbaru ke cache
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Jika jaringan gagal, ambil dari cache penyimpanan lokal
        return caches.match(event.request);
      })
  );
});
