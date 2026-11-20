// Keeps the phone's screen on while the app is open (Screen Wake Lock API).
// The system drops the lock whenever the app is hidden (another app, tab or a locked phone),
// so it is asked for again each time the app is visible. Some browsers only grant it after a tap,
// so the first tap asks again too. Where the API is missing, nothing happens.

let lock = null

async function request () {
  if (!('wakeLock' in navigator) || document.visibilityState !== 'visible' || lock) return
  try {
    lock = await navigator.wakeLock.request('screen')
    lock.addEventListener('release', () => { lock = null })
  } catch (e) {
    // Refused (battery saver, not visible yet, no tap yet): tried again on the next chance.
    lock = null
  }
}

function onVisibility () {
  if (document.visibilityState === 'visible') request()
}

export function keepScreenOn () {
  request()
  document.addEventListener('visibilitychange', onVisibility)
  // A tap also asks again, for browsers that want a user gesture first or dropped the lock.
  document.addEventListener('pointerdown', request, { passive: true })
}
