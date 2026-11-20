<template>
  <q-page class="calc-page">
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
               :disable="!reportRows.length" :loading="exporting" @click="exportExcel" />
        <q-btn outline no-caps icon="download" label="CSV" color="primary"
               :disable="!reportRows.length" @click="exportCsv" />
      </div>
      <div class="report-note">
        Toate sumele sunt in euro; sumele in lei sunt transformate la cursul 1 € = {{ cursEuro }} lei.
        Evenimente € si Cheltuieli €: partea fiecaruia din calculele la care a participat.
      </div>
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

const round2 = n => Math.round((Number(n) || 0) * 100) / 100

// Lei to euro at the rate set in the app: the whole report is in euro.
function toEur (value, currency) {
  const n = Number(value) || 0
  if (currency === 'lei') return cursEuro.value ? n / cursEuro.value : 0
  return n
}

// One row per member, over every calculation of the period they took part in.
const reportRows = computed(() => {
  const byMember = new Map()
  calculations.value.forEach(calc => {
    const members = calc.members || []
    const active = members.filter(m => m.status)
    // What the events brought in (after the 11% company cut) and what was spent, both in euro.
    const eventsEur = (calc.events || []).reduce((a, e) =>
      a + toEur(e.companyEvent ? e.priceWithCompanySpendings : e.value, e.currency), 0)
    const spendingsEur = (calc.spendings || []).reduce((a, sp) => a + toEur(sp.value, sp.currency), 0)

    members.forEach(m => {
      const key = m.id || m.name
      if (!byMember.has(key)) {
        byMember.set(key, { key, name: m.name, calcs: 0, eventsEur: 0, spendingsEur: 0, avansEur: 0, totalEur: 0 })
      }
      if (!m.status) return
      const row = byMember.get(key)
      row.calcs += 1
      if (active.length) {
        row.eventsEur += eventsEur / active.length
        row.spendingsEur += spendingsEur / active.length
      }
      row.avansEur += toEur(m.avansEuro, '€') + toEur(m.avansLei, 'lei')
      row.totalEur += toEur(m.euro, '€') + toEur(m.lei, 'lei')
    })
  })

  return [...byMember.values()].map(r => ({
    ...r,
    eventsEur: round2(r.eventsEur),
    spendingsEur: round2(r.spendingsEur),
    avansEur: round2(r.avansEur),
    totalEur: round2(r.totalEur)
  }))
})

const totals = computed(() => {
  const t = {}
  columns.value.slice(1).forEach(col => {
    t[col.field] = round2(reportRows.value.reduce((a, r) => a + (Number(r[col.field]) || 0), 0))
  })
  return t
})

const num = v => (Number(v) || 0).toLocaleString('ro-RO', { maximumFractionDigits: 2 })
const eur = v => `${num(v)} €`
const columns = computed(() => [
  { name: 'name', field: 'name', label: 'Membru', align: 'left', required: true, classes: 'report-table__name', headerClasses: 'report-table__name' },
  { name: 'calcs', field: 'calcs', label: 'Calcule', align: 'right', format: num },
  { name: 'eventsEur', field: 'eventsEur', label: 'Evenimente', align: 'right', format: eur },
  { name: 'spendingsEur', field: 'spendingsEur', label: 'Cheltuieli', align: 'right', format: eur },
  { name: 'avansEur', field: 'avansEur', label: 'Avans', align: 'right', format: eur },
  { name: 'totalEur', field: 'totalEur', label: 'Incasat', align: 'right', format: eur, classes: 'report-table__grand', headerClasses: 'report-table__grand' }
])

// Plain numbers in the files, so Excel can sum and sort them.
function sheetRows () {
  const cols = columns.value
  const body = reportRows.value.map(r => cols.map(c => r[c.field]))
  const total = ['Total', ...cols.slice(1).map(c => totals.value[c.field])]
  return { header: cols.map(c => c.label), body, total }
}

function fileBase () {
  return `delaFun raport ${periodLabel.value}`
}

function exportCsv () {
  const { header, body, total } = sheetRows()
  const cell = v => typeof v === 'number' ? String(v) : `"${String(v ?? '').replaceAll('"', '""')}"`
  const content = [header, ...body, total].map(row => row.map(cell).join(',')).join('\r\n')
  // BOM so Excel reads the diacritics and the € sign as UTF-8.
  const ok = exportFile(`${fileBase()}.csv`, '﻿' + content, 'text/csv;charset=utf-8')
  if (ok !== true) $q.notify({ message: 'Browserul a blocat descarcarea', color: 'negative', icon: 'warning' })
}

async function exportExcel () {
  exporting.value = true
  try {
    const { default: writeExcelFile } = await import('write-excel-file/browser')
    const { header, body, total } = sheetRows()
    const bold = row => row.map(v => ({ value: v, fontWeight: 'bold' }))
    const money = row => row.map((v, i) => i >= 2 ? { value: v, format: '#,##0.00' } : v)
    await writeExcelFile([bold(header), ...body.map(money), bold(total)], {
      columns: [{ width: 16 }, ...header.slice(1).map(() => ({ width: 14 }))]
    }).toFile(`${fileBase()}.xlsx`)
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
.report-panel { overflow: hidden; }
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
.report-note { font-size: 12px; color: $muted; padding: 0 4px; }
</style>
