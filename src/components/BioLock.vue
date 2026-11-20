<template>
  <div class="bio-lock">
    <div class="bio-lock__card">
      <img class="bio-lock__logo" src="../assets/delafun__1_-removebg-preview.png" alt="logo-delafun">
      <div class="bio-lock__icon"><q-icon :name="mode === 'register' ? 'fingerprint' : 'lock'" size="30px" /></div>
      <div class="bio-lock__title">{{ mode === 'register' ? 'Activeaza Face ID / amprenta' : 'Aplicatie blocata' }}</div>
      <div v-if="error" class="bio-lock__error">{{ error }}</div>
      <q-btn unelevated
             no-caps
             color="primary"
             class="bio-lock__btn"
             icon="fingerprint"
             :label="mode === 'register' ? 'Activeaza' : 'Deblocheaza'"
             :loading="busy"
             @click="run" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { registerBiometric, unlockBiometric, unlockOffline } from '../services/biometric'

// mode: 'register' (right after the code) | 'unlock' | 'unlock-offline'
const props = defineProps({ mode: { type: String, required: true } })
const emit = defineEmits(['done'])

const busy = ref(false)
const error = ref('')

async function run () {
  if (busy.value) return
  busy.value = true
  error.value = ''
  try {
    if (props.mode === 'register') await registerBiometric()
    else if (props.mode === 'unlock-offline') await unlockOffline()
    else await unlockBiometric()
    emit('done')
  } catch (e) {
    error.value = e.code === 'cancelled'
      ? 'Autentificarea a fost anulata. Incearca din nou.'
      : e.code === 'unsupported'
        ? 'Acest telefon sau browser nu suporta Face ID / amprenta pentru aplicatii web.'
        : e.status === 401
          ? 'Dispozitivul nu mai este autorizat.'
          : 'Nu s-a putut verifica. Verifica conexiunea si incearca din nou.'
  } finally {
    busy.value = false
  }
}

// Unlocking starts by itself; browsers that want a tap first get the button.
onMounted(() => {
  if (props.mode !== 'register') run().catch(() => {})
})
</script>

<style lang="scss">
.bio-lock {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: grid;
  place-items: center;
  padding: calc(24px + env(safe-area-inset-top)) 16px calc(24px + env(safe-area-inset-bottom));
  background: #eef3f5;

  &__card {
    width: 100%;
    max-width: 380px;
    background: #fff;
    border-radius: $radius;
    box-shadow: 0 1px 2px rgba(20, 50, 60, .06), 0 4px 16px rgba(20, 50, 60, .05);
    padding: 24px 20px;
    text-align: center;
  }
  &__logo { max-width: 110px; margin: 0 auto 16px; display: block; }
  &__icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 12px;
    border-radius: 18px;
    display: grid;
    place-items: center;
    color: $primary;
    background: #e6f1f4;
  }
  &__title { font-size: 19px; font-weight: 600; color: $ink; margin-bottom: 16px; }
  &__error { font-size: 13px; color: #a5402f; margin: -6px 0 14px; }
  &__btn { width: 100%; height: 46px; border-radius: 12px; font-weight: 600; }
}
</style>
