<script setup lang="ts">
import { ref } from 'vue'

const cardData = ref([
  {
    title: '000',
    headerText: 'Card title/name/header',
    description: '000,000,000'
  },
  {
    title: '000',
    headerText: 'Card title/name/header',
    description: '000,000,000'
  },
  {
    title: '000',
    headerText: 'Card title/name/header',
    description: '000,000,000'
  }
])
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6">Tarjetas grandes</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UikitTextCard
        v-for="(card, index) in cardData"
        :key="index"
        :title="card.title"
        :header-text="card.headerText"
        :description="card.description"
      />
    </div>
  </div>
</template> 