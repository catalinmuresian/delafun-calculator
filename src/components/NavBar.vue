<template>
  <div class="nav-bar">
    <q-dialog v-model="modalInfo">
      <q-card style="min-width: 280px">
        <q-card-section class="column items-center">
          <q-input
            class="full-width"
            v-model.number="cursEuroLocal"
            label="Curs Euro"
            type="number"
            dense
            outlined
            @wheel="$event.target.blur()"
          />
          <q-btn class="q-mt-md full-width"
                 filled
                 label="Salveaza"
                 no-caps
                 color="positive"
                 @click="saveCursEuro"
                 v-close-popup />
          <span class="text-italic q-mt-md" style="font-size: 12px;color: grey">app last update - {{ `${date.formatDate($build_version, 'DD.MM.YYYY')}`}}</span>


        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="flex justify-between items-center" style="padding: 5px 16px;background: #ACD0DB">
      <img
        style="max-width: 100px;"
        src="../assets/delafun__1_-removebg-preview.png"
        alt="logo-delafun">
      <div class="logo-info flex justify-center items-center" style="gap: 10px">
        <q-icon class="cursor-pointer"
                @click="openSettings"
                size="25px"
                name="settings"
                color="white"/>

        <img
          style="width: 100%;max-width: 45px;"
          src="../assets/calculator.png"
          alt="calc-logo">
      </div>

    </div>
  </div>
</template>

<script setup>
import { date } from 'quasar'
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const modalInfo = ref(false)
const cursEuroLocal = ref(null)

function openSettings () {
  cursEuroLocal.value = store.state.moduleExample.cursEuro
  modalInfo.value = true
}

function saveCursEuro () {
  store.commit('moduleExample/SET_CURS_EURO', cursEuroLocal.value)
}
</script>

<style lang="scss">


</style>
