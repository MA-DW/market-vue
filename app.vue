<script setup lang="ts">
import { useColorStore } from '@/stores/colors'
const colorStore = useColorStore()
</script>
<template>
  <div :style="{
    '--color-primary': colorStore.primary,
    '--color-secondary': colorStore.secondary
  }" class="font-calibri">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>