<script setup lang="ts">
const searchQuery = ref('')
const hasError = ref(false)
const isDisabled = ref(false)
</script>
<template>
  <h1>Buscador</h1>
  <div class="w-3/12 p-3">
    <UikitSearch v-model="searchQuery" :disabled="isDisabled" placeholder="Search" />

    <br>

    <UikitSearch v-model="searchQuery" :disabled="true" placeholder="Search" />

    <br>

    <UikitSearch v-model="searchQuery" error="text error" placeholder="Search" />

    <br>
    <span>{{ searchQuery }}</span>
  </div>

  <div class="w-3/12 p-3 bg-primary">
    <UikitSearch v-model="searchQuery" :disabled="isDisabled" placeholder="Search" />

    <br>

    <UikitSearch v-model="searchQuery" :disabled="true" placeholder="Search" />

    <br>

    <UikitSearch v-model="searchQuery" error="text error" placeholder="Search" />

    <br>
    <span>{{ searchQuery }}</span>
  </div>
</template>