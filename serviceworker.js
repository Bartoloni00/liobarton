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
        './img/no_conexion.svg',
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
//Manejo de las notificaciones de push
self.addEventListener('push',evento =>{
  console.log(evento.data.text());
  let data = JSON.parse(evento.data.text());
  console.log(data);
  let title = data[0].title;
  let body = data[0].body;

  let options = {
    body: body,
    icon: 'img/icon-192x192.png',
    vibrate: [200,100,200,100,200],
    tag: 1,
    actions: [{
      action:1,
      icon: 'img/icon-192x192.png',
      title: 'Acceder'
    },{
      action:2,
      icon: 'img/icon-192x192.png',
      title: 'No Acceder'
    }]
  }
  evento.waitUntil(
    self.registration.showNotification(title,options)
  );
})
self.addEventListener('notificationclick',evento=>{
  if (evento.action == 1) {
    console.log('el usuario quiere acceder');
    clients.openWindow('http://localhost/liobarton/productos.html')
  }else{
    console.log('el usuario no quiero acceder');
  }
  evento.notification.close();
})