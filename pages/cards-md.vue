<script setup lang="ts">
import { ref } from 'vue'

const cardData = ref([
  {
    totalSum: '000,000',
    headerText: 'Card totalSum/name/header/headline'
  },
  {
    totalSum: '000,000',
    headerText: 'Card totalSum/name/header/headline'
  },
  {
    totalSum: '000,000',
    headerText: 'Card totalSum/name/header/headline'
  }
])
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6">Tarjetas medianas</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UikitText_Card_md
        v-for="(card, index) in cardData"
        :key="index"
        :totalSum="card.totalSum"
        :header-text="card.headerText"
      />
    </div>
  </div>
</template> 