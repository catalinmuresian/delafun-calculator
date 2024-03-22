<template>
  <q-page style="padding: 0 16px">
    <q-dialog v-model="modalSettings.events.openModal" persistent>
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h6">Nume eveniment {{ modalSettings.events.input.length ? `- ${modalSettings.events.input}`: `#${modalSettings.events.id}`}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense
                   v-model="inputModal"
                   @update:model-value="newValue => handleNumeEvenimentInput(newValue)"
                   autofocus @keyup.enter="modalSettings.events.openModal = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Inchide" v-close-popup />
          <q-btn flat label="Salveaza" @click="handleSaveModalInput(modalSettings.events.id, 'events')" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modalSettings.spendings.openModal" persistent>
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h6">Nume cheltuiala {{ modalSettings.spendings.input.length ? `- ${modalSettings.spendings.input}`: `#${modalSettings.spendings.id}`}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense
                   v-model="inputModal"
                   @update:model-value="newValue => handleNumeSpendingInput(newValue)"
                   autofocus @keyup.enter="modalSettings.spendings.openModal = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Inchide" v-close-popup />
          <q-btn flat label="Salveaza" @click="handleSaveModalInput(modalSettings.spendings.id, 'spendings')" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div>
      <h6 style="margin: 20px 0 0 0;">Evenimente</h6>
      <div style="display: flex; width: 100%;justify-content: flex-end">
        <q-btn
          style="margin-bottom: 5px;"
          dense
          no-caps
          flat
          @click="handleAdd('events')"
          color="primary" label="Adauga eveniment" icon="add" />
      </div>
      <div style="display: flex;flex-direction: column;gap: 10px;">
        <div
          v-for="{value, id,focus, name} in data.events">
          <label style="margin-bottom: 2px;display: flex;align-items: center;gap: 5px">{{ `Eveniment ${name.length ? `- ${name}` : `#${id}`}`}} <q-icon @click="openModal(id, name, 'events')" color="primary" style="padding-bottom: 5px;cursor: pointer" name="edit"></q-icon></label>
          <q-input
            style="width: 100px"
            dense
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
    </div>
    <div>
      <h6 style="margin: 40px 0 0 0;">Cheltuieli</h6>
      <div style="display: flex; width: 100%;justify-content: flex-end">
        <q-btn
          style="margin-bottom: 5px;"
          dense
          no-caps
          flat
          @click="handleAdd('spendings')"
          color="primary" label="Adauga cheltuiala" icon="add" />
      </div>
      <div style="display: flex;flex-direction: column;gap: 10px;">
        <div
          v-for="{value, id,focus, name} in data.spendings">
          <label style="margin-bottom: 2px;display: flex;align-items: center;gap: 5px">{{ `Cheltuiala ${name.length ? `- ${name}` : `#${id}`}`}} <q-icon @click="openModal(id, name, 'spendings')" color="primary" style="padding-bottom: 5px;cursor: pointer" name="edit"></q-icon></label>
          <q-input
            style="width: 100px"
            dense
            @blur="blurFunc(id, 'spendings')"
            @focus="focusButtonFunc(id, 'spendings')"
            :outlined="focus"
            :filled="!focus"
            type="number"
            pattern="\d*"
            @wheel="stopScroll($event)"
            @update:model-value="newValue => handleInput(id, newValue, 'spendings')"
            :model-value="value"/>
        </div>

      </div>
    </div>
    <q-btn
      style="width: 100%;margin-top: 40px;"
      color="green"
      no-caps
      dense
      @click="calculate()">Calculeaza</q-btn>
    <hr style="margin: 40px 0;">
    <div class="flex" style="gap: 10px;align-items: center" >
      <div class="cont">
        <label class="label">Total suma evenimente</label>
        <span>{{ totalSum.totalSumaEvenimente }}</span>
      </div>
      -
      <div class="cont">
        <label class="label">Total suma cheltuieli</label>
        <span>{{ totalSum.totalSumaCheltuieli }}</span>
      </div>
      =
      <div class="cont">
        <label class="label">Total suma ramasa</label>
        <span>{{ totalSum.totalSumaRamasaDupaCheltuieli }}</span>
      </div>
    </div>
    <div class="flex" style="flex-direction: column;gap: 10px;justify-content: flex-start;margin-top: 20px;">
      <div class="flex" style="gap: 10px;">
        <label>Catalin -</label>
        <span>{{ totalSum.catalin }}</span>
      </div>
      <div class="flex" style="gap: 10px">
        <label>Vali -</label>
        <span>{{ totalSum.vali }}</span>
      </div>
      <div class="flex" style="gap: 10px">
        <label>Ion -</label>
        <span>{{ totalSum.ion }}</span>
      </div>
      <div class="flex" style="gap: 10px">
        <label>Radu -</label>
        <span>{{ totalSum.radu }}</span>
      </div>
      <div class="flex" style="gap: 10px">
        <label>Sarpe -</label>
        <span>{{ totalSum.sarpe }}</span>
      </div>
      <div class="flex" style="gap: 10px">
        <label>Tony -</label>
        <span>{{ totalSum.tony }}</span>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {ref} from "vue";

const inputModal = ref('')
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
const data = ref({
  events: [
    {
      id: 1,
      value: null,
      focus: false,
      name: ''
    }
  ],
  spendings: [
    {
      id: 1,
      value: null,
      focus: false,
      name: ''
    }
  ]
})

const totalSum = ref({
  totalSumaEvenimente: 0,
  totalSumaCheltuieli: 0,
  totalSumaRamasaDupaCheltuieli: 0,
  totalSumaRamasaDupaCatalinSiVali: 0,
  catalin: 0,
  vali: 0,
  ion: 0,
  radu: 0,
  sarpe: 0,
  tony: 0
})

function calculate () {
  let totalPriceEvents = 0
  let totalPriceSpendings = 0

  const listPriceEvents = []
  const listPriceSpendings = []
  data.value.events.forEach(obj => {
    listPriceEvents.push(obj.value * 1)
  })
  data.value.spendings.forEach(obj => {
    listPriceSpendings.push(obj.value * 1)
  })

  totalPriceEvents = listPriceEvents.reduce((partialSum, a) => partialSum + a, 0);
  totalPriceSpendings = listPriceSpendings.reduce((partialSum, a) => partialSum + a, 0);
  const totalSumRemaining = totalPriceEvents - totalPriceSpendings

  const catalin = totalSumRemaining * 0.13
  const vali = totalSumRemaining * 0.13

  const sumAfterCatalinSiVali = totalSumRemaining - (catalin + vali)
  const listRest = {
    ion: 0,
    sarpe: 0,
    radu: 0,
    tony: 0
  }
  const keys = Object.keys(listRest)
  keys.forEach(key => {
    listRest[key] = sumAfterCatalinSiVali / 4
  })
  totalSum.value.totalSumaEvenimente = totalPriceEvents
  totalSum.value.totalSumaCheltuieli = totalPriceSpendings
  totalSum.value.totalSumaRamasaDupaCheltuieli = totalSumRemaining
  totalSum.value.totalSumaRamasaDupaCatalinSiVali = sumAfterCatalinSiVali
  totalSum.value.catalin = catalin
  totalSum.value.vali = vali
  totalSum.value.ion = listRest.ion
  totalSum.value.radu = listRest.radu
  totalSum.value.sarpe = listRest.sarpe
  totalSum.value.tony = listRest.tony
}

function handleNumeEvenimentInput (value) {
  inputModal.value = value
}

function handleNumeSpendingInput (value) {
  inputModal.value = value
}

function openModal (id, name, section) {
  modalSettings.value[section].id = id
  modalSettings.value[section].openModal = true
  inputModal.value = name
  modalSettings.value[section].input = name
}






function handleSaveModalInput (id, section) {
  data.value[section].forEach(obj => {
    if (obj.id === modalSettings.value[section].id) {
      obj.name = inputModal.value
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
    name: ''
  })

}

</script>

<style lang="scss">
.label {
  font-size: 10px;
}
.cont {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
