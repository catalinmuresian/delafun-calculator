<template>
  <q-page class="calc-page">
    <q-dialog v-model="confirmDeleteEvent" persistent>
      <q-card class="dlg dlg--confirm">
        <q-card-section class="dlg__confirm-body">
          <q-avatar icon="delete_outline" color="red-1" text-color="negative" />
          <span>Esti sigur ca vrei sa stergi acest event ?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Nu" no-caps color="grey-8" v-close-popup />
          <q-btn unelevated
                 no-caps
                 @click="handleDelete(modalSettings.events.index, 'events')"
                 label="Da, sterge"
                 color="negative"
                 v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDeleteSpending" persistent>
      <q-card class="dlg dlg--confirm">
        <q-card-section class="dlg__confirm-body">
          <q-avatar icon="delete_outline" color="red-1" text-color="negative" />
          <span>Esti sigur ca vrei sa stergi aceasta cheltuiala ?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Nu" no-caps color="grey-8" v-close-popup />
          <q-btn unelevated
                 no-caps
                 @click="handleDelete(modalSettings.spendings.index, 'spendings')"
                 label="Da, sterge"
                 color="negative"
                 v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmReset" persistent>
      <q-card class="dlg dlg--confirm">
        <q-card-section class="dlg__confirm-body">
          <q-avatar icon="restart_alt" color="orange-1" text-color="orange-9" />
          <span>Esti sigur ca vrei sa resetezi totul ?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Nu" no-caps color="grey-8" v-close-popup />
          <q-btn unelevated
                 no-caps
                 @click="resetAll"
                 label="Da, reseteaza"
                 color="orange-9"
                 v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="saveDialog">
      <q-card class="dlg dlg--confirm">
        <q-card-section class="dlg__confirm-body">
          <q-avatar icon="save" color="green-1" text-color="green-8" />
          <span>Salveaza calculul in calendar</span>
        </q-card-section>
        <q-card-section class="q-pt-none save-form">
          <q-input label="Nume"
                   dense
                   outlined
                   autofocus
                   maxlength="120"
                   v-model="saveTitle"
                   @keyup.enter="saveCalc()" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Renunta" no-caps color="grey-8" v-close-popup />
          <q-btn unelevated
                 no-caps
                 @click="saveCalc()"
                 :loading="saving"
                 label="Salveaza"
                 icon="save"
                 color="positive" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalSettings.events.openModal" persistent position="bottom">
      <q-card class="dlg dlg--sheet">
        <div class="dlg__header">
          <div>
            <div class="dlg__eyebrow">
              {{ modalSettings.events.input.length
                ? `${modalSettings.events.input}`
                : `Eveniment #${modalSettings.events.index + 1}`}}
            </div>
            <div class="dlg__title">Setari eveniment</div>
          </div>
          <q-btn v-close-popup icon="close" round dense flat color="grey-7" />
        </div>

        <q-card-section class="dlg__body">
          <q-input outlined
                   dense
                   autofocus
                   label="Nume"
                   v-model="inputModal"
                   @update:model-value="newValue => handleNumeEvenimentInput(newValue)"
                   @keyup.enter="modalSettings.events.openModal = false" />

          <div class="field">
            <div class="field__label">Moneda</div>
            <q-btn-toggle v-model="valuta"
                          class="currency-toggle"
                          no-caps
                          unelevated
                          toggle-color="primary"
                          color="grey-2"
                          text-color="grey-9"
                          :options="currencyToggleOptions" />
          </div>

          <div class="option-tile" :class="{ 'option-tile--on': checkboxIfFirma }">
            <q-toggle dense color="orange-8" v-model="checkboxIfFirma" />
            <div class="option-tile__text" @click="checkboxIfFirma = !checkboxIfFirma">
              <div class="option-tile__title">Cheltuieli firma 11%</div>
              <div class="option-tile__hint">Se scade 11% din pretul evenimentului</div>
            </div>
          </div>

          <div class="avans-group">
            <div class="option-tile" :class="{ 'option-tile--on': checkboxIfAvans }">
              <q-toggle dense color="positive" v-model="checkboxIfAvans" />
              <div class="option-tile__text" @click="checkboxIfAvans = !checkboxIfAvans">
                <div class="option-tile__title">Avans</div>
                <div class="option-tile__hint">Suma deja primita de unii membri</div>
              </div>
            </div>

            <div class="collapse"
                 :class="{ 'collapse--open': checkboxIfAvans }"
                 :inert="!checkboxIfAvans">
              <div class="collapse__inner">
                <div class="avans-box">
                  <div class="avans-box__row">
                    <q-input
                      class="input-avans col"
                      label="Pret avans"
                      :class="priceAvans ? 'input-price-right' : 'input-price-left'"
                      dense
                      outlined
                      type="number"
                      pattern="\d*"
                      @wheel="stopScroll($event)"
                      v-model="priceAvans"/>
                    <q-btn-toggle v-model="currencyAvans"
                                  class="currency-toggle"
                                  no-caps
                                  unelevated
                                  toggle-color="positive"
                                  color="grey-2"
                                  text-color="grey-9"
                                  :options="currencyToggleOptions" />
                  </div>
                  <div class="field__label q-mt-sm">Membrii care au primit avans</div>
                  <div class="chip-group">
                    <q-chip
                      v-for="membru in optionsAvans"
                      :key="membru"
                      clickable
                      :selected="modelMultiple.includes(membru)"
                      @click="toggleAvansMember(membru)"
                      :color="modelMultiple.includes(membru) ? 'positive' : 'grey-2'"
                      :text-color="modelMultiple.includes(membru) ? 'white' : 'grey-9'">
                      {{ membru }}
                    </q-chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions class="dlg__actions">
          <q-btn flat
                 label="Sterge"
                 icon="delete_outline"
                 color="negative"
                 no-caps
                 @click="confirmDeleteEvent = true" />
          <q-space />
          <q-btn unelevated
                 label="Salveaza"
                 color="primary"
                 no-caps
                 class="dlg__save"
                 type="submit"
                 @click="handleSaveModalInput(modalSettings.events.index, 'events', valuta)"
                 v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modalSettings.spendings.openModal" persistent position="bottom">
      <q-card class="dlg dlg--sheet">
        <div class="dlg__header">
          <div>
            <div class="dlg__eyebrow">
              {{ modalSettings.spendings.input.length
                ? `${modalSettings.spendings.input}`
                : `Cheltuiala #${modalSettings.spendings.index + 1}`}}
            </div>
            <div class="dlg__title">Setari cheltuiala</div>
          </div>
          <q-btn v-close-popup icon="close" round dense flat color="grey-7" />
        </div>

        <q-card-section class="dlg__body">
          <q-input outlined
                   dense
                   autofocus
                   label="Nume"
                   v-model="inputModal"
                   @update:model-value="newValue => handleNumeSpendingInput(newValue)"
                   @keyup.enter="modalSettings.spendings.openModal = false" />
          <div class="field">
            <div class="field__label">Moneda</div>
            <q-btn-toggle v-model="valuta"
                          class="currency-toggle"
                          no-caps
                          unelevated
                          toggle-color="primary"
                          color="grey-2"
                          text-color="grey-9"
                          :options="currencyToggleOptions" />
          </div>
        </q-card-section>

        <q-card-actions class="dlg__actions">
          <q-btn flat
                 label="Sterge"
                 icon="delete_outline"
                 no-caps
                 color="negative"
                 @click="confirmDeleteSpending = true"/>
          <q-space />
          <q-btn unelevated
                 label="Salveaza"
                 color="primary"
                 no-caps
                 class="dlg__save"
                 @click="handleSaveModalInput(modalSettings.spendings.index, 'spendings', valuta)"
                 v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="calc-content">
      <!-- Evenimente -->
      <section class="panel panel--events">
        <div class="panel__header">
          <div class="panel__head">
            <div class="panel__icon"><q-icon name="celebration" size="20px" /></div>
            <div class="panel__titles">
              <div class="panel__title">
                Evenimente
                <span v-if="data.events.length" class="panel__count">{{ data.events?.length }}</span>
              </div>
              <div class="panel__subtitle">{{ totalsLabel(data.events, true) || 'Niciun eveniment adaugat' }}</div>
            </div>
          </div>
        </div>
        <div class="panel__body">
          <div
            class="entry"
            v-for="({value,focus, name, currency, companyEvent, priceWithCompanySpendings, ifAvans, avansMembrii, pretAvans, valutaAvans}, index) in data.events">
            <div class="entry__top">
              <button class="entry__name"
                      type="button"
                      @click="openModal(index, name, 'events', currency, companyEvent, ifAvans, avansMembrii, pretAvans, valutaAvans)">
                <span class="entry__index">{{ index + 1 }}</span>
                <span class="ellipsis">{{ name.length ? name : `Eveniment #${index + 1}` }}</span>
                <q-icon name="tune" size="18px" class="entry__edit" />
              </button>
              <q-input
                class="input-events-spendings entry__input"
                dense
                outlined
                :suffix="currency"
                placeholder="0"
                @blur="blurFunc(index, 'events')"
                @focus="focusButtonFunc(index, 'events')"
                :class="{ 'entry__input--focus': focus }"
                type="number"
                pattern="\d*"
                @wheel="stopScroll($event)"
                @update:model-value="newValue => handleInput(index, newValue, 'events')"
                :model-value="value"/>
            </div>
            <div v-if="companyEvent || ifAvans" class="entry__tags">
              <span v-if="companyEvent" class="tag tag--orange">
                <q-icon name="business" size="14px" />
                -11% firma · <b>{{ `${formatNumber(priceWithCompanySpendings)} ${currency}` }}</b>
              </span>
              <span v-if="ifAvans" class="tag tag--green">
                <q-icon name="payments" size="14px" />
                Avans {{ `${pretAvans} ${valutaAvans}` }} · <b>{{ avansMembrii.join(', ') }}</b>
              </span>
            </div>
          </div>
          <q-btn
            class="add-btn"
            no-caps
            unelevated
            @click="handleAdd('events')"
            label="Adauga eveniment" icon="add" />
        </div>
      </section>

      <!-- Cheltuieli -->
      <section class="panel panel--spendings">
        <div class="panel__header">
          <div class="panel__head">
            <div class="panel__icon"><q-icon name="receipt_long" size="20px" /></div>
            <div class="panel__titles">
              <div class="panel__title">
                Cheltuieli
                <span v-if="data.spendings.length" class="panel__count">{{ data.spendings?.length }}</span>
              </div>
              <div class="panel__subtitle">{{ totalsLabel(data.spendings) || 'Nicio cheltuiala adaugata' }}</div>
            </div>
          </div>
        </div>
        <div class="panel__body">
          <div
            class="entry"
            v-for="({value,focus, name, currency}, index) in data.spendings">
            <div class="entry__top">
              <button class="entry__name"
                      type="button"
                      @click="openModal(index, name, 'spendings', currency)">
                <span class="entry__index">{{ index + 1 }}</span>
                <span class="ellipsis">{{ name.length ? name : `Cheltuiala #${index + 1}` }}</span>
                <q-icon name="tune" size="18px" class="entry__edit" />
              </button>
              <q-input
                class="input-events-spendings entry__input"
                dense
                outlined
                placeholder="0"
                @blur="blurFunc(index, 'spendings')"
                @focus="focusButtonFunc(index, 'spendings')"
                :class="{ 'entry__input--focus': focus }"
                :suffix="currency"
                type="number"
                pattern="\d*"
                @wheel="stopScroll($event)"
                @update:model-value="newValue => handleInput(index, newValue, 'spendings')"
                :model-value="value"/>
            </div>
          </div>
          <q-btn
            class="add-btn"
            no-caps
            unelevated
            @click="handleAdd('spendings')"
            label="Adauga cheltuiala" icon="add" />
        </div>
      </section>

      <!-- Membrii -->
      <section class="panel panel--members">
        <button type="button"
                class="panel__header panel__header--toggle"
                :aria-expanded="membersExpansion"
                @click="membersExpansion = !membersExpansion">
          <div class="panel__head">
            <div class="panel__icon"><q-icon name="groups" size="20px" /></div>
            <div class="panel__titles">
              <div class="panel__title">Membrii</div>
              <div class="panel__subtitle">{{ activeMembersCount }} din {{ membersList.length }} participa</div>
            </div>
          </div>
        </button>
        <div class="collapse" :class="{ 'collapse--open': membersExpansion }" :inert="!membersExpansion">
          <div class="collapse__inner">
            <div class="panel__body">
              <div class="chip-group">
                <q-chip
                  v-for="{id, label} in membersList"
                  :key="id"
                  clickable
                  :icon="members[id] ? 'check' : 'person_off'"
                  :color="members[id] ? 'primary' : 'grey-3'"
                  :text-color="members[id] ? 'white' : 'grey-7'"
                  :class="{ 'chip--off': !members[id] }"
                  @click="handleMembersCheckbox(id, !members[id])">
                  {{ label }}
                </q-chip>
              </div>
              <div class="panel__hint">Atinge un membru ca sa il excluzi din impartire.</div>
            </div>
          </div>
        </div>
      </section>

      <span v-if="forceRender" style="display:none" aria-hidden="true"></span>

      <!-- Rezultate -->
      <section v-if="getResultsCalcul" class="results">
        <q-table
          class="results-table"
          flat
          hide-header
          hide-bottom
          :rows="tableRows"
          :columns="columns"
          :pagination="{ rowsPerPage: 0 }"
          row-key="name">
          <template v-slot:body="props">
            <q-tr :class="{ 'row--inactive': !props.row.status }" :props="props">
              <q-td key="name" class="results-table__name" :props="props">
                <span class="member-avatar" :data-initial="props.row.name[0]" aria-hidden="true"></span>
                <div class="member-info">
                  <span class="member-name">
                    {{ props.row.name }}
                  </span>
                  <div v-if="props.row.totalAvansEuro || props.row.totalAvansLei"
                       class="member-avans">
                    <q-icon size="14px"
                            color="positive"
                            name="payments"/>
                    <span v-if="props.row.totalAvansEuro">{{ `${props.row.totalAvansEuro} €` }}</span>
                    <span v-if="props.row.totalAvansEuro && props.row.totalAvansLei"> + </span>
                    <span v-if="props.row.totalAvansLei">{{ `${props.row.totalAvansLei} lei` }}</span>
                  </div>
                </div>
              </q-td>
              <q-td key="euro" class="results-table__amount" :props="props">
                {{ `${props.row.euro} €`  }}
              </q-td>
              <q-td key="lei" class="results-table__amount" :props="props">
                {{ `${props.row.lei} lei` }}
              </q-td>
            </q-tr>
          </template>
        </q-table>

        <div v-if="spendingsSnapshot.some(sp => sp.value)" class="results__spendings">
          <div class="results__section-label">Cheltuieli scazute</div>
          <template v-for="(sp, index) in spendingsSnapshot" :key="index">
            <div v-if="sp.value" class="spending-line">
              <span class="spending-line__name">{{ sp.name || `#${index + 1}` }}</span>
              <span class="spending-line__value">-{{ `${sp.value} ${sp.currency}` }}</span>
            </div>
          </template>
        </div>
      </section>
    </div>

    <!-- Bara de actiuni -->
    <div class="action-bar">
      <div class="action-bar__inner">
        <q-btn v-if="calculHasMade"
               round
               flat
               class="action-bar__icon"
               @click="confirmReset = true"
               icon="restart_alt">
          <q-tooltip>Reseteaza</q-tooltip>
        </q-btn>
        <q-btn
          class="action-bar__main"
          color="primary"
          unelevated
          no-caps
          icon="calculate"
          :disabled="noEvents()"
          @click="calculate()">Calculeaza</q-btn>
        <q-btn v-if="calculHasMade"
               round
               flat
               class="action-bar__icon"
               @click="openSaveDialog()"
               icon="save">
          <q-tooltip>Salveaza</q-tooltip>
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import { date, useQuasar } from "quasar";
import { useRouter } from 'vue-router';
import { saveCalculation } from '../services/calcApi';
import { useStore } from 'vuex';
const $q = useQuasar()
const store = useStore()
const router = useRouter()
const cursEuro = computed(() => store.state.moduleExample.cursEuro)

const membersExpansion = ref(false)

const confirmDeleteEvent = ref(false)
const confirmDeleteSpending = ref(false)

const modelMultiple = ref([])
const optionsAvans = ref(['Ion', 'Radu', 'Sarpe', 'Tony', 'Catalin', 'Vali'])
const priceAvans = ref(null)
const currencyAvans = ref('€')

const getResultsCalcul = ref(false)
const forceRender = ref(true)

const confirmReset = ref(false)
const saveDialog = ref(false)
const saveTitle = ref('')
const saving = ref(false)
// What "Calculeaza" showed last: this is what gets saved.
const lastResult = ref(null)

onMounted(() => {
  if (process.env.DEV) {
    window.__runTestScenario = (scenario) => {
      resetAll()
      if (scenario.cursEuro) store.commit('moduleExample/SET_CURS_EURO', scenario.cursEuro)
      data.value.events = scenario.events.map(e => ({ ...e }))
      data.value.spendings = scenario.spendings.map(sp => ({ ...sp }))
      if (scenario.members) {
        Object.keys(scenario.members).forEach(id => {
          members.value[id] = scenario.members[id]
        })
      }
      calculate()
    }
    window.__recalculateWithCursEuro = (newCursEuro) => {
      store.commit('moduleExample/SET_CURS_EURO', newCursEuro)
      calculate()
    }
  }
})

const columns = [
  { name: 'name', required: true, label: 'Nume', align: 'left', field: row => row.name, format: val => val ? `${val}` : ''},
  { name: 'euro', align: 'right', label: 'Euro', field: 'euro', format: val => val ? `${val} €` : '' },
  { name: 'lei', label: 'Lei', field: 'lei', format: val => `${val} lei` },
]
const rows = reactive([
  {
    name: 'Catalin',
    id: 'catalin',
    euro: 0,
    lei: 0,
    totalAvansEuro: null,
    totalAvansLei: null,
    status: true
  },
  {
    name: 'Vali',
    id: 'vali',
    euro: 0,
    lei: 0,
    totalAvansEuro: null,
    totalAvansLei: null,
    status: true
  },
  {
    name: 'Ion',
    id: 'ion',
    euro: 0,
    lei: 0,
    totalAvansEuro: null,
    totalAvansLei: null,
    status: true
  },
  {
    name: 'Sarpe',
    id: 'sarpe',
    euro: 0,
    lei: 0,
    totalAvansEuro: null,
    totalAvansLei: null,
    status: true
  },
  {
    name: 'Tony',
    id: 'tony',
    euro: 0,
    lei: 0,
    totalAvansEuro: null,
    totalAvansLei: null,
    status: true
  },
  {
    name: 'Radu',
    id: 'radu',
    euro: 0,
    lei: 0,
    totalAvansEuro: null,
    totalAvansLei: null,
    status: true
  },
])
const inputModal = ref('')
const modalSettings = ref({
  events: {
    index: null,
    input: '',
    openModal: false
  },
  spendings: {
    index: null,
    input: '',
    openModal: false
  }
})
const checkboxIfFirma = ref(false)
const checkboxIfAvans = ref(false)
const data = ref({
  events: [],
  spendings: []
})


const valuta = ref('')
const optionsValuta = ref(['lei', '€'])
const members = ref({
  catalin: true,
  vali: true,
  ion: true,
  sarpe: true,
  radu: true,
  tony: true
})
const membersList = ref([
  {
    id: 'catalin',
    label: 'Catalin'
  },
  {
    id: 'vali',
    label: 'Vali'
  },
  {
    id: 'ion',
    label: 'Ion'
  },
  {
    id: 'sarpe',
    label: 'Sarpe'
  },
  {
    id: 'tony',
    label: 'Tony'
  },
  {
    id: 'radu',
    label: 'Radu'
  },
])

const totalSum = ref({
  totalSumaEvenimenteEuro: 0,
  totalSumaCheltuieliEuro: 0,
  totalSumaRamasaDupaCheltuieliEuro: 0,
  totalSumaRamasaDupaCatalinSiValiEuro: 0,
  totalSumaEvenimenteLei: 0,
  totalSumaCheltuieliLei: 0,
  totalSumaRamasaDupaCheltuieliLei: 0,
  totalSumaRamasaDupaCatalinSiValiLei: 0,
  totalSumaCheltuieliLeiSchimbat: 0,
  totalSumaCheltuieliEuroSchimbat: 0,
})

const currencyToggleOptions = computed(() => optionsValuta.value.map(v => ({ label: v, value: v })))
const activeMembersCount = computed(() => Object.values(members.value).filter(Boolean).length)

function formatNumber (value) {
  return (Number(value) || 0).toLocaleString('ro-RO', { maximumFractionDigits: 2 })
}

function totalsLabel (list, isEvents = false) {
  const totals = { '€': 0, lei: 0 }
  list.forEach(obj => {
    const key = obj.currency === 'lei' ? 'lei' : '€'
    totals[key] += (isEvents && obj.companyEvent ? obj.priceWithCompanySpendings : obj.value * 1) || 0
  })
  return Object.keys(totals)
    .filter(key => totals[key])
    .map(key => `${formatNumber(totals[key])} ${key}`)
    .join(' · ')
}

function toggleAvansMember (membru) {
  modelMultiple.value = modelMultiple.value.includes(membru)
    ? modelMultiple.value.filter(m => m !== membru)
    : [...modelMultiple.value, membru]
}

const calculHasMade = ref(false)
const tableRows = ref(rows.map(r => ({...r})))
const spendingsSnapshot = ref([])

function formatSaveDate (value) {
  return value ? date.formatDate(date.extractDate(value, 'YYYY-MM-DD'), 'DD.MM.YYYY') : ''
}

function openSaveDialog () {
  const names = (lastResult.value?.events || []).map(e => e.name).filter(Boolean)
  saveTitle.value = names.join(', ')
  saveDialog.value = true
}

async function saveCalc () {
  if (!lastResult.value || saving.value) return
  saving.value = true
  try {
    // Saved on the day it is made.
    const today = date.formatDate(new Date(), 'YYYY-MM-DD')
    const saved = await saveCalculation({ ...lastResult.value, date: today, title: saveTitle.value })
    saveDialog.value = false
    $q.notify({
      message: `Calcul salvat pe ${formatSaveDate(saved.date)}`,
      color: 'positive',
      icon: 'check_circle',
      actions: [{ label: 'Vezi', color: 'white', handler: () => router.push({ name: 'calculation', params: { id: saved.id } }) }]
    })
  } catch (e) {
    $q.notify({
      message: e.status === 401 ? 'Dispozitiv neautorizat' : 'Nu s-a putut salva. Verifica conexiunea.',
      color: 'negative',
      icon: 'warning'
    })
  } finally {
    saving.value = false
  }
}

function handleMembersCheckbox (id, val) {
  members.value[id] = val
}

function noEvents () {
  return data.value.events.length < 1
}
function resetAll () {
  calculHasMade.value = false
  getResultsCalcul.value = false
  data.value.events = []
  data.value.spendings = []
  const keysTotalSum = Object.keys(totalSum.value)
  keysTotalSum.forEach(key => {
    totalSum[key] = 0
  })
  rows.forEach(row => {
    row.euro = 0
    row.lei = 0
    row.totalAvansEuro = null
    row.totalAvansLei = null
    row.status = true
    members.value[row.id] = true
  })

  valuta.value = ''
  spendingsSnapshot.value = []
}
function calculate () {
  calculHasMade.value = true
  membersExpansion.value = false

  let totalPriceEventsEuro
  let totalPriceEventsLei
  let totalPriceSpendingsEuro
  let totalPriceSpendingsLei

  totalSum.value.totalSumaCheltuieliLeiSchimbat = 0
  totalSum.value.totalSumaCheltuieliEuroSchimbat = 0

  const listPriceEvents = {
    euro: [],
    lei: []
  }
  const listPriceSpendings = {
    euro: [],
    lei: []
  }
  data.value.events.forEach(obj => {
    const listPriceKey = obj.currency === 'lei' ? 'lei' : 'euro'
    listPriceEvents[listPriceKey].push(obj.companyEvent ? obj.priceWithCompanySpendings : obj.value * 1)
  })
  data.value.spendings.forEach(obj => {
    const listPriceKey = obj.currency === 'lei' ? 'lei' : 'euro'
    listPriceSpendings[listPriceKey].push(obj.value * 1)
  })

  totalPriceEventsEuro = listPriceEvents.euro.reduce((partialSum, a) => partialSum + a, 0);
  totalPriceEventsLei = listPriceEvents.lei.reduce((partialSum, a) => partialSum + a, 0);
  totalPriceSpendingsEuro = listPriceSpendings.euro.reduce((partialSum, a) => partialSum + a, 0);
  totalPriceSpendingsLei = listPriceSpendings.lei.reduce((partialSum, a) => partialSum + a, 0);
  let totalSumRemainingEuro = totalPriceEventsEuro
  let totalSumRemainingLei = totalPriceEventsLei

  if (totalPriceEventsLei > totalPriceSpendingsLei) {
    totalSumRemainingLei = totalPriceEventsLei - totalPriceSpendingsLei
  }
  else {
    const sum = totalPriceSpendingsLei - totalPriceEventsLei
    totalSumRemainingLei = 0
    totalSumRemainingEuro = totalSumRemainingEuro - (sum / cursEuro.value)
    totalSum.value.totalSumaCheltuieliLeiSchimbat = sum / cursEuro.value
  }

  if (totalPriceEventsEuro > totalPriceSpendingsEuro) {
    totalSumRemainingEuro = totalSumRemainingEuro - totalPriceSpendingsEuro
  }
  else {
    const sum = totalPriceSpendingsEuro - totalPriceEventsEuro
    totalSumRemainingEuro = 0
    totalSumRemainingLei = totalSumRemainingLei - (sum * cursEuro.value)
    totalSum.value.totalSumaCheltuieliEuroSchimbat = sum * cursEuro.value
  }

  const catalinEuro = totalSumRemainingEuro * 0.13
  const valiEuro = totalSumRemainingEuro * 0.13

  const catalinLei = totalSumRemainingLei * 0.13
  const valiLei = totalSumRemainingLei * 0.13

  const sumAfterCatalinSiValiEuro = totalSumRemainingEuro - (catalinEuro + valiEuro)
  const sumAfterCatalinSiValiLei = totalSumRemainingLei - (catalinLei + valiLei)
  const listRestEuro = {
    ion: 0,
    sarpe: 0,
    radu: 0,
    tony: 0
  }
  const listRestLei = {
    ion: 0,
    sarpe: 0,
    radu: 0,
    tony: 0
  }
  const keysEuro = Object.keys(listRestEuro)
  const keysLei = Object.keys(listRestLei)
  keysEuro.forEach(key => {
    listRestEuro[key] = sumAfterCatalinSiValiEuro / 4
  })

  keysLei.forEach(key => {
    listRestLei[key] = sumAfterCatalinSiValiLei / 4
  })

  totalSum.value.totalSumaEvenimenteEuro = totalPriceEventsEuro
  totalSum.value.totalSumaCheltuieliEuro = totalPriceSpendingsEuro
  totalSum.value.totalSumaRamasaDupaCheltuieliEuro = totalSumRemainingEuro
  totalSum.value.totalSumaRamasaDupaCatalinSiValiEuro = sumAfterCatalinSiValiEuro

  rows.forEach(obj => {
    if (obj.name === 'Catalin') {
      obj.euro = Math.floor(catalinEuro)
      obj.lei = Math.floor(catalinLei)
    }
    if (obj.name === 'Vali') {
      obj.euro = Math.floor(valiEuro)
      obj.lei = Math.floor(valiLei)
    }
    if (obj.name === 'Ion') {
      obj.euro = Math.floor(listRestEuro.ion)
      obj.lei = Math.floor(listRestLei.ion)
    }
    if (obj.name === 'Radu') {
      obj.euro = Math.floor(listRestEuro.radu)
      obj.lei = Math.floor(listRestLei.radu)
    }
    if (obj.name === 'Sarpe') {
      obj.euro = Math.floor(listRestEuro.sarpe)
      obj.lei = Math.floor(listRestLei.sarpe)
    }
    if (obj.name === 'Tony') {
      obj.euro = Math.floor(listRestEuro.tony)
      obj.lei = Math.floor(listRestLei.tony)
    }
  })

  totalSum.value.totalSumaEvenimenteLei = totalPriceEventsLei
  totalSum.value.totalSumaCheltuieliLei = totalPriceSpendingsLei
  totalSum.value.totalSumaRamasaDupaCheltuieliLei = totalSumRemainingLei
  totalSum.value.totalSumaRamasaDupaCatalinSiValiLei = sumAfterCatalinSiValiLei

  const listAvans = {
    Catalin: { euro: [], lei: [] },
    Vali: { euro: [], lei: [] },
    Ion: { euro: [], lei: [] },
    Radu: { euro: [], lei: [] },
    Sarpe: { euro: [], lei: [] },
    Tony: { euro: [], lei: [] }
  }
  data.value.events.forEach(obj => {
    if (obj.ifAvans) {
      const valutaAvans = obj.valutaAvans === '€' ? 'euro' : 'lei'
      const valutaOpusa = obj.valutaAvans === '€' ? 'lei' : 'euro'
      const avansPerMember = _number((obj.pretAvans / obj.avansMembrii.length).toFixed(0))

      rows.forEach(o => {
        if (obj.avansMembrii.includes(o.name)) {
          if (o[valutaAvans] > avansPerMember) {
            o[valutaAvans] = _number((o[valutaAvans] - avansPerMember).toFixed(0))
          }
          else {
            o[valutaOpusa] =
              o[valutaOpusa] - (valutaAvans === 'euro'
                ? ((avansPerMember - o[valutaAvans]) * cursEuro.value)
                : (avansPerMember - o[valutaAvans]) / cursEuro.value)

            o[valutaAvans] = o[valutaAvans] - (avansPerMember - (avansPerMember - o[valutaAvans]))
          }
          listAvans[o.name][valutaAvans].push(avansPerMember * 1)
        }
      })
    }
  })

  rows.forEach(row => {
    const avansEuro = listAvans[row.name].euro.reduce((sum, a) => sum + a, 0)
    const avansLei = listAvans[row.name].lei.reduce((sum, a) => sum + a, 0)
    row.totalAvansEuro = avansEuro ? _number(avansEuro.toFixed(0)) : null
    row.totalAvansLei = avansLei ? _number(avansLei.toFixed(0)) : null
    row.status = members.value[row?.id]
    row.euro = row.euro.toFixed(0) * 1
    row.lei = row.lei.toFixed(0) * 1
  })

  Object.values(members.value).includes(false) && redistributeIncome()

  forceRender.value = false
  nextTick(() => {
    tableRows.value = rows.map(r => ({...r}))
    spendingsSnapshot.value = data.value.spendings.map(s => ({...s}))
    lastResult.value = buildResultSnapshot()
    getResultsCalcul.value = true
    forceRender.value = true
  })
}

function _number (number) {
  return number * 1
}

function buildResultSnapshot () {
  return {
    curs_euro: cursEuro.value,
    total_euro: totalSum.value.totalSumaRamasaDupaCheltuieliEuro,
    total_lei: totalSum.value.totalSumaRamasaDupaCheltuieliLei,
    events: data.value.events.map(e => ({
      name: e.name,
      value: e.value,
      currency: e.currency,
      companyEvent: e.companyEvent,
      priceWithCompanySpendings: e.priceWithCompanySpendings,
      ifAvans: e.ifAvans,
      pretAvans: e.pretAvans,
      valutaAvans: e.valutaAvans,
      avansMembrii: e.avansMembrii || []
    })),
    spendings: data.value.spendings.map(sp => ({ name: sp.name, value: sp.value, currency: sp.currency })),
    members: tableRows.value.map(r => ({
      id: r.id,
      name: r.name,
      status: !!r.status,
      euro: r.euro,
      lei: r.lei,
      avansEuro: r.totalAvansEuro || 0,
      avansLei: r.totalAvansLei || 0
    }))
  }
}

function redistributeIncome () {
  let euro = 0
  let lei = 0
  let membersActive = 0

  rows.forEach(obj => {
    if (!members.value[obj?.id]) {
      euro = euro + obj.euro
      lei = lei + obj.lei
    }
    members.value[obj?.id] && (membersActive += 1)
    obj.status = members.value[obj?.id]
  })

  rows.forEach(obj => {
    if (obj.status) {
      obj.euro = Math.floor(obj.euro + (euro / membersActive))
      obj.lei = Math.floor(obj.lei + (lei / membersActive))
    }
    else {
      obj.euro = 0
      obj.lei = 0
    }
  })
}

function handleNumeEvenimentInput (value) {
  inputModal.value = value
}

function handleNumeSpendingInput (value) {
  inputModal.value = value
}

function openModal (index, name, section, currency, companyEvent, ifAvans, avansMembrii, pretAvans, valutaAvans) {
  checkboxIfFirma.value = companyEvent ? companyEvent : false

  checkboxIfAvans.value = ifAvans ? ifAvans : false
  priceAvans.value = ifAvans ? pretAvans : null
  currencyAvans.value = ifAvans ? valutaAvans : '€'

  modelMultiple.value = ifAvans ? avansMembrii : []

  modalSettings.value[section].index = index
  modalSettings.value[section].openModal = true
  inputModal.value = name
  modalSettings.value[section].input = name
  valuta.value = currency
}

function handleSaveModalInput (index, section, valuta) {
  data.value[section].forEach((obj, i) => {
    if (i === modalSettings.value[section].index) {
      obj.name = inputModal.value
      obj.currency = valuta
      if (section === 'events') {

        obj.companyEvent = checkboxIfFirma.value
        obj.priceWithCompanySpendings = applyCompanySpendings(obj.value)

        if (priceAvans.value && modelMultiple.value.length) {
          obj.ifAvans = checkboxIfAvans.value
          obj.pretAvans = priceAvans.value
          obj.valutaAvans = currencyAvans.value
          obj.avansMembrii = modelMultiple.value
        }
        else {
          obj.ifAvans = false
        }
      }
    }
  })
  inputModal.value = ''
}

function applyCompanySpendings (value) {
  return (value - (value * 0.11))
}

function focusButtonFunc (index, section) {
  data.value[section].forEach((obj, i) => {
    i === index && (obj.focus = true)
  })
}

function blurFunc (index, section) {
  data.value[section].forEach((obj, i) => {
    i === index && (obj.focus = false)
    obj.companyEvent && (obj.priceWithCompanySpendings = applyCompanySpendings(obj.value))
  })
}

function handleInput (index, value, section) {
    data.value[section].forEach((obj, i) => {
    i === index && (obj.value = value)
  })
}

function stopScroll (event) {
  event.target.blur()
}

function handleAdd (section) {
  data.value[section].push({
    value: null,
    focus: false,
    name: '',
    avansMembrii: [],
    currency: '€',
    pretAvans: null,
    valutaAvans: '€',
    ifAvans: false
  })
}

function handleDelete (index, section) {
  data.value[section].splice(index, 1)
  confirmDeleteEvent.value = false
  confirmDeleteSpending.value = false
  modalSettings.value.events.openModal = false
  modalSettings.value.spendings.openModal = false
}

</script>
