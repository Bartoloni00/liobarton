const cacheName = 'liobarton',
      urlsToCache = [
        './',
        './index.html',
        './app.html',
        './productos.html',
        './estilos.css',
        './css/bootstrap.min.css',
        './js/bootstrap.min.js',
        './js/codigo.js',
        './img/home_portfolio.svg',
        './img/admin_port.svg',
        './img/icon-192x192.png',
        './manifest.json',
        './serviceworker.js'
      ];

self.addEventListener('install',(e)=>{
    e.waitUntil(
      caches.open(cacheName)
      .then(cache=>{
        return cache.addAll(urlsToCache)
        .then(()=>self.skipWaiting())
      })
      .catch(err=>console.error('Fallo el registro de cache',err))
    )

})
// activacion
self.addEventListener('activate',(e)=>{
    const cacheWhitelist = [cacheName];
    e.waitUntil(
      caches.keys()
      .then(cacheNames=>{
        cacheNames.map(cacheName=>{
          //Eliminamos lo que ya no se necesita en cache
          if(cacheWhitelist.indexOf(cacheName) === -1){
            return caches.delete(cacheName);
          }
        })
      })
      //le indica al SW activar el cache actual
      .then(()=>self.clients.claim())
    )
})

// // Event listener para la solicitud fetch
 self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
    .then(res=>{
      if(res){
        //recuperamos del cache
        return res
      }
      //recuperar la peticion a la url
      return fetch(e.request)
    })
  )
})
