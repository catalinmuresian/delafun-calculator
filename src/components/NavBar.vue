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
      <router-link to="/" class="nav-bar__home" aria-label="Calculator">
        <img
          class="nav-bar__logo"
          src="../assets/delafun__1_-removebg-preview.png"
          alt="logo-delafun">
      </router-link>
      <q-btn v-if="!locked"
             round
             flat
             dense
             icon="settings"
             class="nav-bar__settings"
             aria-label="Setari">
        <q-menu anchor="bottom right" self="top right" :offset="[0, 8]" class="nav-menu">
          <q-list style="min-width: 210px">
            <q-item clickable v-close-popup @click="openSettings">
              <q-item-section avatar><q-icon name="currency_exchange" /></q-item-section>
              <q-item-section>
                <q-item-label>Curs valutar</q-item-label>
                <q-item-label caption>1 € = {{ cursEuro }} lei</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup :to="{ name: 'calendar' }">
              <q-item-section avatar><q-icon name="calendar_month" /></q-item-section>
              <q-item-section>
                <q-item-label>Calendar</q-item-label>
                <q-item-label caption>Calcule salvate</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup :to="{ name: 'report' }">
              <q-item-section avatar><q-icon name="table_chart" /></q-item-section>
              <q-item-section>
                <q-item-label>Raport</q-item-label>
                <q-item-label caption>Sume pe membru, Excel / CSV</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </header>
  </div>
</template>

<script setup>
import { date } from 'quasar'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

defineProps({ locked: Boolean })

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
  &__home { display: block; }
  &__logo { max-width: 96px; display: block; }
  &__settings {
    color: $ink;
    background: rgba(255, 255, 255, .75);
    box-shadow: 0 1px 3px rgba(20, 50, 60, .12);
  }
}

.nav-menu {
  border-radius: 14px !important;
  .q-item { min-height: 52px; }
  .q-item__section--avatar { min-width: 40px; color: $primary; }
}

.rate-dialog {
  width: 300px;
  max-width: 92vw;
  border-radius: 20px !important;

  &__title { font-size: 17px; font-weight: 600; margin-bottom: 14px; align-self: flex-start; }
  &__save { border-radius: 12px; height: 42px; font-weight: 600; }
}
</style>
