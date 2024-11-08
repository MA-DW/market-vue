<template>
  <div>
    <!-- Spinner -->
    <LoadingSpinner v-if="loading" />

    <!-- Contenido principal solo se muestra cuando no está cargando -->
    <div v-else>
      <div class="layout-container">
    <!-- Resto de tu layout -->
    <div class="content-wrapper" :class="{ 'filters-expanded': isExpanded }">
      <!-- Contenido del mapa y los filtros -->
      <CRow>
         <!-- Mapa -->
        <CCol :md="isExpanded ? 9 : 12" class="map-container transition-width">
          <IndustrialMap :isExpanded="isExpanded" />
        </CCol>
          <!-- Panel de Filtros -->
          <div class="filter-sidebar" :class="{ 'expanded': isExpanded }">
            <FilterPanel />
          </div>
 
      </CRow>
    </div>
  </div>

      <!-- Estadísticas -->
      <AvailabilityStats />

      <!-- Listado -->
      <IndustrialListings />

      <!-- Propiedades Recientes -->
      <RecentProperties />
    </div>
  </div>
</template>
<style scoped>

.layout-container {
  position: relative;
  overflow-x: hidden;
}

.content-wrapper {
  padding: 1rem;
  height: calc(100vh - 72px); /* Ajusta según tu header */
  overflow-y: auto;
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { useIndustrialData } from './composables/useIndustrialData'
import LoadingSpinner from './components/LoadingSpinner.vue'
import IndustrialMap from './components/IndustrialMap.vue'
import FilterPanel from './components/FilterPanel.vue'
import AvailabilityStats from './components/AvailabilityStats.vue'
import IndustrialListings from './components/IndustrialListings.vue'
import RecentProperties from './components/RecentProperties.vue'

const { loading, loadData } = useIndustrialData()
const isExpanded = ref(false)

const toggleFilters = () => {
  isExpanded.value = !isExpanded.value
  // Forzar actualización del mapa después de la transición
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'))
  }, 300)
}
onMounted(async () => {
  await loadData()
})
</script>