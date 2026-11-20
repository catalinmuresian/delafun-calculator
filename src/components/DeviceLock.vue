<template>
  <div class="device-lock">
    <div class="device-lock__card">
      <div class="device-lock__icon"><q-icon name="lock" size="28px" /></div>
      <div class="device-lock__title">Dispozitiv neautorizat</div>

      <form class="device-lock__form" @submit.prevent="submit">
        <q-input v-model="code"
                 outlined
                 dense
                 label="Cod de autentificare"
                 placeholder="XXXX-XXXX"
                 maxlength="9"
                 autocapitalize="characters"
                 autocomplete="one-time-code"
                 input-class="device-lock__code"
                 hide-bottom-space
                 :error="!!error"
                 :error-message="error" />
        <q-btn type="submit"
               unelevated
               no-caps
               color="primary"
               class="device-lock__btn"
               label="Autentifica"
               :loading="loading"
               :disable="code.replace(/[^A-Za-z0-9]/g, '').length !== 8" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { pairDevice, CalcApiError } from '../services/calcApi'

const emit = defineEmits(['paired'])

const code = ref('')
const loading = ref(false)
const error = ref('')

async function submit () {
  loading.value = true
  error.value = ''
  try {
    await pairDevice(code.value)
    emit('paired')
  } catch (e) {
    error.value = e instanceof CalcApiError && e.code === 'invalid_code'
      ? 'Cod gresit sau expirat. Genereaza unul nou pe server.'
      : 'Nu s-a putut contacta serverul. Verifica conexiunea.'
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss">
.device-lock {
  min-height: calc(100vh - 60px);
  min-height: calc(100dvh - 60px);
  display: grid;
  place-items: center;
  padding: 24px 16px calc(24px + env(safe-area-inset-bottom));

  &__card {
    width: 100%;
    max-width: 380px;
    background: #fff;
    border-radius: $radius;
    box-shadow: 0 1px 2px rgba(20, 50, 60, .06), 0 4px 16px rgba(20, 50, 60, .05);
    padding: 24px 20px;
    text-align: center;
  }
  &__icon {
    width: 56px;
    height: 56px;
    margin: 0 auto 12px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    color: $primary;
    background: #e6f1f4;
  }
  &__title { font-size: 19px; font-weight: 600; color: $ink; margin-bottom: 16px; }
  &__form { display: flex; flex-direction: column; gap: 16px; text-align: left; }
  &__code { text-transform: uppercase; letter-spacing: 2px; font-weight: 600; }
  &__btn { height: 44px; border-radius: 12px; font-weight: 600; }
}
</style>
