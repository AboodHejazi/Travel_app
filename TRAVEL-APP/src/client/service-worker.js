import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('fetch', (event) => {
  console.log('Intercepting request:', event.request.url);
  
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Return cached response if available
      }
      return fetch(event.request).then((response) => {
        // Check if the response is valid
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response; // Return response if it's not valid for caching
        }
        
        // Cache the new response
        return caches.open('dynamic-cache').then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
