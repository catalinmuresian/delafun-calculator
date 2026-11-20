// Kill switch for the old app installed from GitHub Pages (catalinmuresian.github.io/delafun-calculator).
// Replaces the old Workbox service worker: empties its caches, unregisters itself
// and reloads open windows, which then get the "no longer available" page.
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(keys.map((key) => caches.delete(key)))
    await self.registration.unregister()
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    windows.forEach((client) => client.navigate(client.url))
  })())
})
