<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar :locked="state !== 'paired' && state !== 'offline'" />
    <q-page-container>
      <div v-if="state === 'checking'" class="device-check">
        <q-spinner color="primary" size="32px" />
      </div>
      <DeviceLock v-else-if="state === 'locked'" @paired="state = 'paired'" />
      <router-view v-else v-slot="{ Component }">
        <!-- The calculator stays alive while the calendar or a saved calculation is open. -->
        <keep-alive include="IndexPage">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import NavBar from '../components/NavBar'
import DeviceLock from '../components/DeviceLock.vue'
import { checkDevice } from '../services/calcApi'
import { keepScreenOn } from '../services/wakeLock'
import { startCurs } from '../services/curs'

const store = useStore()

// 'checking' | 'paired' | 'offline' | 'locked'
const state = ref('checking')

// The BNR rate once the device is let in (also right after pairing).
let cursStarted = false
watch(state, value => {
  if ((value === 'paired' || value === 'offline') && !cursStarted) {
    cursStarted = true
    startCurs(store)
  }
})

onMounted(async () => {
  // The screen stays on as long as the app is open.
  keepScreenOn()
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
