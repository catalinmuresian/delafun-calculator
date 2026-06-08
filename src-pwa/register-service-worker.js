import { register } from 'register-service-worker'

register(process.env.SERVICE_WORKER_FILE, {
  ready () {},

  registered (registration) {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        registration.update()
      }
    })
  },

  cached () {},
  updatefound () {},

  updated (registration) {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  },

  offline () {},
  error (/* err */) {}
})

if (navigator.serviceWorker) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload()
  })
}
