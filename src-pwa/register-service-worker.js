import { register } from 'register-service-worker'

register(process.env.SERVICE_WORKER_FILE, {
  ready (/* registration */) {},
  registered (/* registration */) {},
  cached (/* registration */) {},
  updatefound (/* registration */) {},

  updated (registration) {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  },

  offline () {},
  error (/* err */) {}
})

// Reload the page when the new service worker takes control
if (navigator.serviceWorker) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload()
  })
}
