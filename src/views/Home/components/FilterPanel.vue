<template>
  <CRow>
    <!-- Mapa -->
      <div id="map" ref="mapRef">&nbsp;</div>
  
    
    <!-- Panel de Filtros -->
    <div class="filter-sidebar" :class="{ 'expanded': isExpanded }">
      <!-- Botón Toggle -->
      <div class="toggle-filter-btn" @click="toggleFilters">
        <CIcon :icon="isExpanded ? cilChevronRight : cilChevronLeft" size="lg" />
      </div>

      <!-- Panel de Filtros -->
      <CCard class="h-100 filter-panel">
        <CCardHeader class="bg-primary text-white">
          <strong>SEARCH</strong>
        </CCardHeader>
        <CCardBody class="filter-body">
          <CForm>
            <!-- Tus filtros actuales -->
            <CRow>
              <CCol :md="12" class="mb-2">
                <CFormSelect
                  size="sm"
                  v-model="filters.market"
                  :options="filterOptions.markets"
                  label="Market"
                />
              </CCol>
              <CCardBody style="overflow-y: auto;">
            <CForm>
              <CRow>
                <!-- Market Filter -->
                <CCol :md="12" class="mb-2">
                  <CFormSelect
                    size="sm"
                    v-model="filters.market"
                    :options="filterOptions.markets"
                    label="Market"
                  />
                </CCol>

                <!-- Submarket Filter -->
                <CCol :md="12" class="mb-2">
                  <CFormSelect
                    size="sm"
                    v-model="filters.submarket"
                    :options="filterOptions.submarkets"
                    label="Submarket"
                  />
                </CCol>

                <!-- Class Filter -->
                <CCol :md="12" class="mb-2">
                  <CFormSelect
                    size="sm"
                    v-model="filters.class"
                    :options="filterOptions.classes"
                    label="Class"
                  />
                </CCol>

                <!-- Type Filter -->
                <CCol :md="12" class="mb-2">
                  <CFormSelect
                    size="sm"
                    v-model="filters.type"
                    :options="filterOptions.types"
                    label="Type"
                  />
                </CCol>

                <!-- Deal Filter -->
                <CCol :md="12" class="mb-2">
                  <CFormSelect
                    size="sm"
                    v-model="filters.deal"
                    :options="filterOptions.deals"
                    label="Deal"
                  />
                </CCol>

                <!-- Above Market Filter -->
                <CCol :md="12" class="mb-2">
                  <CFormSelect
                    size="sm"
                    v-model="filters.aboveMarket"
                    :options="filterOptions.aboveMarket"
                    label="Above Market"
                  />
                </CCol>

                <!-- Available Size Range -->
                <CRow class="mb-2">
                  <CFormLabel>Available Size (SF)</CFormLabel>
                  <CCol :md="5">
                    <CFormInput
                      type="number"
                      v-model="filters.sizeMin"
                      class="no-spinner"
                      @wheel.prevent
                      @touchstart.prevent
                      @touchmove.prevent
                      placeholder="Min"
                    />
                  </CCol>
                  <CCol :md="2" class="text-center" style="padding: 5px 0;">
                    to
                  </CCol>
                  <CCol :md="5">
                    <CFormInput
                      type="number"
                      v-model="filters.sizeMax"
                      class="no-spinner"
                      @wheel.prevent
                      @touchstart.prevent
                      @touchmove.prevent
                      placeholder="Max"
                    />
                  </CCol>
                </CRow>

                <!-- Unit Conversion -->
                <CRow class="mb-2">
                  <CCol :md="5">
                    <CFormLabel>Conversion</CFormLabel>
                  </CCol>
                  <CCol :md="1" class="text-end">
                    <CFormLabel>SF</CFormLabel>
                  </CCol>
                  <CCol :md="2">
                    <CFormSwitch
                      id="unitConversion"
                      v-model="filters.useMetric"
                      :checked="!filters.useMetric"
                    />
                  </CCol>
                  <CCol :md="3" class="text-left">
                    <CFormLabel>SM</CFormLabel>
                  </CCol>
                </CRow>

                <!-- Advanced Options -->
                <CCol :md="12" class="mb-2">
                  <CAccordion flush>
                    <CAccordionItem>
                      <CAccordionHeader>
                        Advanced Options
                      </CAccordionHeader>
                      <CAccordionBody>
                        <!-- Region Filter -->
                        <CCol :md="12" class="mb-2">
                          <CFormSelect
                            size="sm"
                            v-model="filters.region"
                            :options="filterOptions.regions"
                            label="Region"
                          />
                        </CCol>

                        <!-- Currency Filter -->
                        <CCol :md="12" class="mb-2">
                          <CFormSelect
                            size="sm"
                            v-model="filters.currency"
                            :options="filterOptions.currencies"
                            label="Currency"
                          />
                        </CCol>
                      </CAccordionBody>
                    </CAccordionItem>
                  </CAccordion>
                </CCol>
              </CRow>
            </CForm>
        </CCardBody>            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  </CRow>
</template>

<script setup>
import { ref } from 'vue'
import { cilChevronLeft, cilChevronRight } from '@coreui/icons'
import CIcon from '@coreui/icons-vue'

const isExpanded = ref(false)

const toggleFilters = () => {
  isExpanded.value = !isExpanded.value
}



import { useIndustrialData } from '../composables/useIndustrialData'

const visibleExternalContent = ref(true)

const {
  filters,
  filterOptions,
  resetFilters,
  applyFilters
} = useIndustrialData()

const handleSearch = () => {
  applyFilters()
}

const handleReset = () => {
  resetFilters()
}



</script>
<style scoped>
/* Container del mapa */
.map-container {
  height: 60vh;
  transition: all 0.3s ease;
  position: relative;
}

/* Panel de filtros */
.filter-sidebar {
  position: fixed;
  top: 72px; /* Ajusta según tu header */
  right: -300px; /* Ancho inicial oculto */
  width: 300px;
  height: calc(100vh - 72px);
  transition: right 0.3s ease;
  z-index: 1030;
}

.filter-sidebar.expanded {
  right: 0;
}

/* Botón de toggle */
.toggle-filter-btn {
  position: absolute;
  left: -32px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 48px;
  background-color: #175689;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px 0 0 4px;
  z-index: 1;
}

/* Panel de filtros */
.filter-panel {
  height: 100%;
  margin: 0;
  border-radius: 0;
  /* border-left: 2px solid #175689; */
}

.filter-body {
  overflow-y: auto;
  height: calc(100% - 48px); /* Altura del header */
  padding: 1rem;
}

/* Transiciones */
.transition-width {
  transition: all 0.3s ease;
}

/* Ajustes para el mapa cuando los filtros están expandidos */
.expanded ~ .map-container {
  width: calc(100% - 300px);
}

/* Estilos adicionales */
:deep(.card-header) {
  padding: 0.75rem 1rem;
}

:deep(.form-select) {
  font-size: 0.875rem;
}

:deep(.form-label) {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}
</style>