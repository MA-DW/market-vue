<template>
  <div class="map-wrapper" :class="{ 'expanded': isExpanded }">
    <div ref="mapRef" class="map-container"></div>
  </div>
</template>

<script setup>
import { useMapControl } from '../composables/useMapControl'
import { useIndustrialData } from '../composables/useIndustrialData'
import { onMounted, watch, computed } from 'vue'

const props = defineProps({
  isExpanded: {
    type: Boolean,
    default: false
  }
})

const { filteredData } = useIndustrialData()
const { mapRef, initializeMap, updateMarkers } = useMapControl(filteredData)

onMounted(() => {
  initializeMap()
})

// Observar cambios en mapData para actualizar marcadores
watch(filteredData, () => {
  updateMarkers()
}, { deep: true })

// Observar cambios en el estado expandido
watch(() => props.isExpanded, (newValue) => {
  // Dar tiempo a que la transición termine
  setTimeout(() => {
    if (mapRef.value) {
      mapRef.value.invalidateSize()
    }
  }, 300)
})

// El mapa ahora usa los datos filtrados
const mapMarkers = computed(() => 
  filteredData.value.map(building => ({
    id: building.id,
    position: {
      lat: Number(building.latitude),
      lng: Number(building.longitude)
    },
    properties: {
      name: building.buildingName,
      class: building.class,
      sf: building.buildingSizeSF,
      status: building.status
    }
  }))
)

// Estadísticas calculadas
const statistics = computed(() => {
  const filtered = filteredData.value

  // Helper function para calcular SF
  const calculateSF = (buildings) => 
    buildings.reduce((sum, b) => sum + (Number(b.buildingSizeSF) || 0), 0)

  // Filtrar por clase y estado
  const classABuildings = filtered.filter(b => b.class === 'A')
  const classBBuildings = filtered.filter(b => b.class === 'B')
  const underConstructionBuildings = filtered.filter(b => b.status === 'Under Construction')

  return {
    classA: {
    
    },
    classB: {
      count: classBBuildings.length,
      sf: calculateSF(classBBuildings)
    },
    underConstruction: {
      count: underConstructionBuildings.length,
      sf: calculateSF(underConstructionBuildings)
    },
    total: {
      buildings: filtered.length,
      sf: calculateSF(filtered)
    },
    availability: {
      available: filtered.filter(b => b.status === 'Available'),
      occupied: filtered.filter(b => b.status === 'Occupied'),
      futureAvailable: filtered.filter(b => b.status === 'Future Available'),
      occupancyRate: calculateOccupancyRate(filtered)
    }
  }
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