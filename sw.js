// BookForge Service Worker v4.0
var CACHE='bookforge-v4';
var URLS=["./", "./index.html", "./libro2.html", "./libro3.html", "./libro4.html", "./libro6.html"];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(URLS)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(nr){if(nr.ok){var c=nr.clone();caches.open(CACHE).then(function(ca){ca.put(e.request,c)})}return nr}).catch(function(){return new Response('Offline — abre un libro ya guardado.',{headers:{'Content-Type':'text/html'}})})}))}); 