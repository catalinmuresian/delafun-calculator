<template>
  <q-page class="calc-page">
    <div class="calc-content">
      <section class="panel panel--members">
        <div class="panel__header">
          <div class="panel__head">
            <div class="panel__icon"><q-icon name="calendar_month" size="20px" /></div>
            <div class="panel__titles">
              <div class="panel__title">Calendar</div>
              <div class="panel__subtitle">Zilele marcate au calcule salvate</div>
            </div>
          </div>
        </div>
        <div class="calendar-wrap">
          <q-date v-model="selected"
                  mask="YYYY-MM-DD"
                  minimal
                  flat
                  first-day-of-week="1"
                  :locale="roLocale"
                  :events="hasCalculation"
                  event-color="positive"
                  color="primary"
                  :default-year-month="defaultYearMonth"
                  class="calendar"
                  @navigation="onNavigation"
                  @update:model-value="onSelect" />
          <q-inner-loading :showing="loading" />
        </div>
      </section>

      <div v-if="error" class="calendar-error">
        <q-icon name="cloud_off" size="18px" /> {{ error }}
        <q-btn flat dense no-caps color="primary" label="Reincearca" @click="loadMonth(currentMonth)" />
      </div>

      <section v-if="selected" class="panel">
        <div class="day-list__head">{{ formatLong(selected) }}</div>
        <div v-if="!dayItems.length" class="day-list__empty">Niciun calcul salvat in aceasta zi.</div>
        <router-link v-for="item in dayItems"
                     :key="item.id"
                     :to="{ name: 'calculation', params: { id: item.id } }"
                     class="day-item">
          <div class="day-item__main">
            <div class="day-item__title ellipsis">{{ item.title || 'Calcul fara titlu' }}</div>
            <div class="day-item__meta">Salvat la {{ formatTime(item.created) }}</div>
          </div>
          <div class="day-item__total">
            <div v-if="item.total_euro">{{ formatNumber(item.total_euro) }} €</div>
            <div v-if="item.total_lei">{{ formatNumber(item.total_lei) }} lei</div>
          </div>
          <q-icon name="chevron_right" size="20px" class="day-item__chevron" />
        </router-link>
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { date } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { listCalculations } from '../services/calcApi'
import { roLocale } from '../services/roLocale'

const route = useRoute()
const router = useRouter()

// ?date=YYYY-MM-DD keeps the chosen day when coming back from a calculation.
const initial = /^\d{4}-\d{2}-\d{2}$/.test(route.query.date || '') ? route.query.date : ''
const selected = ref(initial)
const currentMonth = ref((initial || date.formatDate(new Date(), 'YYYY-MM-DD')).slice(0, 7))
const defaultYearMonth = currentMonth.value.replace('-', '/')
const items = ref([])
const loading = ref(false)
const error = ref('')

const datesWithCalc = computed(() => new Set(items.value.map(i => i.date)))
const dayItems = computed(() => items.value.filter(i => i.date === selected.value))

// QDate hands event dates as YYYY/MM/DD.
function hasCalculation (d) {
  return datesWithCalc.value.has(d.replaceAll('/', '-'))
}

let requestId = 0
async function loadMonth (month) {
  const id = ++requestId
  loading.value = true
  error.value = ''
  try {
    const list = await listCalculations(month)
    if (id === requestId) items.value = list
  } catch (e) {
    if (id === requestId) {
      items.value = []
      error.value = e.status === 401 ? 'Dispozitiv neautorizat.' : 'Nu s-au putut incarca calculele.'
    }
  } finally {
    if (id === requestId) loading.value = false
  }
}

function onNavigation ({ year, month }) {
  currentMonth.value = `${year}-${String(month).padStart(2, '0')}`
  loadMonth(currentMonth.value)
}

function onSelect (value) {
  router.replace({ query: value ? { date: value } : {} })
  if (!value) return
  const list = items.value.filter(i => i.date === value)
  // One calculation that day: straight to it; more: the list below.
  if (list.length === 1) router.push({ name: 'calculation', params: { id: list[0].id } })
}

onMounted(() => loadMonth(currentMonth.value))

function formatNumber (value) {
  return (Number(value) || 0).toLocaleString('ro-RO', { maximumFractionDigits: 2 })
}
function formatLong (value) {
  const d = date.extractDate(value, 'YYYY-MM-DD')
  return `${roLocale.days[d.getDay()]}, ${d.getDate()} ${roLocale.months[d.getMonth()]} ${d.getFullYear()}`
}
function formatTime (seconds) {
  return seconds ? date.formatDate(seconds * 1000, 'HH:mm') : ''
}
</script>

<style lang="scss">
.calendar-wrap {
  position: relative;
  padding: 0 8px 12px;
}
.calendar {
  width: 100%;
  max-width: none;
  box-shadow: none;
}
.calendar-error {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #a5402f;
  padding: 0 4px;
}
.day-list__head {
  padding: 14px 16px 6px;
  font-weight: 600;
  color: $ink;
}
.day-list__empty {
  padding: 4px 16px 16px;
  font-size: 14px;
  color: $muted;
}
.day-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-top: 1px solid $line;
  color: inherit;
  text-decoration: none;

  &__main { flex: 1; min-width: 0; }
  &__title { font-weight: 500; color: $ink; }
  &__meta { font-size: 12px; color: $muted; }
  &__total { text-align: right; font-weight: 600; font-size: 14px; color: $ink; white-space: nowrap; }
  &__chevron { color: $muted; }
}
</style>
