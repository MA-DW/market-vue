import { ref, computed } from 'vue'


export const useTableFilters = (originalData) => {
  const filters = ref({
    market: '',
    submarket: '',
    class: '',
    type: '',
    deal: '',
    aboveMarket: '',
    sizeMin: null,
    sizeMax: null,
    region: '',
    currency: ''
  })

  // Computed property para los datos filtrados
  const filteredData = computed(() => {
    return originalData.value.filter(item => {
      const marketMatch = !filters.value.market || item.market === filters.value.market
      const submarketMatch = !filters.value.submarket || item.subMarket === filters.value.submarket
      const classMatch = !filters.value.class || item.class === filters.value.class
      const typeMatch = !filters.value.type || item.type === filters.value.type
      const dealMatch = !filters.value.deal || item.deal === filters.value.deal
      const aboveMarketMatch = !filters.value.aboveMarket || item.aboveMarket === filters.value.aboveMarket
      const regionMatch = !filters.value.region || item.region === filters.value.region
      
      // Filtro de tamaño disponible
      const sizeMatch = (!filters.value.sizeMin || item.availableSF >= filters.value.sizeMin) &&
                       (!filters.value.sizeMax || item.availableSF <= filters.value.sizeMax)

      return marketMatch && 
             submarketMatch && 
             classMatch && 
             typeMatch && 
             dealMatch && 
             aboveMarketMatch && 
             sizeMatch && 
             regionMatch
    })
  })

  // Options computadas para los selects
  const marketOptions = computed(() => {
    const markets = new Set(originalData.value.map(item => item.market).filter(Boolean))
    return [
      { value: '', label: 'All Markets' },
      ...Array.from(markets).map(market => ({
        value: market,
        label: market
      }))
    ]
  })

  const submarketOptions = computed(() => {
    let submarkets
    if (filters.value.market) {
      submarkets = new Set(
        originalData.value
          .filter(item => item.market === filters.value.market)
          .map(item => item.subMarket)
          .filter(Boolean)
      )
    } else {
      submarkets = new Set(originalData.value.map(item => item.subMarket).filter(Boolean))
    }
    return [
      { value: '', label: 'All Submarkets' },
      ...Array.from(submarkets).map(submarket => ({
        value: submarket,
        label: submarket
      }))
    ]
  })

  const classOptions = computed(() => {
    const classes = new Set(originalData.value.map(item => item.class).filter(Boolean))
    return [
      { value: '', label: 'All Classes' },
      ...Array.from(classes).map(cls => ({
        value: cls,
        label: cls
      }))
    ]
  })

  // Estadísticas calculadas
  const stats = computed(() => {
    const filtered = filteredData.value
    return {
      totalBuildings: filtered.length,
      classABuildings: filtered.filter(item => item.class === 'A').length,
      classBBuildings: filtered.filter(item => item.class === 'B').length,
      totalSF: filtered.reduce((sum, item) => sum + (item.buildingSizeSF || 0), 0),
      classASF: filtered.filter(item => item.class === 'A')
                       .reduce((sum, item) => sum + (item.buildingSizeSF || 0), 0),
      classBSF: filtered.filter(item => item.class === 'B')
                       .reduce((sum, item) => sum + (item.buildingSizeSF || 0), 0)
    }
  })

  // Función para resetear filtros
  const resetFilters = () => {
    filters.value = {
      market: '',
      submarket: '',
      class: '',
      type: '',
      deal: '',
      aboveMarket: '',
      sizeMin: null,
      sizeMax: null,
      region: '',
      currency: ''
    }
  }

  return {
    filters,
    filteredData,
    resetFilters,
    marketOptions,
    submarketOptions,
    classOptions,
    stats
  }
}