<template>
  <div class="map-wrapper" :class="{ 'expanded': isExpanded }">
    <div ref="mapRef" class="map-container"></div>
  </div>
</template>

<script setup>
import { useMapControl } from '../composables/useMapControl'
import { useIndustrialData } from '../composables/useIndustrialData'
import { onMounted, watch } from 'vue'

const props = defineProps({
  isExpanded: {
    type: Boolean,
    default: false
  }
})

const { filteredData } = useIndustrialData()
const { mapRef, initializeMap, updateMarkers, invalidateSize } = useMapControl(filteredData)

onMounted(() => {
  initializeMap()
})

// Observar cambios en filteredData para actualizar marcadores
watch(filteredData, () => {
  updateMarkers()
}, { deep: true })

// Observar cambios en el estado expandido
watch(() => props.isExpanded, () => {
  setTimeout(() => {
    invalidateSize()
  }, 300)
})
</script>

<style scoped>
.map-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 0.3s ease;
}

.map-container {
  width: 100%;
  height: 100%;
  min-height: 60vh;
  transition: width 0.3s ease;
}

.expanded .map-container {
  width: calc(100% - 300px);
}
</style>