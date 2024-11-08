<template>
    
        <CRow>
            <CCol :md="9" class="map-container">
                <div id="map" ref="mapRef">&nbsp;</div>
            </CCol>
            <CCol :md="3">
                <CCollapse id="navbarToggleExternalContent" :visible="visibleExternalContent" >
                    <div>
                        <CCard class="filters-panel">
                            <CCardHeader class="bg-primary text-white">
                            <strong>SEARCH</strong>
                            </CCardHeader>
                            <CCardBody style="overflow-y: auto;">
                                <CForm>
                                    <CRow>
                                        <CCol :md="12" class="mb-2">
                                            <CFormSelect
                                                size="sm"                    
                                                v-model="selectedMarket"
                                                :options="marketOptions"
                                            />
                                        </CCol>
                                        <CCol :md="12" class="mb-2">
                                            <CFormSelect
                                                size="sm"                    
                                                v-model="selectedSubmarket"
                                                :options="submarketOptions"
                                            />
                                        </CCol>
                                        <CCol :md="12" class="mb-2">
                                            <CFormSelect
                                                size="sm"                    
                                                v-model="selectedClass"
                                                :options="classOptions"
                                            />
                                        </CCol>
                                        <CCol :md="12" class="mb-2">
                                            <CFormSelect
                                                size="sm"                    
                                                v-model="selectedType"
                                                :options="typeOptions"
                                            />
                                        </CCol>
                                        <CCol :md="12" class="mb-2">
                                            <CFormSelect
                                                size="sm"
                                                v-model="selectedDeal"
                                                :options="dealOptions"
                                            />
                                        </CCol>
                                        <CCol :md="12" class="mb-2">
                                            <CFormSelect
                                                size="sm"                
                                                v-model="selectedAboveMarket"
                                                :options="aboveMarketOptions"
                                            />
                                        </CCol>
                                        <CRow class="mb-2">
                                            <CFormLabel>Available Size (SF)</CFormLabel>
                                            <CCol :md="5">
                                                <CFormInput 
                                                type="number" 
                                                v-model="phone"
                                                class="no-spinner"
                                                @wheel.prevent
                                                @touchstart.prevent
                                                @touchmove.prevent
                                                placeholder=""  
                                                label=""
                                                />
                                            </CCol>
                                            <CCol :md="2" class="text-center">
                                                to
                                            </CCol>
                                            <CCol :md="5">
                                                <CFormInput 
                                                type="number" 
                                                v-model="phone"
                                                class="no-spinner"
                                                @wheel.prevent
                                                @touchstart.prevent
                                                @touchmove.prevent
                                                placeholder=""  
                                                label=""
                                                /> 
                                            </CCol>
                                        </CRow>
                                    </CRow>
                                    <CRow class="mb-2">
                                        <CCol :md="6">
                                            <CFormLabel>Conversion</CFormLabel>
                                        </CCol>

                                        <CCol :md="2" class="text-end">
                                            <CFormLabel>SF</CFormLabel>
                                        </CCol>

                                        <CCol :md="2" >
                                            <CFormSwitch id="formSwitchCheckDefault"/>
                                        </CCol>

                                        <CCol :md="2" class="text-left">
                                            <CFormLabel>SM</CFormLabel>
                                        </CCol>
                                    </CRow>
                                    <CCol :md="12" class="mb-2">
                                        <CAccordion flush>
                                            <CAccordionItem>
                                                <CAccordionHeader>
                                                    Advanced Options
                                                </CAccordionHeader>
                                                <CAccordionBody>
                                                    <CCol :md="12" class="mb-2">
                                                        <CFormSelect
                                                            size="sm"                    
                                                            v-model="selectedRegion"
                                                            :options="regionOptions"
                                                        />
                                                    </CCol>
                                                    <CCol :md="12" class="mb-2">
                                                        <CFormSelect
                                                        size="sm"                    
                                                        v-model="selectedCurrency"
                                                        :options="currencyOptions"
                                                    />
                                                    </CCol>
                                                    <CCol :md="12" class="mb-2">
                                                        <CFormSelect
                                                        size="sm"                    
                                                        v-model="selectedCurrency"
                                                        :options="currencyOptions"
                                                    />
                                                    </CCol>
                                                </CAccordionBody>
                                            </CAccordionItem>
                                        </CAccordion>
                                    </CCol>
                                    
                                </CForm>
                            </CCardBody>
                            <CCardFooter>
                                <CRow>
                                    <CCol :md="6" class="text-center">
                                        <CButton color="primary" >
                                            <CIcon :content="cilFilter" size="sm" />
                                            SEARCH
                                        </CButton>
                                    </CCol>
                                    <CCol :md="6" class="text-center">
                                        <CButton color="secondary" variant="outline" @click="handleReset">
                                            <CIcon :content="cilFilterX" size="sm" />
                                            RESET
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CCardFooter>
                        </CCard>
                    </div>
                </CCollapse>
                <CNavbar >
                    <CContainer fluid>
                    <CNavbarToggler
                        aria-controls="navbarToggleExternalContent"
                        aria-label="Toggle navigation"
                        @click="visibleExternalContent = !visibleExternalContent"
                    />
                    </CContainer>
                </CNavbar>
              
            </CCol>

        </CRow>
        <CRow class="mb-5">
            <CCol :md="12">
                <h2>INDUSTRAL AVAILABILITY <span style="color: #1b9fce;">></span> Q4 2024</h2>
            </CCol>
            <CCol :md="12">
                <CCard>
                    <CCardBody>
                        <CRow>
                            <CCol :md="4">
                                <CChartDoughnut 
                                    :data="data"
                                    :options="options"
                                    />                            
                                </CCol>
                            <CCol :md="8">
                                <CRow>
                                    <CCol :md="6">
                                        <CCard  class="custom-card">
                                            <CCardBody>
                                                <CRow>
                                                    <CCol :md="4">
                                                        <span class="number">96</span>
                                                    </CCol>
                                                    <CCol :md="8" class="CenterTextsHome">
                                                        <span class="text"> BUILDINGS CLASS A </span>
                                                        <!-- <span class="subtext"> 18,872,089 SF </span> -->
                                                        <span class="number">{{ buildingStats.classACount }}</span>
                                                        <span class="subtext">{{ buildingStats.classASF }} SF</span>
                                                    </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                    <CCol :md="6">
                                        <CCard  class="custom-card">
                                            <CCardBody>
                                                <CRow>
                                                    <CCol :md="4">
                                                        <span class="number">84</span>
                                                    </CCol>
                                                    <CCol :md="8" class="CenterTextsHome">
                                                        <span span class="text">BUILDINGS CLASS B</span>
                                                        <!-- <span span class="subtext">18,872,089 SF</span> -->
                                                        <span class="number">{{ buildingStats.classBCount }}</span>
                                                        <span class="subtext">{{ buildingStats.classBSF }} SF</span>
                                                    </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol :md="6">
                                        <CCard  class="custom-card">
                                            <CCardBody>
                                                <CRow>
                                                    <CCol :md="4">
                                                        <span class="number">135</span>
                                                    </CCol>
                                                    <CCol :md="8" class="CenterTextsHome">
                                                        <span span class="text">UNDER CONSTRUCTION</span>
                                                        <span span class="subtext">18,872,089 SF</span>
                                                    </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                    <CCol :md="6">
                                        <CCard  class="custom-card">
                                            <CCardBody>
                                                <CRow>
                                                    <CCol :md="4">
                                                        <span class="number">180</span>
                                                    </CCol>
                                                    <CCol :md="8" class="CenterTextsHome">
                                                        <span span class="text">TOTAL BUILDINGS</span>
                                                        <!-- <span span class="subtext">18,872,089 SF</span> -->
                                                        <span class="number">{{ buildingStats.totalBuildings }}</span>
                                                        <span class="subtext">{{ buildingStats.totalSF }} SF</span>
                                                    </CCol>
                                                </CRow>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
   
        <CRow class="mb-5">
            <CCol :md="12">
                <h2>INDUSTRAL LISTINGS</h2>
            </CCol>
            <CCol :md="12">
                <CCard>
                    <CCardBody>
                        <CRow class="mb-3">
                            <CCol :md="2">
                                <CFormCheck :button="{ color: 'primary', variant: 'outline' }" type="radio" name="options" id="option1" autocomplete="off" label="AVAILABILITY BUILDINGS" checked/>
                            </CCol>
                            <CCol :md="2">
                                <CFormCheck :button="{ color: 'primary', variant: 'outline' }" type="radio" name="options" id="option2" autocomplete="off" label="ABSORPION BUINDINGS"/>
                            </CCol>
                            <CCol :md="2">
                                <CFormCheck :button="{ color: 'primary', variant: 'outline' }" type="radio" name="options" id="option3" autocomplete="off" label="AVAILABLE LAND"/>
                            </CCol>
                            <CCol :md="6">
                                <CFormCheck :button="{ color: 'primary', variant: 'outline' }" type="radio" name="options" id="option4" autocomplete="off" label="CAM"/>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CSmartTable
                                :items="buildingsData"
                                :columns="columns"
                                column-filter
                                
                                :items-per-page="5"
                                column-sorter
                                pagination
                                :table-props="{
                                responsive: true,
                                striped: true,
                                hover: true,
                                small: true,
                                }"
                                class="custom-table"
                            >
                                <template #select="{ item }">
                                <td class="py-2">
                                    <CFormCheck
                                    :id="`checkbox${item.id}`"
                                    :checked="item._selected"
                                    @change="(event) => check(event, item.id)"
                                    />
                                </td>
                                </template>
                            </CSmartTable>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

        <CRow class="mb-5">
            <h2>Recent Properties</h2>
        </CRow>
        <CRow class="mb-5">
            <CCol :md="2">
                <CCard>
                    <CCardHeader  style="text-align: center">
                        <img src="../../assets/images/icons8-spinner-para-iphone-80.png" style="margin-bottom: 2rem;margin-top: 2rem;"/>
                    </CCardHeader>
                    <CCardBody style="    padding: 0px 11px;">
                        <CRow>
                            <CCol :md="6"  style="text-align: center; background-color: #18568a;color: white;height: 45px;align-content: center">MERIDA</CCol>
                            <CCol :md="6"  style="text-align: center; background-color: #04034e;color: white;height: 45px;align-content: center;">EAST</CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>Footer</CCardFooter>
                </CCard>
            </CCol>
            <CCol :md="2">
                <CCard>
                    <CCardHeader  style="text-align: center">
                        <img src="../../assets/images/icons8-spinner-para-iphone-80.png" style="margin-bottom: 2rem;margin-top: 2rem;"/>
                    </CCardHeader>
                    <CCardBody style="    padding: 0px 11px;">
                        <CRow>
                            <CCol :md="6"  style="text-align: center; background-color: #18568a;color: white;height: 45px;align-content: center">JUAREZ</CCol>
                            <CCol :md="6"  style="text-align: center; background-color: #04034e;color: white;height: 45px;align-content: center;">SOUTHEAST</CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>Footer</CCardFooter>
                </CCard>
            </CCol>
            <CCol :md="2">
                <CCard>
                    <CCardHeader  style="text-align: center">
                        <img src="../../assets/images/icons8-spinner-para-iphone-80.png" style="margin-bottom: 2rem;margin-top: 2rem;"/>
                    </CCardHeader>
                    <CCardBody style="    padding: 0px 11px;">
                        <CRow>
                            <CCol :md="6"  style="text-align: center; background-color: #18568a;color: white;height: 45px;align-content: center">SALTILLO</CCol>
                            <CCol :md="6"  style="text-align: center; background-color: #04034e;color: white;height: 45px;align-content: center;">RAMOS ARIZPE</CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>Footer</CCardFooter>
                </CCard>
            </CCol>
            <CCol :md="2">
                <CCard>
                    <CCardHeader  style="text-align: center">
                        <img src="../../assets/images/icons8-spinner-para-iphone-80.png" style="margin-bottom: 2rem;margin-top: 2rem;"/>
                    </CCardHeader>
                    <CCardBody style="    padding: 0px 11px;">
                        <CRow>
                            <CCol :md="6"  style="text-align: center; background-color: #18568a;color: white;height: 45px;align-content: center">TIJUANA</CCol>
                            <CCol :md="6"  style="text-align: center; background-color: #04034e;color: white;height: 45px;align-content: center;">FLORIDO</CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>Footer</CCardFooter>
                </CCard>
            </CCol>
            <CCol :md="2">
                <CCard>
                    <CCardHeader  style="text-align: center">
                        <img src="../../assets/images/icons8-spinner-para-iphone-80.png" style="margin-bottom: 2rem;margin-top: 2rem;"/>
                    </CCardHeader>
                    <CCardBody style="    padding: 0px 11px;">
                        <CRow>
                            <CCol :md="6"  style="text-align: center; background-color: #18568a;color: white;height: 45px;align-content: center">MERIDA</CCol>
                            <CCol :md="6"  style="text-align: center; background-color: #04034e;color: white;height: 45px;align-content: center;">EAST</CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>Footer</CCardFooter>
                </CCard>
            </CCol>
            <CCol :md="2">
                <CCard>
                    <CCardHeader  style="text-align: center">
                        <img src="../../assets/images/icons8-spinner-para-iphone-80.png" style="margin-bottom: 2rem;margin-top: 2rem;"/>
                    </CCardHeader>
                    <CCardBody style="    padding: 0px 11px;">
                        <CRow>
                            <CCol :md="6"  style="text-align: center; background-color: #18568a;color: white;height: 45px;align-content: center">MERIDA</CCol>
                            <CCol :md="6"  style="text-align: center; background-color: #04034e;color: white;height: 45px;align-content: center;">EAST</CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>Footer</CCardFooter>
                </CCard>
            </CCol>
        </CRow>
  </template>
  
  <script setup>
 import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useTableFilters } from './composables/useTableFilters'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { cilFilter, cilFilterX } from '@coreui/icons'
import buildingsDataOriginal from './_data'

import { CCardHeader, CCol, CRow } from '@coreui/vue-pro';
import { CChartDoughnut } from '@coreui/vue-chartjs'

const selected = ref([])

// Convertir buildingsDataOriginal a ref
const buildingsDataRef = ref(buildingsDataOriginal)

// Usar el composable de filtros
const {
  filters,
  filteredData,
  resetFilters,
  marketOptions,
  submarketOptions,
  classOptions,
  stats
} = useTableFilters(buildingsDataRef)

// Actualizar buildingsData para usar los datos filtrados
const buildingsData = computed(() =>
  filteredData.value.map((item) => ({
    ...item,
    _selected: selected.value.includes(item.id),
  }))
)

// Actualizar la data del gráfico con las estadísticas
const data = computed(() => ({
  labels: ['CLASS A', 'CLASS B'],
  datasets: [
    {
      backgroundColor: ['#18568a','#04034e'],
      data: [
        (stats.value.classASF / stats.value.totalSF) * 100,
        (stats.value.classBSF / stats.value.totalSF) * 100
      ],
    },
  ],
}))

// Actualizar las variables de los filtros
const selectedMarket = computed({
  get: () => filters.value.market,
  set: (value) => filters.value.market = value
})

const selectedSubmarket = computed({
  get: () => filters.value.submarket,
  set: (value) => filters.value.submarket = value
})

const selectedClass = computed({
  get: () => filters.value.class,
  set: (value) => filters.value.class = value
})

// ... resto de tu código existente ...

// Actualizar el método de reset
const handleReset = () => {
  resetFilters()
}

// Actualizar las estadísticas en las cards
const buildingStats = computed(() => ({
  classACount: stats.value.classABuildings,
  classBCount: stats.value.classBBuildings,
  classASF: stats.value.classASF.toLocaleString(),
  classBSF: stats.value.classBSF.toLocaleString(),
  totalBuildings: stats.value.totalBuildings,
  totalSF: stats.value.totalSF.toLocaleString()
}))



const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  rotation: -90,
  circumference: 180,
  cutout: '60%',
  plugins: {
    legend: {
      position: 'bottom'
    },
    tooltip: {
      enabled: true
    }
  }
})
  const visibleExternalContent = ref(true)
const mapRef = ref(null)
  let map = null
  
  onMounted(() => {
    // Inicialización del mapa
    map = L.map(mapRef.value).setView([40.416775, -3.703790], 13) // Centrado en Madrid
  
    // Definir las capas base
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    })
  
    const terrainLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    // Crear un objeto con las capas base
    const baseMaps = {
      "OpenStreetMap": osmLayer,
      "Satélite": satelliteLayer,
      "Relieve": terrainLayer
    }
  
    // Añadir la capa por defecto al mapa
    osmLayer.addTo(map)
  
    // Añadir el control de capas
    L.control.layers(baseMaps).addTo(map)
  
    // Ejemplo: Agregar un marcador
    L.marker([40.416775, -3.703790]).addTo(map)
      .bindPopup('Madrid')
      .openPopup()
  })
  
  onUnmounted(() => {
    // Limpiar el mapa cuando el componente se desmonte
    if (map) {
      map.remove()
    }
  })


  </script>
  
  <style scoped>
  .filters-panel {
  height: 100%;
  height: 60vh;
}

.bg-primary {
  background-color: #175689 !important;
}


  .map-container {
    display: grid;
    height: 60vh;
  }
  
  .map-area {
    grid-column: 1 / 2;
  }
  
  #map {
    height: 100%;
    width: 100%;
  }
  
  .filter-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-style: italic;
    color: #666;
  }
  </style>