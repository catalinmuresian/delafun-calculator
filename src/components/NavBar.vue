<template>
  <div class="nav-bar">
    <q-dialog v-model="modalInfo">
      <q-card class="rate-dialog">
        <q-card-section class="column items-center">
          <div class="rate-dialog__title">Curs valutar</div>
          <div v-if="bnrRate || cursLoading" class="rate-dialog__bnr">
            <q-spinner v-if="cursLoading" size="16px" />
            <q-icon v-else name="account_balance" size="16px" />
            <span v-if="bnrRate">BNR {{ formatDate(bnrDate) }}: <b>{{ bnrRate }}</b> → folosit <b>{{ bnrUsed }}</b></span>
            <span v-else>Se actualizeaza cursul BNR…</span>
          </div>
          <div v-if="cursError" class="rate-dialog__error">Nu s-a putut actualiza cursul BNR.</div>
          <div v-if="manualUntil" class="rate-dialog__manual">
            Curs pus manual: {{ cursEuro }} lei, pana la {{ manualUntil }}
          </div>
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
          <q-btn v-if="bnrRate && cursSource !== 'bnr'"
                 class="q-mt-sm full-width rate-dialog__save"
                 flat
                 no-caps
                 color="primary"
                 icon="restart_alt"
                 label="Foloseste cursul BNR"
                 @click="useBnr"
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
                <q-item-label caption>1 € = {{ cursEuro }} lei · {{ cursSource === 'bnr' ? 'BNR' : 'manual' }}</q-item-label>
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
import { loadCurs, manualOverride, setManualCurs, useBnrCurs } from '../services/curs'

defineProps({ locked: Boolean })

const store = useStore()
const modalInfo = ref(false)
const cursEuro = computed(() => store.state.moduleExample.cursEuro)
const cursSource = computed(() => store.state.moduleExample.cursSource)
const bnrRate = computed(() => store.state.moduleExample.bnrRate)
const bnrDate = computed(() => store.state.moduleExample.bnrDate)
const bnrUsed = computed(() => bnrRate.value ? Math.floor(bnrRate.value * 100 + 1e-9) / 100 : null)

function formatDate (value) {
  return value ? date.formatDate(date.extractDate(value, 'YYYY-MM-DD'), 'DD.MM.YYYY') : ''
}

// Until when a hand-typed rate wins over BNR (shown in the dialog).
const manualUntil = ref('')
function refreshManualUntil () {
  const m = manualOverride()
  manualUntil.value = m ? date.formatDate(m.until, 'DD.MM HH:mm') : ''
}

function useBnr () {
  useBnrCurs(store)
  refreshManualUntil()
}
const cursEuroLocal = ref(null)

const cursLoading = ref(false)
const cursError = ref(false)

// Opening Curs valutar asks BNR again and shows the result right away.
async function openSettings () {
  const shown = store.state.moduleExample.cursEuro
  cursEuroLocal.value = shown
  refreshManualUntil()
  cursError.value = false
  modalInfo.value = true
  cursLoading.value = true
  const ok = await loadCurs(store)
  cursLoading.value = false
  cursError.value = !ok
  // Shows the new rate, unless something was typed in the meantime.
  if (cursEuroLocal.value === shown) cursEuroLocal.value = store.state.moduleExample.cursEuro
}

function saveCursEuro () {
  const rate = Number(cursEuroLocal.value)
  if (!rate || rate <= 0) return
  // The same as BNR's: no override needed; anything else wins for 24 hours.
  if (bnrUsed.value && rate === bnrUsed.value) useBnr()
  else setManualCurs(store, rate)
  refreshManualUntil()
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
  &__bnr {
    align-self: stretch;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
    padding: 8px 10px;
    border-radius: 10px;
    font-size: 13px;
    color: #2c5f6e;
    background: #e6f1f4;
  }
  &__error { align-self: stretch; font-size: 12px; color: #a5402f; margin: -6px 0 10px; }
  &__manual { align-self: stretch; font-size: 12px; color: #a55a00; margin: -4px 0 10px; }
}
</style>
