<template>
  <div>
    <!-- Spinner -->
    <LoadingSpinner v-if="loading" />

    <!-- Contenido principal -->
    <div v-else>
      <div class="layout-container">
        <div class="content-wrapper" :class="{ 'filters-expanded': isExpanded }">
          <CRow>
            <CCol :md="isExpanded ? 9 : 12" class="map-container transition-width">
              <IndustrialMap :isExpanded="isExpanded" />
            </CCol>
            <!-- Panel de Filtros -->
            <div class="filter-sidebar" :class="{ 'expanded': isExpanded }">
              <FilterPanel />
              <CButton 
                color="primary"
                class="toggle-filters"
                @click="toggleFilters"
              >
                <CIcon :icon="isExpanded ? cilChevronRight : cilChevronLeft" />
              </CButton>
            </div>
          </CRow>
        </div>
      </div>

      <AvailabilityStats />
      <IndustrialListings />
      <RecentProperties />

      <!-- Botón de scroll -->
      <CButton
        color="primary"
        class="scroll-to-top"
        :class="{ 'visible': showScrollButton }"
        @click="scrollToTop"
      >
        <CIcon :icon="cilArrowTop" size="lg" />
      </CButton>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { useIndustrialData } from './composables/useIndustrialData'
import { cilArrowTop, cilChevronLeft, cilChevronRight } from '@coreui/icons'
import CIcon from '@coreui/icons-vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import IndustrialMap from './components/IndustrialMap.vue'
import FilterPanel from './components/FilterPanel.vue'
import AvailabilityStats from './components/AvailabilityStats.vue'
import IndustrialListings from './components/IndustrialListings.vue'
import RecentProperties from './components/RecentProperties.vue'

const { loading, loadData } = useIndustrialData()
const showScrollButton = ref(false)
const isExpanded = ref(false)

const toggleFilters = () => {
  isExpanded.value = !isExpanded.value
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'))
  }, 300)
}

// Función para manejar el scroll
const handleScroll = () => {
  showScrollButton.value = window.scrollY > 300
}

// Función para hacer scroll hacia arriba
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(async () => {
  await loadData()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.layout-container {
  position: relative;
}

.content-wrapper {
  padding: 1rem;
  transition: all 0.3s ease;
}

.map-container {
  transition: width 0.3s ease;
}

.filter-sidebar {
  position: fixed;
  right: -300px;
  top: 72px;
  width: 300px;
  height: calc(100vh - 72px);
  background: white;
  transition: right 0.3s ease;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
  z-index: 1000;
}

.filter-sidebar.expanded {
  right: 0;
}

.toggle-filters {
  position: absolute;
  left: -40px;
  top: 20px;
  width: 40px;
  height: 40px;
  border-radius: 4px 0 0 4px;
  padding: 0;
}

.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.scroll-to-top.visible {
  opacity: 1;
}
</style>