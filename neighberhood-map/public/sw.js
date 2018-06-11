// // resource help : https://developers.google.com/web/fundamentals/codelabs/offline/
// // resource help : https://jakearchibald.com/2014/offline-cookbook/


// // Static cache name 
// var staticCacheName = 'location-static-v1';

// // Cache static assets on install 
// self.addEventListener('install', e => {
//   const timeStamp = Date.now();
//   e.waitUntil(
//     caches.open(staticCacheName).then(cache => {
//       return cache.addAll([
//         '/',

//         `neighborhood-map/public/index.html?timestamp=${timeStamp}`,

//         `neighborhood-map/src/App.js.js?timestamp=${timeStamp}`,
//         `neighborhood-map/src/App.test.js.js?timestamp=${timeStamp}`,
//         `neighborhood-map/src/Menu.js.js?timestamp=${timeStamp}`,
//         `neighborhood-map/src/MapComponent.js.js?timestamp=${timeStamp}`,
//         `neighborhood-map/src/index.js.js?timestamp=${timeStamp}`,

//         `neighborhood-map/src/App.css?timestamp=${timeStamp}`,
//         `neighborhood-map/src/index.css?timestamp=${timeStamp}`,

//         'neighborhood-map/src/menuIcon.png'
//       ]);
//     }).catch(err => console.log('failed to cache', err))
//   );
// });

// // get the assets if they cached, if not fetch from network and cache 
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.open('restaurant-dynamic').then(cache => {
//       return caches.match(event.request).then(response => {
//         return response || fetch(event.request).then(response => {
//           cache.put(event.request, response.clone());
//           return response;
//         });
//       });
//     })
//   );
// });