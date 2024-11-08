<template>
  <div class="industrial-details">
    <!-- Header con acciones -->
    <CRow class="mb-4">
      <CCol :md="6">
        <h2>
          {{ buildingData?.buildingName || 'Building Details' }}
          <CBadge :color="getBadgeColor(buildingData?.status)" class="ms-2">
            {{ buildingData?.status }}
          </CBadge>
        </h2>
      </CCol>
      <CCol :md="6" class="text-end">
        <CButton 
          color="secondary" 
          variant="outline"
          @click="goBack"
          class="me-2"
        >
          <CIcon :icon="cilArrowLeft" /> Back
        </CButton>
        <CButton 
          color="primary"
          @click="downloadBrochure"
        >
          <CIcon :icon="cilCloudDownload" /> Download Brochure
        </CButton>
      </CCol>
    </CRow>

    <CRow class="mb-4">
      <!-- Mapa y Fotos -->
      <CCol :md="6">
        <CCard class="mb-4">
          <CCardBody>
            <!-- Mini mapa para ubicación específica -->
            <div ref="detailMapRef" style="height: 300px;" class="mb-4"></div>
            
            <!-- Galería de fotos -->
            <CCarousel 
              controls 
              indicators 
              class="building-gallery"
            >
              <CCarouselItem v-for="(image, index) in buildingImages" :key="index">
                <img
                  :src="image.url"
                  :alt="image.caption"
                  class="d-block w-100"
                />
                <CCarouselCaption>
                  {{ image.caption }}
                </CCarouselCaption>
              </CCarouselItem>
            </CCarousel>
          </CCardBody>
        </CCard>
      </CCol>

      <!-- Información Principal -->
      <CCol :md="6">
        <CCard class="mb-4">
          <CCardHeader>
            <strong>Building Information</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol :md="6" class="mb-3">
                <div class="detail-label">Industrial Park</div>
                <div class="detail-value">{{ buildingData?.industrialPark }}</div>
              </CCol>
              <CCol :md="6" class="mb-3">
                <div class="detail-label">Market</div>
                <div class="detail-value">{{ buildingData?.market }}</div>
              </CCol>
              <CCol :md="6" class="mb-3">
                <div class="detail-label">Sub Market</div>
                <div class="detail-value">{{ buildingData?.subMarket }}</div>
              </CCol>
              <CCol :md="6" class="mb-3">
                <div class="detail-label">Class</div>
                <div class="detail-value">{{ buildingData?.class }}</div>
              </CCol>
              <CCol :md="6" class="mb-3">
                <div class="detail-label">Building Size</div>
                <div class="detail-value">{{ formatSF(buildingData?.buildingSizeSF) }} SF</div>
              </CCol>
              <CCol :md="6" class="mb-3">
                <div class="detail-label">Available Space</div>
                <div class="detail-value">{{ formatSF(buildingData?.availableSF) }} SF</div>
              </CCol>
              <CCol :md="6" class="mb-3">
                <div class="detail-label">Minimum Space</div>
                <div class="detail-value">{{ formatSF(buildingData?.minimumSpaceSF) }} SF</div>
              </CCol>
              <CCol :md="6" class="mb-3">
                <div class="detail-label">Clear Height</div>
                <div class="detail-value">{{ buildingData?.clearHeight }} ft</div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        <!-- Especificaciones Técnicas -->
        <CCard class="mb-4">
          <CCardHeader>
            <strong>Technical Specifications</strong>
          </CCardHeader>
          <CCardBody>
            <CListGroup flush>
              <CListGroupItem v-for="(spec, index) in technicalSpecs" :key="index">
                <div class="ms-2 me-auto">
                  <div class="spec-label">{{ spec.label }}</div>
                  <div class="spec-value">{{ spec.value }}</div>
                </div>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <!-- Información Adicional -->
    <CRow>
      <!-- Documentos -->
      <CCol :md="6">
        <CCard class="mb-4">
          <CCardHeader>
            <strong>Documents</strong>
          </CCardHeader>
          <CCardBody>
            <CListGroup>
              <CListGroupItem v-for="doc in documents" :key="doc.id" class="d-flex justify-content-between align-items-center">
                <div>
                  <CIcon :icon="getDocumentIcon(doc.type)" class="me-2" />
                  {{ doc.name }}
                </div>
                <CButton color="primary" size="sm" @click="downloadDocument(doc)">
                  <CIcon :icon="cilCloudDownload" />
                </CButton>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

      <!-- Contacto -->
      <CCol :md="6">
        <CCard>
          <CCardHeader>
            <strong>Contact Information</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol :md="6" class="mb-3">
                <div class="contact-info">
                  <div class="contact-label">Broker</div>
                  <div class="contact-value">{{ contactInfo.broker }}</div>
                  <div class="contact-detail">{{ contactInfo.phone }}</div>
                  <div class="contact-detail">{{ contactInfo.email }}</div>
                </div>
              </CCol>
              <CCol :md="6" class="text-end">
                <CButton 
                  color="primary"
                  size="lg"
                  @click="showContactForm"
                >
                  <CIcon :icon="cilEnvelopeClosed" class="me-2" />
                  Contact Now
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <!-- Modal de Contacto -->
    <CModal 
      :visible="showModal"
      @close="() => showModal = false"
      title="Contact Broker"
    >
      <CForm>
        <CRow>
          <CCol :md="12">
            <CFormInput
              label="Name"
              v-model="contactForm.name"
              placeholder="Your name"
            />
          </CCol>
          <CCol :md="12">
            <CFormInput
              label="Email"
              v-model="contactForm.email"
              type="email"
              placeholder="Your email"
            />
          </CCol>
          <CCol :md="12">
            <CFormTextarea
              label="Message"
              v-model="contactForm.message"
              placeholder="Your message"
              rows="4"
            />
          </CCol>
        </CRow>
      </CForm>
      <template #footer>
        <CButton color="secondary" @click="() => showModal = false">
          Close
        </CButton>
        <CButton color="primary" @click="sendContactForm">
          Send Message
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useIndustrialData } from '../composables/useIndustrialData'
import L from 'leaflet'
import {
  cilArrowLeft,
  cilCloudDownload,
  cilEnvelopeClosed,
  cilFile,
  cilFilePdf,
  cilFileExcel
} from '@coreui/icons'
import CIcon from '@coreui/icons-vue'

const route = useRoute()
const router = useRouter()
const detailMapRef = ref(null)
const showModal = ref(false)

const buildingData = ref(null)
const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

// Datos de ejemplo
const buildingImages = [
  { url: '/images/building1.jpg', caption: 'Front View' },
  { url: '/images/building2.jpg', caption: 'Loading Docks' },
  { url: '/images/building3.jpg', caption: 'Interior' }
]

const technicalSpecs = [
  { label: 'Construction Type', value: 'Class A Industrial' },
  { label: 'Floor Load', value: '6,000 lbs/sf' },
  { label: 'Column Spacing', value: '40\' x 40\'' },
  { label: 'Dock Doors', value: '24 dock-high doors' },
  { label: 'Power', value: '2,000 amps, 480V/3 phase' },
  { label: 'Fire Protection', value: 'ESFR Sprinkler System' }
]

const documents = [
  { id: 1, name: 'Building Brochure', type: 'pdf' },
  { id: 2, name: 'Floor Plans', type: 'pdf' },
  { id: 3, name: 'Specifications', type: 'excel' }
]

const contactInfo = {
  broker: 'John Smith',
  phone: '+1 (555) 123-4567',
  email: 'john.smith@example.com'
}

// Funciones
onMounted(async () => {
  const buildingId = route.params.id
  // Cargar datos del edificio
  // buildingData.value = await loadBuildingDetails(buildingId)
  
  // Inicializar mapa
  if (detailMapRef.value) {
    const map = L.map(detailMapRef.value).setView([25.6866, -100.3161], 15)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
    L.marker([25.6866, -100.3161]).addTo(map)
  }
})

const formatSF = (value) => {
  return new Intl.NumberFormat('en-US').format(value || 0)
}

const getBadgeColor = (status) => {
  const colors = {
    'Active': 'success',
    'Under Construction': 'warning',
    'Inactive': 'danger'
  }
  return colors[status] || 'secondary'
}

const getDocumentIcon = (type) => {
  const icons = {
    'pdf': cilFilePdf,
    'excel': cilFileExcel,
    'default': cilFile
  }
  return icons[type] || icons.default
}

const goBack = () => {
  router.back()
}

const downloadBrochure = () => {
  // Implementar lógica de descarga
}

const downloadDocument = (doc) => {
  // Implementar lógica de descarga
  console.log('Downloading document:', doc.name)
}

const showContactForm = () => {
  showModal.value = true
}

const sendContactForm = () => {
  // Implementar lógica de envío
  console.log('Sending form:', contactForm.value)
  showModal.value = false
}
</script>

<style scoped>
.industrial-details {
  padding: 20px;
}

.building-gallery {
  height: 300px;
  
  
}

.detail-label {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 1rem;
  font-weight: 500;
}

.spec-label {
  font-weight: 500;
}

.spec-value {
  font-size: 0.875rem;
  color: #6c757d;
}

  .contact-label {
    font-size: 0.875rem;
    color: #6c757d;
  }
  
  .contact-value {
    font-size: 1.125rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .contact-detail {
    font-size: 0.875rem;
    color: #495057;
  }

</style>