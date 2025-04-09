<script setup lang="ts">
import { ref } from 'vue'

const cardData = ref([
  {
    totalNumber: '000',
    headerText: 'Card title/name/header',
    totalSum: '000,000,000'
  },
  {
    totalNumber: '000',
    headerText: 'Card title/name/header',
    totalSum: '000,000,000'
  },
  {
    totalNumber: '000',
    headerText: 'Card title/name/header',
    totalSum: '000,000,000'
  }
])
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6">Tarjetas grandes</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UikitText_Card_lg
        v-for="(card, index) in cardData"
        :key="index"
        :total-number="card.totalNumber"
        :header-text="card.headerText"
        :total-sum="card.totalSum"
      />
    </div>
  </div>
</template> 