// components/AvailabilityStats.vue
<template>
  <CRow>
    <CCol :md="12">
      <h2>INDUSTRIAL AVAILABILITY <span style="color: #1b9fce;">></span> Q4 2024</h2>
    </CCol>
    <CCol :md="12">
      <CCard>
        <CCardBody>
          <CRow>
            <!-- Gráfico de Dona -->
            <CCol :md="4">
              <CChartDoughnut
                :data="chartData"
                :options="chartOptions"
              />
            </CCol>

            <!-- Tarjetas de Estadísticas -->
            <CCol :md="8">
              <CRow>
                <!-- Class A Card -->
                <CCol :md="6" class="mb-3">
                  <CCard class="h-100 custom-card">
                    <CCardBody>
                      <CRow class="align-items-center">
                        <CCol :md="4" class="text-center">
                          <span class="number">{{ statistics.classA.count }}</span>
                        </CCol>
                        <CCol :md="8" class="stats-info">
                          <div class="text">BUILDINGS CLASS A</div>
                          <div class="subtext">
                            {{ formatSF(statistics.classA.sf) }} SF
                          </div>
                          <div class="percentage" v-if="statistics.total.buildings">
                            {{ calculatePercentage(statistics.classA.count) }}% of Total
                          </div>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>

                <!-- Class B Card -->
                <CCol :md="6" class="mb-3">
                  <CCard class="h-100 custom-card">
                    <CCardBody>
                      <CRow class="align-items-center">
                        <CCol :md="4" class="text-center">
                          <span class="number">{{ statistics.classB.count }}</span>
                        </CCol>
                        <CCol :md="8" class="stats-info">
                          <div class="text">BUILDINGS CLASS B</div>
                          <div class="subtext">
                            {{ formatSF(statistics.classB.sf) }} SF
                          </div>
                          <div class="percentage" v-if="statistics.total.buildings">
                            {{ calculatePercentage(statistics.classB.count) }}% of Total
                          </div>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>

                <!-- Under Construction Card -->
                <CCol :md="6" class="mb-3">
                  <CCard class="h-100 custom-card">
                    <CCardBody>
                      <CRow class="align-items-center">
                        <CCol :md="4" class="text-center">
                          <span class="number">{{ statistics.underConstruction.count }}</span>
                        </CCol>
                        <CCol :md="8" class="stats-info">
                          <div class="text">UNDER CONSTRUCTION</div>
                          <div class="subtext">
                            {{ formatSF(statistics.underConstruction.sf) }} SF
                          </div>
                          <div class="percentage" v-if="statistics.total.buildings">
                            {{ calculatePercentage(statistics.underConstruction.count) }}% of Total
                          </div>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>

                <!-- Total Buildings Card -->
                <CCol :md="6" class="mb-3">
                  <CCard class="h-100 custom-card">
                    <CCardBody>
                      <CRow class="align-items-center">
                        <CCol :md="4" class="text-center">
                          <span class="number">{{ statistics.total.buildings }}</span>
                        </CCol>
                        <CCol :md="8" class="stats-info">
                          <div class="text">TOTAL BUILDINGS</div>
                          <div class="subtext">
                            {{ formatSF(statistics.total.sf) }} SF
                          </div>
                          <div class="trend">
                            <CIcon 
                              :icon="trendIcon" 
                              :class="trendClass"
                            /> {{ trendPercentage }}% vs last month
                          </div>
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
</template>

<script setup>
import { computed } from 'vue'
import { useIndustrialData } from '../composables/useIndustrialData'
import { CChartDoughnut } from '@coreui/vue-chartjs'
import { cilArrowTop, cilArrowBottom } from '@coreui/icons'
import CIcon from '@coreui/icons-vue'

const { statistics } = useIndustrialData()

// Configuración del gráfico de dona
const chartData = computed(() => ({
  labels: ['CLASS A', 'CLASS B'],
  datasets: [{
    backgroundColor: ['#18568a', '#04034e'],
    data: [
      (statistics.value.classA.sf / statistics.value.total.sf) * 100 || 0,
      (statistics.value.classB.sf / statistics.value.total.sf) * 100 || 0
    ]
  }]
}))

const chartOptions = {
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
      enabled: true,
      callbacks: {
        label: (context) => {
          const value = context.raw
          return `${value.toFixed(1)}%`
        }
      }
    }
  }
}

// Funciones de utilidad
const formatSF = (sf) => {
  return new Intl.NumberFormat('en-US').format(sf || 0)
}

const calculatePercentage = (count) => {
  if (!statistics.value.total.buildings) return 0
  return ((count / statistics.value.total.buildings) * 100).toFixed(1)
}

// Simulación de tendencia (esto podría venir de tus datos reales)
const trendPercentage = computed(() => 5.2)
const trendIcon = computed(() => trendPercentage.value > 0 ? cilArrowTop : cilArrowBottom)
const trendClass = computed(() => trendPercentage.value > 0 ? 'trend-up' : 'trend-down')
</script>

<style scoped>
.custom-card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.custom-card:hover {
  transform: translateY(-2px);
}

.number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #18568a;
  line-height: 1;
}

.stats-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
}

.subtext {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.percentage {
  font-size: 0.875rem;
  color: #666;
}

.trend {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.trend-up {
  color: #2eb85c;
}

.trend-down {
  color: #e55353;
}

/* Ajustes para el gráfico de dona */
:deep(.chart-container) {
  height: 300px;
  position: relative;
}
</style>