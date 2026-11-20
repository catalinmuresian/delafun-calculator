<template>
  <div class="nav-bar">
    <q-dialog v-model="modalInfo">
      <q-card class="rate-dialog">
        <q-card-section class="column items-center">
          <div class="rate-dialog__title">Curs valutar</div>
          <q-input
            class="full-width"
            v-model.number="cursEuroLocal"
            label="Curs Euro"
            type="number"
            dense
            outlined
            @wheel="$event.target.blur()"
          />
          <q-btn class="q-mt-md full-width rate-dialog__save"
                 unelevated
                 label="Salveaza"
                 no-caps
                 color="positive"
                 @click="saveCursEuro"
                 v-close-popup />
          <span class="text-italic q-mt-md" style="font-size: 12px;color: grey">app last update - {{ `${date.formatDate($build_version, 'DD.MM.YYYY')}`}}</span>


        </q-card-section>
      </q-card>
    </q-dialog>

    <header class="nav-bar__inner">
      <img
        class="nav-bar__logo"
        src="../assets/delafun__1_-removebg-preview.png"
        alt="logo-delafun">
      <button class="nav-bar__rate" type="button" @click="openSettings">
        <q-icon name="currency_exchange" size="16px" />
        <span>1 € = <b>{{ cursEuro }}</b> lei</span>
        <q-icon name="settings" size="16px" class="nav-bar__rate-gear" />
      </button>
    </header>
  </div>
</template>

<script setup>
import { date } from 'quasar'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const modalInfo = ref(false)
const cursEuro = computed(() => store.state.moduleExample.cursEuro)
const cursEuroLocal = ref(null)

function openSettings () {
  cursEuroLocal.value = store.state.moduleExample.cursEuro
  modalInfo.value = true
}

function saveCursEuro () {
  store.commit('moduleExample/SET_CURS_EURO', cursEuroLocal.value)
}
</script>

<style lang="scss">
.nav-bar {
  background: linear-gradient(135deg, #acd0db 0%, #8fbfcd 100%);
  box-shadow: 0 2px 12px rgba(20, 50, 60, .12);
  position: sticky;
  top: 0;
  z-index: 20;

  &__inner {
    max-width: 640px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: calc(6px + env(safe-area-inset-top)) 16px 6px;
  }
  &__logo { max-width: 96px; display: block; }
  &__rate {
    all: unset;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 12px;
    border-radius: 999px;
    font-size: 13px;
    color: #1f2d33;
    background: rgba(255, 255, 255, .75);
    box-shadow: 0 1px 3px rgba(20, 50, 60, .12);

    &:focus-visible { outline: 2px solid #fff; }
  }
  &__rate-gear { color: #6b7c85; }
}

.rate-dialog {
  width: 300px;
  max-width: 92vw;
  border-radius: 20px !important;

  &__title { font-size: 17px; font-weight: 600; margin-bottom: 14px; align-self: flex-start; }
  &__save { border-radius: 12px; height: 42px; font-weight: 600; }
}
</style>
