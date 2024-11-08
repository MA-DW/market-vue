<template>
  <div>
    <!-- Spinner -->
    <LoadingSpinner v-if="loading" />

    <!-- Contenido principal -->
    <div v-else>
      <div class="layout-container">
        <div class="content-wrapper" :class="{ 'filters-expanded': isExpanded }">
          <CRow>
            <CCol :md="12" class="map-container">
              <IndustrialMap />
            </CCol>
              <FilterPanel />
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
import { cilArrowTop } from '@coreui/icons'
import CIcon from '@coreui/icons-vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import IndustrialMap from './components/IndustrialMap.vue'
import FilterPanel from './components/FilterPanel.vue'
import AvailabilityStats from './components/AvailabilityStats.vue'
import IndustrialListings from './components/IndustrialListings.vue'
import RecentProperties from './components/RecentProperties.vue'

const { loading, loadData } = useIndustrialData()
const showScrollButton = ref(false)

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
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1040;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.scroll-to-top.visible {
  opacity: 1;
  visibility: visible;
}

/* Ajuste cuando el panel de filtros está expandido */
.filters-expanded .scroll-to-top {
  right: 320px; /* 300px del panel + 20px de margen */
}

/* Hover effect */
.scroll-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

/* Animación del ícono */
.scroll-to-top:active {
  transform: translateY(0);
}
</style>