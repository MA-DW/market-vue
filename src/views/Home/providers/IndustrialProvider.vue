<template>
    <div>
      <slot v-if="!loading"></slot>
      <div v-else>
        <!-- Aquí tu componente de loading -->
        <LoadingSpinner />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useIndustrialData } from '../composables/useIndustrialData'
  import { onMounted } from 'vue'
  import LoadingSpinner from '../components/LoadingSpinner.vue'
  
  const { loading, error, loadData } = useIndustrialData()
  
  onMounted(async () => {
    try {
      await loadData()
    } catch (err) {
      console.error('Error loading industrial data:', err)
    }
  })
  </script>