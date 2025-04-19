
const CACHE='bcn-gmaps-v1';
const CORE=['.','index.html','script.js','places.json','itinerary.json','manifest.json'];

self.addEventListener('install',e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));
});
self.addEventListener('fetch',e=>{
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
