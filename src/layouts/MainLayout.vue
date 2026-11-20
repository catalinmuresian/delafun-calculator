<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar :locked="!isOpen" />
    <q-page-container>
      <div v-if="state === 'checking'" class="device-check">
        <q-spinner color="primary" size="32px" />
      </div>
      <DeviceLock v-else-if="state === 'locked'" @paired="state = 'register'" />
      <!-- Mounted after the first unlock and kept while locked again (the lock screen covers it),
           so what was typed in the calculator survives 5 minutes away. -->
      <div v-if="everOpened" :inert="!isOpen" :aria-hidden="!isOpen">
        <router-view v-slot="{ Component }">
          <!-- The calculator stays alive while the calendar or a saved calculation is open. -->
          <keep-alive include="IndexPage">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </q-page-container>
    <BioLock v-if="lockMode" :key="lockKey" :mode="lockMode" @done="onUnlocked" />
  </q-layout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import NavBar from '../components/NavBar'
import DeviceLock from '../components/DeviceLock.vue'
import BioLock from '../components/BioLock.vue'
import { checkDevice } from '../services/calcApi'
import { keepScreenOn } from '../services/wakeLock'
import { startCurs } from '../services/curs'

// After this long away (another app, phone locked), Face ID / fingerprint is asked again.
const RELOCK_AFTER = 5 * 60 * 1000

const store = useStore()

// 'checking' | 'locked' (no code yet) | 'register' (biometrics to set up) | 'biolock' | 'biolock-offline'
// | 'paired' (open) | 'offline' (open, no network)
const state = ref('checking')
const everOpened = ref(false)
const lockKey = ref(0)

const isOpen = computed(() => state.value === 'paired' || state.value === 'offline')
const lockMode = computed(() => ({
  register: 'register',
  biolock: 'unlock',
  'biolock-offline': 'unlock-offline'
})[state.value] || null)

// The BNR rate once the app is first unlocked.
let cursStarted = false
function onUnlocked () {
  state.value = state.value === 'biolock-offline' ? 'offline' : 'paired'
  everOpened.value = true
  if (!cursStarted) {
    cursStarted = true
    startCurs(store)
  }
}

function relock () {
  if (!isOpen.value) return
  state.value = state.value === 'offline' ? 'biolock-offline' : 'biolock'
  lockKey.value++
}

let hiddenAt = 0
onMounted(async () => {
  // The screen stays on as long as the app is open.
  keepScreenOn()

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') hiddenAt = Date.now()
    else if (hiddenAt && Date.now() - hiddenAt > RELOCK_AFTER) relock()
  })
  // The server's biometric session ended (e.g. a long time open): unlock again.
  window.addEventListener('calc-locked', relock)

  // Every start asks Face ID / fingerprint (or sets it up, right after the code).
  state.value = await checkDevice()
})
</script>

<style lang="scss">
.device-check {
  min-height: 60vh;
  display: grid;
  place-items: center;
}
</style>
