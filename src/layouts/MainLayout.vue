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
import { onMounted, ref } from 'vue'
import NavBar from '../components/NavBar'
import DeviceLock from '../components/DeviceLock.vue'
import { checkDevice } from '../services/calcApi'

// 'checking' | 'paired' | 'offline' | 'locked'
const state = ref('checking')

onMounted(async () => {
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
