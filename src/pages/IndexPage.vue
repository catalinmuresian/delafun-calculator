<template>
  <q-page style="padding: 0 16px">
    <q-dialog v-model="modalNumeEveniment" persistent>
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h6">Nume eveniment {{ `#${idNumeEvenimentEdited}`}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense
                   v-model="inputNumeEveniment"
                   @update:model-value="newValue => handleNumeEvenimentInput(newValue)"
                   autofocus @keyup.enter="modalNumeEveniment = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Inchide" v-close-popup />
          <q-btn flat label="Salveaza" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div>
      <h6 style="margin: 15px 0;">Evenimente</h6>
      <div style="display: flex; width: 100%;justify-content: flex-end">
        <q-btn
          style="margin-bottom: 5px;"
          dense
          no-caps
          flat
          @click="addEvent()"
          color="primary" label="Adauga eveniment" icon="add" />
      </div>
      <div style="display: flex;flex-direction: column;gap: 10px;">
        <div
          v-for="{value, id,focus, numeEvent} in events">
          <label style="margin-bottom: 2px;display: flex;align-items: center;gap: 5px">{{ `Eveniment ${numeEvent.length ? `- ${numeEvent}` : `#${id}`}`}} <q-icon @click="openModalNameEvent(id)" color="primary" style="padding-bottom: 5px;cursor: pointer" name="edit"></q-icon></label>
          <q-input
            style="width: 100px"
            dense
            @blur="blurFunc(id)"
            @focus="focusButtonFunc(id)"
            :outlined="focus"
            :filled="!focus"
            type="number"
            pattern="\d*"
            @wheel="stopScroll($event)"
            @update:model-value="newValue => handleInput(id, newValue)"
            :model-value="value"/>
        </div>

      </div>
    </div>
    <div>
      <h6 style="margin-bottom: 15px;">Cheltuieli</h6>
      <div style="display: flex; width: 100%;justify-content: flex-end">
        <q-btn
          style="margin-bottom: 5px;"
          dense
          no-caps
          flat
          @click="addEvent()"
          color="primary" label="Adauga cheltuiala" icon="add" />
      </div>
      <div style="display: flex;flex-direction: column;gap: 10px;">
        <div
          v-for="{value, id,focus, numeEvent} in events">
          <label style="margin-bottom: 2px;display: flex;align-items: center;gap: 5px">{{ `Cheltuiala ${numeEvent.length ? `- ${numeEvent}` : `#${id}`}`}} <q-icon @click="openModalNameEvent(id)" color="primary" style="padding-bottom: 5px;cursor: pointer" name="edit"></q-icon></label>
          <q-input
            style="width: 100px"
            dense
            @blur="blurFunc(id)"
            @focus="focusButtonFunc(id)"
            :outlined="focus"
            :filled="!focus"
            type="number"
            pattern="\d*"
            @wheel="stopScroll($event)"
            @update:model-value="newValue => handleInput(id, newValue)"
            :model-value="value"/>
        </div>

      </div>
    </div>

    <q-btn
      style="width: 100%;margin-top: 100px;"
      color="green"
      no-caps
      dense
      @click="calculate()">Calculeaza</q-btn>

  </q-page>
</template>

<script setup>
import {ref} from "vue";
const modalNumeEveniment = ref(false)
const idNumeEvenimentEdited = ref(null)
const inputNumeEveniment = ref('')

function calculate () {

}
function handleNumeEvenimentInput (value) {
  events.value.forEach(obj => {
    if (obj.id === idNumeEvenimentEdited.value) {
      obj.numeEvent = value
    }
  })
}
function openModalNameEvent (id) {
  idNumeEvenimentEdited.value = id
  modalNumeEveniment.value = true
}

const events = ref([
  {
    id: 1,
    value: null,
    focus: false,
    numeEvent: ''
  }
])

function focusButtonFunc (id) {
  events.value.forEach(obj => {
    obj.id === id && (obj.focus = true)
  })
}

function blurFunc (id) {
  events.value.forEach(obj => {
    obj.id === id && (obj.focus = false)
  })
}

function handleInput (id, value) {
  events.value.forEach(obj => {
    obj.id === id && (obj.value = value)
  })
}

function stopScroll (event) {
  event.target.blur()
}

function addEvent () {
  events.value.push(  {
    id: events.value.length + 1,
    value: null,
    focus: false,
    numeEvent: ''
  })

}

</script>
