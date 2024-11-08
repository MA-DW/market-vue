// composables/useIndustrialData.js
import { ref, computed } from 'vue'

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
    useMetric: false
  })
}

export const useIndustrialData = () => {
  // Datos de prueba
  const testData = [
    {
      id: 1,
      buildingName: "Edificio A",
      latitude: 25.6866,
      longitude: -100.3161,
      class: "A",
      buildingSizeSF: 50000,
      market: "Monterrey",
      subMarket: "Centro",
      type: "Industrial",
      status: "Active"
    },
    {
      id: 2,
      buildingName: "Edificio B",
      latitude: 25.6960,
      longitude: -100.3208,
      class: "B",
      buildingSizeSF: 35000,
      market: "Monterrey",
      subMarket: "Norte",
      type: "Warehouse",
      status: "Under Construction"
    }
  ]

  // Función para cargar datos
  const loadData = async (initialData = null) => {
    try {
      state.loading.value = true
      
      if (initialData) {
        state.buildingsDataRef.value = initialData
      } else {
        // Simulamos carga con datos de prueba
        await new Promise(resolve => setTimeout(resolve, 1000))
        state.buildingsDataRef.value = testData
      }
      
      state.dataInitialized.value = true
    } catch (e) {
      state.error.value = e
      console.error('Error loading data:', e)
    } finally {
      state.loading.value = false
    }
  }

  // Datos filtrados
  const filteredData = computed(() => {
    return state.buildingsDataRef.value.filter(item => {
      const marketMatch = !state.filters.value.market || item.market === state.filters.value.market
      const submarketMatch = !state.filters.value.submarket || item.subMarket === state.filters.value.submarket
      const classMatch = !state.filters.value.class || item.class === state.filters.value.class
      const typeMatch = !state.filters.value.type || item.type === state.filters.value.type
      const dealMatch = !state.filters.value.deal || item.deal === state.filters.value.deal
      
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
             sizeMatch
    })
  })

  // Estadísticas
  const statistics = computed(() => ({
    classA: {
      count: filteredData.value.filter(b => b.class === 'A').length,
      sf: filteredData.value
        .filter(b => b.class === 'A')
        .reduce((sum, b) => sum + (b.buildingSizeSF || 0), 0)
    },
    classB: {
      count: filteredData.value.filter(b => b.class === 'B').length,
      sf: filteredData.value
        .filter(b => b.class === 'B')
        .reduce((sum, b) => sum + (b.buildingSizeSF || 0), 0)
    },
    total: {
      buildings: filteredData.value.length,
      sf: filteredData.value.reduce((sum, b) => sum + (b.buildingSizeSF || 0), 0)
    },
    underConstruction: {
      count: filteredData.value.filter(b => b.status === 'Under Construction').length,
      sf: filteredData.value
        .filter(b => b.status === 'Under Construction')
        .reduce((sum, b) => sum + (b.buildingSizeSF || 0), 0)
    }
  }))

  // Opciones de filtros
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
      regions: createOptions(state.buildingsDataRef.value.map(item => item.region)),
      currencies: [
        { value: 'USD', label: 'USD' },
        { value: 'MXN', label: 'MXN' }
      ]
    }
  })

  // Datos para el mapa
  const mapData = computed(() => 
    filteredData.value.map(building => ({
      id: building.id,
      position: {
        lat: building.latitude,
        lng: building.longitude
      },
      properties: {
        name: building.buildingName,
        class: building.class,
        sf: building.buildingSizeSF,
        status: building.status
      }
    }))
  )

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
      useMetric: false
    }
  }

  // Función para aplicar filtros (si necesitas lógica adicional)
  const applyFilters = () => {
    // Aquí puedes agregar lógica adicional antes de aplicar los filtros
    console.log('Applying filters:', state.filters.value)
  }

  return {
    // Estado
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    dataInitialized: state.dataInitialized,

    // Datos computados
    filteredData,
    statistics,
    filterOptions,
    mapData,

    // Métodos
    loadData,
    resetFilters,
    applyFilters
  }
}