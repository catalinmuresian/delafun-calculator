<template>
  <q-page>
    <q-dialog v-model="modalSettings.events.openModal" persistent>
      <q-card style="width: 100%">
        <q-card-section>
          <div style="display: flex;width: 100%;justify-content: space-between;align-items: center;">
            <span style="color: grey;font-size: 12px;margin-bottom: 5px;text-transform: capitalize">{{ modalSettings.events.input.length ? `${modalSettings.events.input}`: `#${modalSettings.events.id}`}}</span>
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
          <q-select class="currency-select" style="width: 100%;max-width: 75px;" outlined v-model="valuta" dense :options="optionsValuta">
          </q-select>
        </q-card-section>

        <q-card-actions align="between" class="text-primary">
          <q-btn flat label="Sterge" color="negative" no-caps v-close-popup @click="handleDelete(modalSettings.events.id, 'events')" />
          <q-btn flat label="Salveaza" no-caps @click="handleSaveModalInput(modalSettings.events.id, 'events', valuta)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modalSettings.spendings.openModal" persistent>
      <q-card style="width: 100%">
        <q-card-section>
          <div style="display: flex;width: 100%;justify-content: space-between;align-items: center;">
            <span style="color: grey;font-size: 12px;margin-bottom: 5px;text-transform: capitalize">{{ modalSettings.spendings.input.length ? `${modalSettings.spendings.input}`: `#${modalSettings.spendings.id}`}}</span>
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
          <q-select  style="width: 100%;max-width: 85px;" outlined v-model="valuta" dense :options="optionsValuta">
          </q-select>
        </q-card-section>

        <q-card-actions align="between" class="text-primary">
          <q-btn flat label="Sterge" no-caps color="negative" v-close-popup @click="handleDelete(modalSettings.spendings.id, 'spendings')"/>
          <q-btn flat label="Salveaza" no-caps @click="handleSaveModalInput(modalSettings.spendings.id, 'spendings', valuta)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-expansion-item v-model="eventsExpansion">
      <template v-slot:header>
        <q-item-section>
          <div>
            <h6 style="margin: 0;position: relative;display: inline">Evenimente
              <q-badge v-if="data.events.length" style="right: -20px;font-weight: 500" rounded floating color="positive" :label="data.events?.length" />
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
              v-for="{value, id,focus, name, currency} in data.events">
              <label style="margin-bottom: 2px;display: flex;align-items: center;gap: 5px">{{ `Eveniment ${name.length ? `- ${name}` : `#${id}`}`}} <q-icon @click="openModal(id, name, 'events', currency)" size="20px" color="grey"  style="cursor: pointer" name="settings"></q-icon></label>
              <q-input
                style="width: 100px"
                class="input-events-spendings"
                dense
                :suffix="currency"
                @blur="blurFunc(id, 'events')"
                @focus="focusButtonFunc(id, 'events')"
                :outlined="focus"
                :filled="!focus"
                type="number"
                pattern="\d*"
                @wheel="stopScroll($event)"
                @update:model-value="newValue => handleInput(id, newValue, 'events')"
                :model-value="value"/>
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
              <q-badge v-if="data.spendings.length" style="right: -20px;font-weight: 500" rounded floating color="negative" :label="data.spendings?.length" />
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
              v-for="{value, id,focus, name, currency} in data.spendings">
              <label style="margin-bottom: 2px;display: flex;align-items: center;gap: 5px">{{ `Cheltuiala ${name.length ? `- ${name}` : `#${id}`}`}} <q-icon @click="openModal(id, name, 'spendings', currency)" size="20px" color="grey" style="cursor: pointer" name="settings"></q-icon></label>
              <q-input
                class="input-events-spendings"
                style="width: 100px;"
                dense
                @blur="blurFunc(id, 'spendings')"
                @focus="focusButtonFunc(id, 'spendings')"
                :outlined="focus"
                :suffix="currency"
                :filled="!focus"
                type="number"
                pattern="\d*"
                @wheel="stopScroll($event)"
                @update:model-value="newValue => handleInput(id, newValue, 'spendings')"
                :model-value="value"/>
            </div>

          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <div style="padding: 0 16px;margin-top: 20px;">
      <q-btn
        style="width: 100%;"
        color="info"
        no-caps
        dense
        @click="calculate()">Calculeaza</q-btn>
    </div>
    <div style="padding: 0 16px;">
      <hr style="margin: 16px 0;">
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

      <div class="flex" style="flex-direction: column;gap: 10px;justify-content: flex-start;margin-top: 20px;">
        <div class="flex" style="gap: 10px;">
          <label>Catalin -</label>
          <div style="display: flex">
            <span>{{ totalSum.catalinEuro }} euro</span>
            <div style="margin-left: 4px;">+
              <span>{{ totalSum.catalinLei }} lei</span>
          </div>
          </div>
        </div>
        <div class="flex" style="gap: 10px">
          <label>Vali -</label>
          <div style="display: flex">
            <span>{{ totalSum.valiEuro }} euro</span>
            <div style="margin-left: 4px;">+
              <span>{{ totalSum.valiLei }} lei</span>
            </div>
          </div>

        </div>
        <div class="flex" style="gap: 10px">
          <label>Ion -</label>
          <div style="display: flex">
            <span>{{ totalSum.ionEuro }} euro</span>
            <div style="margin-left: 4px;">+
              <span>{{ totalSum.ionLei }} lei</span>
            </div>
          </div>

        </div>
        <div class="flex" style="gap: 10px">
          <label>Radu -</label>
          <div style="display: flex">
            <span>{{ totalSum.raduEuro }} euro</span>
            <div style="margin-left: 4px;">+
              <span>{{ totalSum.raduLei }} lei</span>
            </div>
          </div>

        </div>
        <div class="flex" style="gap: 10px">
          <label>Sarpe -</label>
          <div style="display: flex">
            <span>{{ totalSum.sarpeEuro }} euro</span>
            <div style="margin-left: 4px;">+
              <span>{{ totalSum.sarpeLei }} lei</span>
            </div>
          </div>

        </div>
        <div class="flex" style="gap: 10px">
          <label>Tony -</label>
          <div style="display: flex">
            <span>{{ totalSum.tonyEuro }} euro</span>
            <div style="margin-left: 4px;">+
              <span>{{ totalSum.tonyLei }} lei</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {ref} from "vue";

const eventsExpansion = ref(false)
const spendingsExpansion = ref(false)

const inputModal = ref('')
const cursEuro = ref(5)
const modalSettings = ref({
  events: {
    id: null,
    input: '',
    openModal: false
  },
  spendings: {
    id: null,
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
  catalinEuro: 0,
  valiEuro: 0,
  ionEuro: 0,
  raduEuro: 0,
  sarpeEuro: 0,
  tonyEuro: 0,
  totalSumaEvenimenteLei: 0,
  totalSumaCheltuieliLei: 0,
  totalSumaRamasaDupaCheltuieliLei: 0,
  totalSumaRamasaDupaCatalinSiValiLei: 0,
  catalinLei: 0,
  valiLei: 0,
  ionLei: 0,
  raduLei: 0,
  sarpeLei: 0,
  tonyLei: 0,
  totalSumaCheltuieliLeiSchimbat: 0,
  totalSumaCheltuieliEuroSchimbat: 0,
})

function calculate () {
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
    listPriceEvents[listPriceKey].push(obj.value * 1)
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
  totalSum.value.catalinEuro= catalinEuro
  totalSum.value.valiEuro = valiEuro
  totalSum.value.ionEuro = listRestEuro.ion
  totalSum.value.raduEuro = listRestEuro.radu
  totalSum.value.sarpeEuro = listRestEuro.sarpe
  totalSum.value.tonyEuro= listRestEuro.tony

  totalSum.value.totalSumaEvenimenteLei = totalPriceEventsLei
  totalSum.value.totalSumaCheltuieliLei = totalPriceSpendingsLei
  totalSum.value.totalSumaRamasaDupaCheltuieliLei = totalSumRemainingLei
  totalSum.value.totalSumaRamasaDupaCatalinSiValiLei = sumAfterCatalinSiValiLei
  totalSum.value.catalinLei= catalinLei
  totalSum.value.valiLei = valiLei
  totalSum.value.ionLei = listRestLei.ion
  totalSum.value.raduLei = listRestLei.radu
  totalSum.value.sarpeLei = listRestLei.sarpe
  totalSum.value.tonyLei= listRestLei.tony
}

function handleNumeEvenimentInput (value) {
  inputModal.value = value
}

function handleNumeSpendingInput (value) {
  inputModal.value = value
}

function openModal (id, name, section, currency) {
  modalSettings.value[section].id = id
  modalSettings.value[section].openModal = true
  inputModal.value = name
  modalSettings.value[section].input = name
  valuta.value = currency
}






function handleSaveModalInput (id, section, valuta) {
  data.value[section].forEach(obj => {
    if (obj.id === modalSettings.value[section].id) {
      obj.name = inputModal.value
      obj.currency = valuta
    }
  })
  inputModal.value = ''
}



function focusButtonFunc (id, section) {
  data.value[section].forEach(obj => {
    obj.id === id && (obj.focus = true)
  })
}

function blurFunc (id, section) {
  data.value[section].forEach(obj => {
    obj.id === id && (obj.focus = false)
  })
}

function handleInput (id, value, section) {
    data.value[section].forEach(obj => {
    obj.id === id && (obj.value = value)
  })
}

function stopScroll (event) {
  event.target.blur()
}

function handleAdd (section) {
  data.value[section].push(  {
    id: data.value[section].length + 1,
    value: null,
    focus: false,
    name: '',
    currency: '€'
  })

}

function handleDelete (id, section) {
  data.value[section] = data.value[section].filter(obj => obj.id !== id)
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
