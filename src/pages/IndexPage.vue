<template>
  <q-page style="min-height: unset;">
    <q-dialog v-model="confirmDeleteEvent" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Esti sigur ca vrei sa stergi acest event ?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat
                 label="Nu"
                 no-caps
                 color="grey"
                 v-close-popup />
          <q-btn flat
                 no-caps
                 @click="handleDelete(modalSettings.events.index, 'events')"
                 label="Da"
                 color="info"
                 v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDeleteSpending" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Esti sigur ca vrei sa stergi aceasta cheltuiala ?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat
                 label="Nu"
                 no-caps
                 color="grey"
                 v-close-popup />
          <q-btn flat
                 no-caps
                 @click="handleDelete(modalSettings.spendings.index, 'spendings')"
                 label="Da"
                 color="info"
                 v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="confirmReset" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Esti sigur ca vrei sa resetezi totul ?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat
                 label="Nu"
                 no-caps
                 color="grey"
                 v-close-popup />
          <q-btn flat
                 no-caps
                 @click="resetAll"
                 label="Da"
                 color="info"
                 v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modalSettings.events.openModal" persistent>
      <q-card style="width: 100%">
        <q-card-section>
          <div style="display: flex;width: 100%;justify-content: space-between;align-items: center;">
            <span style="color: grey;font-size: 12px;margin-bottom: 5px;text-transform: capitalize">{{ modalSettings.events.input.length ? `${modalSettings.events.input}`: `#${modalSettings.events.index}`}}</span>
            <q-btn
              v-close-popup
              icon="close"
              dense
              color="grey"
              flat>
            </q-btn>
          </div>
          <div class="text-h6">Setari eveniment</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <span>Nume</span>
          <q-input dense
                   v-model="inputModal"
                   @update:model-value="newValue => handleNumeEvenimentInput(newValue)"
                   @keyup.enter="modalSettings.events.openModal = false" />
        </q-card-section>

        <q-card-section style="display: flex;gap: 5px;align-items: flex-start;">
          <q-checkbox dense color="positive" v-model="checkboxIfFirma" />
          Cheltuieli firma 11%
        </q-card-section>
        <q-card-section>
          <span style="margin-bottom: 6px;display: block;">Selecteaza moneda</span>
          <q-select class="currency-select"
                    behavior="menu"
                    style="width: 100%;max-width: 75px;" outlined v-model="valuta" dense :options="optionsValuta">
          </q-select>
        </q-card-section>

        <q-card-actions align="between" class="text-primary">
          <q-btn flat
                 label="Sterge"
                 color="negative"
                 no-caps
                 @click="confirmDeleteEvent = true" />
          <q-btn flat label="Salveaza" no-caps @click="handleSaveModalInput(modalSettings.events.index, 'events', valuta)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modalSettings.spendings.openModal" persistent>
      <q-card style="width: 100%">
        <q-card-section>
          <div style="display: flex;width: 100%;justify-content: space-between;align-items: center;">
            <span style="color: grey;font-size: 12px;margin-bottom: 5px;text-transform: capitalize">{{ modalSettings.spendings.input.length ? `${modalSettings.spendings.input}`: `#${modalSettings.spendings.index}`}}</span>
            <q-btn
              v-close-popup
              icon="close"
              dense
              color="grey"
              flat>
              </q-btn>
          </div>
          <div style="font-size: 16px">Setari cheltuiala</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <span>Nume</span>
          <q-input dense
                   v-model="inputModal"
                   @update:model-value="newValue => handleNumeSpendingInput(newValue)"
                   @keyup.enter="modalSettings.spendings.openModal = false" />
        </q-card-section>
        <q-card-section>
          <span style="margin-bottom: 6px;display: block;">Selecteaza moneda</span>
          <q-select  style="width: 100%;max-width: 85px;"
                     outlined
                     behavior="menu"
                     v-model="valuta"
                     dense :options="optionsValuta">
          </q-select>
        </q-card-section>

        <q-card-actions align="between" class="text-primary">
          <q-btn flat
                 label="Sterge"
                 no-caps
                 color="negative"
                 @click="confirmDeleteSpending = true"/>
          <q-btn flat label="Salveaza" no-caps @click="handleSaveModalInput(modalSettings.spendings.index, 'spendings', valuta)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-expansion-item v-model="eventsExpansion">
      <template v-slot:header>
        <q-item-section>
          <div>
            <h6 style="margin: 0;position: relative;display: inline">Evenimente
              <q-badge v-if="data.events.length"
                       style="right: -20px;font-weight: 500"
                       rounded
                       floating
                       color="positive" :label="data.events?.length" />
            </h6>
          </div>
        </q-item-section>
      </template>
      <q-card>
        <q-card-section style="padding-top: 0;">
          <div style="display: flex;justify-content: flex-end">
            <q-btn
              style="margin-bottom: 5px;"
              dense
              no-caps
              flat
              @click="handleAdd('events')"
              color="info" label="Adauga eveniment" icon="add" />
          </div>
          <div style="display: flex;flex-direction: column;gap: 10px;">
            <div
              v-for="({value,focus, name, currency, companyEvent, priceWithCompanySpendings}, index) in data.events">
              <label
                style="margin-bottom: 2px;display: flex;align-items: center;gap: 5px">
                {{ `Eveniment ${name.length ? `- ${name}` : `#${index + 1}`}`}} <q-icon
                @click="openModal(index, name, 'events', currency, companyEvent)"
                size="20px"
                color="grey"
                style="cursor: pointer" name="settings"/>
              </label>
              <div style="display: flex;gap: 15px;align-items: center">
                <div style="display: flex;">
                  <q-input
                    style="width: 100px"
                    class="input-events-spendings"
                    dense
                    :suffix="currency"
                    @blur="blurFunc(index, 'events')"
                    @focus="focusButtonFunc(index, 'events')"
                    :outlined="focus"
                    :filled="!focus"
                    type="number"
                    pattern="\d*"
                    @wheel="stopScroll($event)"
                    @update:model-value="newValue => handleInput(index, newValue, 'events')"
                    :model-value="value"/>
                  <q-icon v-if="companyEvent" size="18px" color="orange" name="info"/>
                </div>
                <div
                  v-if="companyEvent"
                  style="display: flex;flex-direction: column;justify-content: space-between">
                  <span style="font-size: 10px;color: grey;font-weight: 500;">- 11% Firma</span>
                  <span style="font-size: 14px;color: black;font-weight: 500;">{{ `${priceWithCompanySpendings} ${currency}` }}</span>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item v-model="spendingsExpansion">
      <template v-slot:header>
        <q-item-section>
          <div>
            <h6 style="margin: 0;position: relative;display: inline">Cheltuieli
              <q-badge v-if="data.spendings.length"
                       style="right: -20px;font-weight: 500" rounded floating color="negative"
                       :label="data.spendings?.length" />
            </h6>
          </div>
        </q-item-section>
      </template>
      <q-card>
        <q-card-section style="padding-top: 0;">
          <div style="display: flex;justify-content: flex-end">
            <q-btn
              style="margin-bottom: 5px;"
              dense
              no-caps
              flat
              @click="handleAdd('spendings')"
              color="info" label="Adauga cheltuiala" icon="add" />
          </div>
          <div style="display: flex;flex-direction: column;gap: 10px;">
            <div
              v-for="({value,focus, name, currency}, index) in data.spendings">
              <label style="margin-bottom: 2px;display: flex;align-items: center;gap: 5px">{{ `Cheltuiala ${name.length ? `- ${name}` : `#${index + 1}`}`}}
                <q-icon @click="openModal(index, name, 'spendings', currency)"
                        size="20px" color="grey" style="cursor: pointer"
                        name="settings"></q-icon></label>
              <q-input
                class="input-events-spendings"
                style="width: 100px;"
                dense
                @blur="blurFunc(index, 'spendings')"
                @focus="focusButtonFunc(index, 'spendings')"
                :outlined="focus"
                :suffix="currency"
                :filled="!focus"
                type="number"
                pattern="\d*"
                @wheel="stopScroll($event)"
                @update:model-value="newValue => handleInput(index, newValue, 'spendings')"
                :model-value="value"/>
            </div>

          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <div style="padding: 0 16px;margin-top: 20px;display: flex;align-items: center;gap: 10px">
      <q-btn
        style="width: 100%;"
        color="info"
        no-caps
        dense
        :disabled="noEvents()"
        @click="calculate()">Calculeaza</q-btn>
      <q-btn v-if="calculHasMade"
             round
             @click="confirmReset = true"
             dense
             color="brown-4"
             icon="restart_alt" />
    </div>
    <div
      v-if="getResultsCalcul"
      style="margin-top: 20px;padding: 0 16px;">
      <q-table
        flat
        hide-header
        hide-bottom
        bordered
        :rows="rows"
        :columns="columns"
        :pagination="{ rowsPerPage: 0 }"
        row-key="name"
        separator="cell">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="euro" :props="props">
              {{ `${props.row.euro} €`  }}
            </q-td>
            <q-td key="lei" :props="props">
              {{ `${props.row.lei} lei` }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-expansion-item
        style="margin-top: 10px;"
        dense
        label="Detaliat"
      >
        <q-card>
          <q-card-section>
            <div class="flex" style="gap: 10px;align-items: center" >
              <div class="cont">
                <label class="label">Total suma evenimente</label>
                <span>{{ totalSum.totalSumaEvenimenteEuro }} euro</span>
              </div>
              -
              <div class="cont">
                <label class="label">Total suma cheltuieli</label>
                <span :style="totalSum.totalSumaCheltuieliEuroSchimbat > 1 && 'text-decoration: line-through;'">{{ totalSum.totalSumaCheltuieliEuro }} euro</span>
              </div>
              <span v-if="totalSum.totalSumaCheltuieliLeiSchimbat > 1">-</span>
              <div
                v-if="totalSum.totalSumaCheltuieliLeiSchimbat > 1"
                class="cont">
                <label class="label">Total suma cheltuieli lei schimbat</label>
                <span>{{ totalSum.totalSumaCheltuieliLeiSchimbat }} euro</span>
              </div>
              =
              <div class="cont">
                <label class="label">Total suma ramasa</label>
                <span>{{ totalSum.totalSumaRamasaDupaCheltuieliEuro }} euro</span>
              </div>
            </div>
            <div class="flex" style="gap: 10px;align-items: center;margin-top: 20px">
              <div class="cont">
                <label class="label">Total suma evenimente lei</label>
                <span>{{ totalSum.totalSumaEvenimenteLei }} lei</span>
              </div>
              -
              <div class="cont">
                <label class="label">Total suma cheltuieli lei</label>
                <span :style="totalSum.totalSumaCheltuieliLeiSchimbat > 1 && 'text-decoration: line-through;'">{{ totalSum.totalSumaCheltuieliLei }} lei</span>
              </div>
              <span v-if="totalSum.totalSumaCheltuieliEuroSchimbat > 1">-</span>
              <div class="cont"
                   v-if="totalSum.totalSumaCheltuieliEuroSchimbat > 1">
                <label class="label">Total suma cheltuieli euro schimbat</label>
                <span>{{ totalSum.totalSumaCheltuieliEuroSchimbat }} lei</span>
              </div>
              =
              <div class="cont">
                <label class="label">Total suma ramasa lei</label>
                <span>{{ totalSum.totalSumaRamasaDupaCheltuieliLei }} lei</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </q-page>
</template>

<script setup>
import {ref} from "vue";

const eventsExpansion = ref(false)
const spendingsExpansion = ref(false)

const confirmDeleteEvent = ref(false)
const confirmDeleteSpending = ref(false)

const getResultsCalcul = ref(false)

const confirmReset = ref(false)

const columns = [
  { name: 'name', required: true, label: 'Nume', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true},
  { name: 'euro', align: 'center', label: 'Euro', field: 'euro', format: val => `${val} €`,  sortable: true },
  { name: 'lei', label: 'Lei', field: 'lei', format: val => `${val} lei`, sortable: true },
]

const rows = [
  {
    name: 'Catalin',
    euro: 0,
    lei: 0,
  },
  {
    name: 'Vali',
    euro: 0,
    lei: 0,
  },
  {
    name: 'Ion',
    euro: 0,
    lei: 0,
  },
  {
    name: 'Sarpe',
    euro: 0,
    lei: 0,
  },
  {
    name: 'Tony',
    euro: 0,
    lei: 0,
  },
  {
    name: 'Radu',
    euro: 0,
    lei: 0,
  },
]

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
const data = ref({
  events: [],
  spendings: []
})
const valuta = ref('')
const optionsValuta = ref(['lei', '€'])

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

const calculHasMade = ref(false)

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
  })
  valuta.value = ''
  eventsExpansion.value = false
  spendingsExpansion.value = false
}
function calculate () {
  getResultsCalcul.value = true
  calculHasMade.value = true
  eventsExpansion.value = false
  spendingsExpansion.value = false

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
    totalSumRemainingEuro = totalSumRemainingEuro - (sum / 5)
    totalSum.value.totalSumaCheltuieliLeiSchimbat = sum / 5
  }

  if (totalPriceEventsEuro > totalPriceSpendingsEuro) {
    totalSumRemainingEuro = totalSumRemainingEuro - totalPriceSpendingsEuro
  }
  else {
    const sum = totalPriceSpendingsEuro - totalPriceEventsEuro
    totalSumRemainingEuro = 0
    totalSumRemainingLei = totalSumRemainingLei - (sum * 5)
    totalSum.value.totalSumaCheltuieliEuroSchimbat = sum * 5
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

}

function handleNumeEvenimentInput (value) {
  inputModal.value = value
}

function handleNumeSpendingInput (value) {
  inputModal.value = value
}

function openModal (index, name, section, currency, companyEvent) {
  checkboxIfFirma.value = companyEvent ? companyEvent : false
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
  data.value[section].push(  {
    value: null,
    focus: false,
    name: '',
    currency: '€'
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

<style lang="scss">
.currency-select {
  .q-field__native {
    justify-content: center;
  }
}
.label {
  font-size: 10px;
}
.cont {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.input-events-spendings {
  .q-field__native {
    text-align: right;
  }
}
</style>
