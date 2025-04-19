
const CACHE = 'bcnpro-v1';
const CORE = ['.','index.html','script.js','itinerary.json','places.json','manifest.json'];

self.addEventListener('install', e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));
});
self.addEventListener('fetch', e=>{
 e.respondWith(
  caches.match(e.request).then(r=> r || fetch(e.request))
 );
});
