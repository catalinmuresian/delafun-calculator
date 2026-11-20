<template>
  <q-page class="calc-page calc-page--plain">
    <div class="calc-content">
      <section class="panel panel--members">
        <div class="panel__header">
          <div class="panel__head">
            <div class="panel__icon"><q-icon name="table_chart" size="20px" /></div>
            <div class="panel__titles">
              <div class="panel__title">Raport membri</div>
              <div class="panel__subtitle">{{ calculations.length }} calcule · curs 1 € = {{ cursEuro }} lei</div>
            </div>
          </div>
        </div>

        <div class="report-period">
          <q-btn-toggle v-model="mode"
                        class="currency-toggle"
                        no-caps
                        unelevated
                        toggle-color="primary"
                        color="grey-2"
                        text-color="grey-9"
                        :options="[{ label: 'Luna', value: 'month' }, { label: 'An', value: 'year' }, { label: 'Tot', value: 'all' }]" />
          <div v-if="mode !== 'all'" class="report-period__nav">
            <q-btn flat round dense icon="chevron_left" aria-label="Inapoi" @click="shift(-1)" />
            <span class="report-period__label">{{ periodLabel }}</span>
            <q-btn flat round dense icon="chevron_right" aria-label="Inainte" @click="shift(1)" />
          </div>
        </div>

        <div class="report-totals">
          <div class="report-events">
            <span class="report-events__label">Evenimente <span class="report-events__count">{{ eventsCount }}</span></span>
            <span class="report-events__value">{{ eur(eventsTotal) }}</span>
          </div>
          <div class="report-events report-events--spendings">
            <span class="report-events__label">Cheltuieli</span>
            <span class="report-events__value">{{ eur(spendingsTotal) }}</span>
          </div>
        </div>
      </section>

      <div v-if="error" class="calendar-error">
        <q-icon name="cloud_off" size="18px" /> {{ error }}
        <q-btn flat dense no-caps color="primary" label="Reincearca" @click="load" />
      </div>

      <section class="panel report-panel">
        <q-table flat
                 dense
                 class="report-table"
                 :rows="reportRows"
                 :columns="columns"
                 row-key="key"
                 :loading="loading"
                 hide-bottom
                 :pagination="{ rowsPerPage: 0 }"
                 no-data-label="Niciun calcul salvat in aceasta perioada">
          <template v-slot:bottom-row>
            <q-tr v-if="reportRows.length" class="report-table__total">
              <q-td>Total</q-td>
              <q-td v-for="col in columns.slice(1)" :key="col.name" class="text-right">
                {{ col.format(totals[col.field]) }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </section>

      <div class="report-actions">
        <q-btn unelevated no-caps icon="description" label="Excel" color="positive"
               :disable="!reportRows.length" :loading="exporting" @click="openExport('xlsx')" />
        <q-btn outline no-caps icon="download" label="CSV" color="primary"
               :disable="!reportRows.length" @click="openExport('csv')" />
      </div>

      <q-dialog v-model="exportDialog">
        <q-card class="dlg dlg--confirm">
          <q-card-section class="dlg__confirm-body">
            <q-avatar :icon="exportFormat === 'xlsx' ? 'description' : 'download'" color="green-1" text-color="green-8" />
            <span>Pentru cine este raportul?</span>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="chip-group">
              <q-chip clickable
                      :color="allSelected ? 'primary' : 'grey-2'"
                      :text-color="allSelected ? 'white' : 'grey-9'"
                      @click="selectAll">Toti</q-chip>
              <q-chip v-for="r in reportRows"
                      :key="r.key"
                      clickable
                      :color="!allSelected && exportKeys.includes(r.key) ? 'primary' : 'grey-2'"
                      :text-color="!allSelected && exportKeys.includes(r.key) ? 'white' : 'grey-9'"
                      @click="toggleMember(r.key)">{{ r.name }}</q-chip>
            </div>
            <div class="export-hint">
              {{ exportKeys.length === 1 && !allSelected
                ? 'Raport doar pentru el, cu fiecare calcul pe rand.'
                : allSelected ? 'Toti membrii, ca in tabel.' : 'Doar membrii alesi.' }}
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Renunta" no-caps color="grey-8" v-close-popup />
            <q-btn unelevated no-caps color="positive" icon="download" label="Descarca"
                   :disable="!allSelected && !exportKeys.length" :loading="exporting" @click="runExport" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { date, exportFile, useQuasar } from 'quasar'
import { useStore } from 'vuex'
import { getReport } from '../services/calcApi'
import { roLocale } from '../services/roLocale'

const $q = useQuasar()
const store = useStore()
const cursEuro = computed(() => Number(store.state.moduleExample.cursEuro) || 0)

const mode = ref('month')
const anchor = ref(new Date())
const calculations = ref([])
const loading = ref(false)
const error = ref('')
const exporting = ref(false)

const period = computed(() => {
  const y = anchor.value.getFullYear()
  const m = anchor.value.getMonth()
  if (mode.value === 'month') {
    const last = new Date(y, m + 1, 0).getDate()
    const mm = String(m + 1).padStart(2, '0')
    return { from: `${y}-${mm}-01`, to: `${y}-${mm}-${last}` }
  }
  if (mode.value === 'year') return { from: `${y}-01-01`, to: `${y}-12-31` }
  return { from: '', to: '' }
})

const periodLabel = computed(() => mode.value === 'month'
  ? `${roLocale.months[anchor.value.getMonth()]} ${anchor.value.getFullYear()}`
  : mode.value === 'year' ? String(anchor.value.getFullYear()) : 'Toate')

function shift (step) {
  const d = new Date(anchor.value)
  if (mode.value === 'month') d.setMonth(d.getMonth() + step, 1)
  else d.setFullYear(d.getFullYear() + step)
  anchor.value = d
}

let requestId = 0
async function load () {
  const id = ++requestId
  loading.value = true
  error.value = ''
  try {
    const list = await getReport(period.value.from, period.value.to)
    if (id === requestId) calculations.value = list
  } catch (e) {
    if (id === requestId) {
      calculations.value = []
      error.value = e.status === 401 ? 'Dispozitiv neautorizat.' : 'Nu s-a putut incarca raportul.'
    }
  } finally {
    if (id === requestId) loading.value = false
  }
}
watch(period, load, { immediate: true })

// Whole euros everywhere in the report; totals add up the shown (rounded) amounts.
const round0 = n => Math.round(Number(n) || 0)

// Lei to euro at the rate set in the app: the whole report is in euro.
function toEur (value, currency) {
  const n = Number(value) || 0
  if (currency === 'lei') return cursEuro.value ? n / cursEuro.value : 0
  return n
}

// What the events of the period brought in, in euro (after the company's cut): one total, not per member.
const eventsTotal = computed(() => round0(calculations.value.reduce((sum, calc) =>
  sum + (calc.events || []).reduce((a, e) =>
    a + toEur(e.companyEvent ? e.priceWithCompanySpendings : e.value, e.currency), 0), 0)))

const eventsCount = computed(() => calculations.value.reduce((n, calc) => n + (calc.events || []).length, 0))

// What was spent in the period, in euro: also one total, not per member.
const spendingsTotal = computed(() => round0(calculations.value.reduce((sum, calc) =>
  sum + (calc.spendings || []).reduce((a, sp) => a + toEur(sp.value, sp.currency), 0), 0)))

// One row per member, over every calculation of the period they took part in.
const reportRows = computed(() => {
  const byMember = new Map()
  calculations.value.forEach(calc => {
    const members = calc.members || []
    members.forEach(m => {
      const key = m.id || m.name
      if (!byMember.has(key)) {
        byMember.set(key, { key, name: m.name, avansEur: 0, totalEur: 0 })
      }
      if (!m.status) return
      const row = byMember.get(key)
      // Each calculation in whole euros, then added up: the same numbers as one member's export.
      const avans = toEur(m.avansEuro, '€') + toEur(m.avansLei, 'lei')
      row.avansEur += round0(avans)
      // Incasat: what they got at the split plus the advance they already had.
      row.totalEur += round0(toEur(m.euro, '€') + toEur(m.lei, 'lei') + avans)
    })
  })

  return [...byMember.values()]
})

const totals = computed(() => {
  const t = {}
  columns.value.slice(1).forEach(col => {
    t[col.field] = round0(reportRows.value.reduce((a, r) => a + (Number(r[col.field]) || 0), 0))
  })
  return t
})

const num = v => (Number(v) || 0).toLocaleString('ro-RO', { maximumFractionDigits: 0 })
const eur = v => `${num(v)} €`
const columns = computed(() => [
  { name: 'name', field: 'name', label: 'Membru', align: 'left', required: true, classes: 'report-table__name', headerClasses: 'report-table__name' },
  { name: 'avansEur', field: 'avansEur', label: 'Avans', align: 'right', format: eur },
  { name: 'totalEur', field: 'totalEur', label: 'Incasat', align: 'right', format: eur, classes: 'report-table__grand', headerClasses: 'report-table__grand' }
])

// ---- Export (Excel / CSV), for every member, some of them, or one with each calculation listed ----
const exportDialog = ref(false)
const exportFormat = ref('xlsx')
const exportKeys = ref([])
const allSelected = computed(() => !exportKeys.value.length || exportKeys.value.length === reportRows.value.length)

function openExport (format) {
  exportFormat.value = format
  exportKeys.value = []
  exportDialog.value = true
}
function selectAll () {
  exportKeys.value = []
}
function toggleMember (key) {
  const keys = allSelected.value ? [] : exportKeys.value
  exportKeys.value = keys.includes(key) ? keys.filter(k => k !== key) : [...keys, key]
  if (exportKeys.value.length === reportRows.value.length) exportKeys.value = []
}

const fmtDate = d => d ? `${d.slice(8, 10)}.${d.slice(5, 7)}.${d.slice(0, 4)}` : ''

// Plain numbers in the files, so Excel can sum and sort them. null: an empty cell.
function sheetFor (keys) {
  // One member: each calculation they took part in, then their total.
  if (keys.length === 1) {
    const key = keys[0]
    const header = ['Data', 'Calcul', 'Avans', 'Incasat']
    const body = []
    calculations.value.forEach(calc => {
      const members = calc.members || []
      const m = members.find(x => (x.id || x.name) === key)
      if (!m || !m.status) return
      const avans = toEur(m.avansEuro, '€') + toEur(m.avansLei, 'lei')
      const got = toEur(m.euro, '€') + toEur(m.lei, 'lei') + avans
      body.push([fmtDate(calc.date), calc.title || 'Calcul fara titlu', round0(avans), round0(got)])
    })
    const name = reportRows.value.find(r => r.key === key)?.name || key
    const sum = i => body.reduce((a, r) => a + r[i], 0)
    return { name, header, body, total: ['Total', null, sum(2), sum(3)], firstMoney: 2 }
  }

  const cols = columns.value
  const rows = keys.length ? reportRows.value.filter(r => keys.includes(r.key)) : reportRows.value
  const header = cols.map(c => c.label)
  const body = rows.map(r => cols.map(c => r[c.field]))
  const total = ['Total', ...cols.slice(1).map(c => round0(rows.reduce((a, r) => a + (Number(r[c.field]) || 0), 0)))]
  const pad = cols.slice(2).map(() => null)
  const events = [
    [`Total evenimente (${eventsCount.value})`, eventsTotal.value, ...pad],
    ['Total cheltuieli', spendingsTotal.value, ...pad]
  ]
  return { name: keys.length ? rows.map(r => r.name).join(', ') : '', header, body, total, events, firstMoney: 1 }
}

async function runExport () {
  const keys = allSelected.value ? [] : exportKeys.value
  const sheet = sheetFor(keys)
  const base = `delaFun raport ${sheet.name ? sheet.name + ' ' : ''}${periodLabel.value}`
  const rows = [sheet.header, ...sheet.body, sheet.total, ...(sheet.events ? [[], ...sheet.events] : [])]

  if (exportFormat.value === 'csv') {
    const cell = v => typeof v === 'number' ? String(v) : `"${String(v ?? '').replaceAll('"', '""')}"`
    const content = rows.map(row => row.map(cell).join(',')).join('\r\n')
    // BOM so Excel reads the diacritics and the € sign as UTF-8.
    const ok = exportFile(`${base}.csv`, '\ufeff' + content, 'text/csv;charset=utf-8')
    if (ok !== true) $q.notify({ message: 'Browserul a blocat descarcarea', color: 'negative', icon: 'warning' })
    else exportDialog.value = false
    return
  }

  exporting.value = true
  try {
    const { default: writeExcelFile } = await import('write-excel-file/browser')
    const money = row => row.map((v, i) => i >= sheet.firstMoney && typeof v === 'number' ? { value: v, format: '#,##0' } : v)
    const bold = row => money(row).map(c => c && typeof c === 'object' ? { ...c, fontWeight: 'bold' } : { value: c, fontWeight: 'bold' })
    const data = [bold(sheet.header), ...sheet.body.map(money), bold(sheet.total), ...(sheet.events ? [[], ...sheet.events.map(bold)] : [])]
    await writeExcelFile(data, {
      columns: sheet.header.map((h, i) => ({ width: i === 1 && keys.length === 1 ? 30 : i === 0 ? 16 : 14 }))
    }).toFile(`${base}.xlsx`)
    exportDialog.value = false
  } catch (e) {
    $q.notify({ message: 'Nu s-a putut genera fisierul Excel', color: 'negative', icon: 'warning' })
  } finally {
    exporting.value = false
  }
}
</script>

<style lang="scss">
.report-period {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 16px 14px;

  &__nav { display: flex; align-items: center; gap: 4px; }
  &__label { min-width: 120px; text-align: center; font-weight: 600; color: $ink; }
}
// Events, and spendings under them.
.report-totals {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 16px 16px;
}
.report-events {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 12px;
  background: #e5f4ea;

  &__label { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: #2c7a47; }
  &__count {
    min-width: 22px;
    padding: 1px 7px;
    border-radius: 999px;
    font-size: 12px;
    text-align: center;
    color: #fff;
    background: #3a9a5b;
  }
  &__value { font-size: 20px; font-weight: 700; color: $ink; }

  &--spendings {
    background: #fbe9e5;
    .report-events__label { color: #a5402f; }
  }
}
.report-panel { overflow: hidden; }
.export-hint { font-size: 12px; color: $muted; margin-top: 8px; }
.report-table {
  th { font-weight: 600; color: $muted; white-space: nowrap; }
  td { white-space: nowrap; }
  &__name {
    position: sticky;
    left: 0;
    z-index: 1;
    background: #fff;
    font-weight: 500;
    color: $ink;
  }
  &__grand { font-weight: 700; color: $ink; background: #f3f8fa; }
  &__total td {
    font-weight: 700;
    border-top: 2px solid $line;
    background: #fafcfd;
    &:first-child { position: sticky; left: 0; z-index: 1; }
  }
}
.report-actions {
  display: flex;
  gap: 10px;
  .q-btn { flex: 1; height: 44px; border-radius: 12px; font-weight: 600; }
}
</style>
