<template>
  <q-page class="calc-page">
    <q-dialog v-model="confirmDelete" persistent>
      <q-card class="dlg dlg--confirm">
        <q-card-section class="dlg__confirm-body">
          <q-avatar icon="delete_outline" color="red-1" text-color="negative" />
          <span>Stergi definitiv acest calcul?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Nu" no-caps color="grey-8" v-close-popup />
          <q-btn unelevated label="Sterge" no-caps color="negative" :loading="deleting" @click="remove" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="calc-content">
      <div class="calc-back">
        <q-btn flat dense no-caps icon="arrow_back" label="Calendar" color="primary" @click="back" />
      </div>

      <div v-if="loading" class="device-check"><q-spinner color="primary" size="32px" /></div>

      <div v-else-if="error" class="panel calc-missing">
        <q-icon name="error_outline" size="28px" />
        <div>{{ error }}</div>
      </div>

      <template v-else-if="calc">
        <!-- Header -->
        <section class="panel">
          <div class="panel__header">
            <div class="panel__head">
              <div class="panel__icon"><q-icon name="receipt" size="20px" /></div>
              <div class="panel__titles">
                <div class="panel__title calc-title">{{ calc.title || 'Calcul fara titlu' }}</div>
                <div class="panel__subtitle">{{ formatLong(calc.date) }}</div>
              </div>
            </div>
          </div>
          <div class="calc-summary">
            <div class="calc-summary__label">Total de impartit</div>
            <div class="calc-summary__total">
              {{ formatNumber(calc.total_euro) }} € <span class="calc-summary__plus">+</span> {{ formatNumber(calc.total_lei) }} lei
            </div>
            <div class="calc-summary__meta">Curs: 1 € = {{ calc.curs_euro }} lei</div>
          </div>
        </section>

        <!-- Rezultate -->
        <section class="panel">
          <div class="calc-section-title">Rezultate</div>
          <div v-for="m in calc.members"
               :key="m.id || m.name"
               class="calc-member"
               :class="{ 'calc-member--off': !m.status }">
            <span class="member-avatar" :data-initial="(m.name || '?')[0]" aria-hidden="true"></span>
            <div class="member-info calc-member__info">
              <span class="member-name">{{ m.name }}</span>
              <div v-if="!m.status" class="calc-member__note">Nu a participat</div>
              <div v-else-if="m.avansEuro || m.avansLei" class="member-avans">
                <q-icon size="14px" color="positive" name="payments" />
                <span>Avans</span>
                <span v-if="m.avansEuro">{{ formatNumber(m.avansEuro) }} €</span>
                <span v-if="m.avansEuro && m.avansLei"> + </span>
                <span v-if="m.avansLei">{{ formatNumber(m.avansLei) }} lei</span>
              </div>
            </div>
            <div class="calc-member__amount">{{ formatNumber(m.euro) }} €</div>
            <div class="calc-member__amount">{{ formatNumber(m.lei) }} lei</div>
          </div>
        </section>

        <!-- Evenimente -->
        <section class="panel panel--events">
          <div class="calc-section-title">Evenimente <span class="panel__count">{{ calc.events.length }}</span></div>
          <div class="panel__body">
            <div v-for="(e, index) in calc.events" :key="index" class="entry">
              <div class="calc-line">
                <span class="entry__index">{{ index + 1 }}</span>
                <span class="calc-line__name ellipsis">{{ e.name || `Eveniment #${index + 1}` }}</span>
                <span class="calc-line__value">{{ formatNumber(e.value) }} {{ e.currency }}</span>
              </div>
              <div v-if="e.companyEvent || e.ifAvans" class="entry__tags">
                <span v-if="e.companyEvent" class="tag tag--orange">
                  <q-icon name="business" size="14px" />
                  -11% firma · <b>{{ formatNumber(e.priceWithCompanySpendings) }} {{ e.currency }}</b>
                </span>
                <span v-if="e.ifAvans" class="tag tag--green">
                  <q-icon name="payments" size="14px" />
                  Avans {{ formatNumber(e.pretAvans) }} {{ e.valutaAvans }} · <b>{{ (e.avansMembrii || []).join(', ') }}</b>
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Cheltuieli -->
        <section class="panel panel--spendings">
          <div class="calc-section-title">Cheltuieli <span v-if="calc.spendings.length" class="panel__count">{{ calc.spendings.length }}</span></div>
          <div class="panel__body">
            <div v-if="!calc.spendings.length" class="calc-empty">Fara cheltuieli</div>
            <div v-for="(sp, index) in calc.spendings" :key="index" class="spending-line">
              <span class="spending-line__name">{{ sp.name || `Cheltuiala #${index + 1}` }}</span>
              <span class="spending-line__value">-{{ formatNumber(sp.value) }} {{ sp.currency }}</span>
            </div>
          </div>
        </section>

        <q-btn flat
               no-caps
               icon="delete_outline"
               label="Sterge calculul"
               color="negative"
               class="calc-delete"
               @click="confirmDelete = true" />
      </template>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { date, useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { getCalculation, deleteCalculation } from '../services/calcApi'
import { roLocale } from '../services/roLocale'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()

const calc = ref(null)
const loading = ref(true)
const error = ref('')
const confirmDelete = ref(false)
const deleting = ref(false)

async function load (id) {
  if (!id) return
  loading.value = true
  error.value = ''
  calc.value = null
  try {
    calc.value = await getCalculation(id)
  } catch (e) {
    error.value = e.status === 404 ? 'Calculul nu mai exista.'
      : e.status === 401 ? 'Dispozitiv neautorizat.'
        : 'Nu s-a putut incarca calculul.'
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id, load, { immediate: true })

function back () {
  router.push({ name: 'calendar', query: calc.value ? { date: calc.value.date } : {} })
}

async function remove () {
  deleting.value = true
  try {
    const day = calc.value.date
    await deleteCalculation(calc.value.id)
    confirmDelete.value = false
    $q.notify({ message: 'Calcul sters', color: 'grey-8', icon: 'delete_outline' })
    router.replace({ name: 'calendar', query: { date: day } })
  } catch (e) {
    $q.notify({ message: 'Nu s-a putut sterge. Verifica conexiunea.', color: 'negative', icon: 'warning' })
  } finally {
    deleting.value = false
  }
}

function formatNumber (value) {
  return (Number(value) || 0).toLocaleString('ro-RO', { maximumFractionDigits: 2 })
}
function formatLong (value) {
  const d = date.extractDate(value, 'YYYY-MM-DD')
  return `${roLocale.days[d.getDay()]}, ${d.getDate()} ${roLocale.months[d.getMonth()]} ${d.getFullYear()}`
}
</script>

<style lang="scss">
.calc-back { margin: -4px 0 -4px -6px; }
.calc-title { white-space: normal; }
.calc-missing {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 28px 16px;
  color: $muted;
}
.calc-summary {
  margin: 0 16px 16px;
  padding: 14px 16px;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(135deg, #4f8ea1 0%, $primary 100%);

  &__label { font-size: 12px; text-transform: uppercase; letter-spacing: .6px; opacity: .85; }
  &__total { font-size: 22px; font-weight: 700; margin-top: 2px; }
  &__plus { opacity: .7; font-weight: 400; }
  &__meta { font-size: 12px; opacity: .85; margin-top: 2px; }
}
.calc-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px 10px;
  font-weight: 600;
  color: $ink;
}
.calc-member {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-top: 1px solid $line;

  &__info { flex: 1; }
  &__note { font-size: 11px; color: $muted; }
  &__amount { font-weight: 600; color: $ink; white-space: nowrap; min-width: 64px; text-align: right; }

  &--off {
    .member-avatar { background: #dfe5e8; color: #a3b0b6; }
    .member-name { text-decoration: line-through; color: #a3b0b6; }
    .calc-member__amount { color: #a3b0b6; font-weight: 500; }
  }
}
.calc-line {
  display: flex;
  align-items: center;
  gap: 10px;

  &__name { flex: 1; min-width: 0; font-weight: 500; color: $ink; }
  &__value { font-weight: 600; color: $ink; white-space: nowrap; }
}
.calc-empty { font-size: 14px; color: $muted; }
.calc-delete { align-self: center; margin-top: 4px; }
</style>
