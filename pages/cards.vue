<script setup lang="ts">
import { ref } from 'vue'

const cardData = ref([
  {
    header: 'Card',
    title: '000',
    subtitle: 'title/name/header'
  },
  {
    header: 'Card',
    title: '000,000,000',
    subtitle: 'subtitle/description'
  },
  {
    header: 'Card',
    title: '000',
    subtitle: 'footer/additional info'
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
        :header="card.header"
        :title="card.title"
        :subtitle="card.subtitle"
      />
    </div>
  </div>
</template> 