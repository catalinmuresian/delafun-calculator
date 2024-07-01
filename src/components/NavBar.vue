<template>
  <div class="nav-bar">
    <q-dialog v-model="modalInfo">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Calculator delaFun v1.1</span>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="flex justify-between items-center" style="padding: 5px 16px;background: #ACD0DB">
      <img
        style="max-width: 100px;"
        src="../assets/delafun__1_-removebg-preview.png"
        alt="logo-delafun">
      <div class="logo-info flex justify-center items-center" style="gap: 10px">
        <q-btn round flat
               @click="modalInfo = !modalInfo">
          <q-icon size="25px" name="info" color="white"/>
        </q-btn>
        <img
          style="width: 100%;max-width: 45px;"
          src="../assets/calculator.png"
          alt="calc-logo">
      </div>

    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";

const modalInfo = ref(false)
</script>

<style lang="scss">


</style>
