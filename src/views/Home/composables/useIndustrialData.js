// composables/useIndustrialData.js
import { ref, computed } from 'vue'
import mockIndustrialData from '../../../mocks/industrialData'


// Estado global compartido
const state = {
  buildingsDataRef: ref([]),
  loading: ref(true),
  error: ref(null),
  dataInitialized: ref(false),
  filters: ref({
    market: '',
    submarket: '',
    class: '',
    type: '',
    deal: '',
    aboveMarket: '',
    sizeMin: null,
    sizeMax: null,
    region: '',
    currency: '',
    useMetric: false,
    availabilityStatus: '',
    availableFrom: null,
    availableTo: null,
    occupancyRate: null,
  })
}

// Helper functions
const calculateSF = (buildings) => 
  buildings.reduce((sum, b) => sum + (Number(b.buildingSizeSF) || 0), 0)

const calculateOccupancyRate = (buildings) => {
  const totalSF = calculateSF(buildings)
  if (!totalSF) return 0
  
  const occupiedSF = buildings
    .filter(b => b.status === 'Occupied')
    .reduce((sum, b) => sum + (Number(b.buildingSizeSF) || 0), 0)
  
  return ((occupiedSF / totalSF) * 100).toFixed(1)
}

export const useIndustrialData = () => {
  // Datos filtrados
  const filteredData = computed(() => {
    return state.buildingsDataRef.value.filter(item => {
      const marketMatch = !state.filters.value.market || item.market === state.filters.value.market
      const submarketMatch = !state.filters.value.submarket || item.subMarket === state.filters.value.submarket
      const classMatch = !state.filters.value.class || item.class === state.filters.value.class
      const typeMatch = !state.filters.value.type || item.type === state.filters.value.type
      const dealMatch = !state.filters.value.deal || item.deal === state.filters.value.deal
      
      // Filtro de disponibilidad
      const availabilityMatch = !state.filters.value.availabilityStatus || 
        item.status === state.filters.value.availabilityStatus

      // Filtro de fechas
      const dateMatch = (!state.filters.value.availableFrom || 
        new Date(item.availableDate) >= new Date(state.filters.value.availableFrom)) &&
        (!state.filters.value.availableTo || 
        new Date(item.availableDate) <= new Date(state.filters.value.availableTo))

      // Filtro de tamaño
      const sizeMatch = (
        (!state.filters.value.sizeMin || item.buildingSizeSF >= state.filters.value.sizeMin) &&
        (!state.filters.value.sizeMax || item.buildingSizeSF <= state.filters.value.sizeMax)
      )

      return marketMatch && 
             submarketMatch && 
             classMatch && 
             typeMatch && 
             dealMatch && 
             sizeMatch &&
             availabilityMatch &&
             dateMatch
    })
  })

  // Estadísticas calculadas
  const statistics = computed(() => {
    const filtered = filteredData.value

    // Filtrar por clase y estado
    const classABuildings = filtered.filter(b => b.class === 'A')
    const classBBuildings = filtered.filter(b => b.class === 'B')
    const underConstructionBuildings = filtered.filter(b => b.status === 'Under Construction')

    return {
      classA: {
        count: classABuildings.length,
        sf: calculateSF(classABuildings)
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

  // Opciones para los filtros
  const filterOptions = computed(() => {
    const createOptions = (values, includeAll = true) => {
      const options = Array.from(new Set(values.filter(Boolean)))
        .map(value => ({
          value,
          label: value
        }))

      if (includeAll) {
        options.unshift({ value: '', label: 'All' })
      }

      return options
    }

    return {
      markets: createOptions(state.buildingsDataRef.value.map(item => item.market)),
      submarkets: state.filters.value.market ? 
        createOptions(state.buildingsDataRef.value
          .filter(item => item.market === state.filters.value.market)
          .map(item => item.subMarket)) :
        createOptions(state.buildingsDataRef.value.map(item => item.subMarket)),
      classes: createOptions(state.buildingsDataRef.value.map(item => item.class)),
      types: createOptions(state.buildingsDataRef.value.map(item => item.type)),
      deals: createOptions(state.buildingsDataRef.value.map(item => item.deal)),
      regions: createOptions(state.buildingsDataRef.value.map(item => item.region))
    }
  })

  // Datos para el mapa
  const mapData = computed(() => 
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

  // Función para cargar datos
  const loadData = async (initialData = null) => {
    try {
      state.loading.value = true
      // Usar datos mock si no se proporcionan datos iniciales
      state.buildingsDataRef.value = initialData || mockIndustrialData
      state.dataInitialized.value = true
    } catch (error) {
      state.error.value = error
      console.error('Error loading data:', error)
    } finally {
      state.loading.value = false
    }
  }

  // Reset filtros
  const resetFilters = () => {
    state.filters.value = {
      market: '',
      submarket: '',
      class: '',
      type: '',
      deal: '',
      aboveMarket: '',
      sizeMin: null,
      sizeMax: null,
      region: '',
      currency: 'USD',
      useMetric: false,
      availabilityStatus: '',
      availableFrom: null,
      availableTo: null,
      occupancyRate: null,
    }
  }

  return {
    // Estado
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    
    // Datos computados
    filteredData,
    statistics,
    filterOptions,
    mapData,

    // Métodos
    loadData,
    resetFilters
  }
}