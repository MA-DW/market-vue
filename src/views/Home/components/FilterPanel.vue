<template>
  <CCard class="filter-panel">
    <CCardHeader>
      <strong>Filters</strong>
      <CButton 
        color="secondary" 
        size="sm" 
        variant="ghost"
        @click="handleReset"
        class="float-end"
      >
        Reset
      </CButton>
    </CCardHeader>
    <CCardBody>
      <!-- Market Filter -->
      <div class="mb-3">
        <CFormLabel>Market</CFormLabel>
        <CFormSelect
          v-model="filters.market"
          :options="marketOptions"
        />
      </div>

      <!-- Status Filter -->
      <div class="mb-3">
        <CFormLabel>Status</CFormLabel>
        <CFormSelect
          v-model="filters.status"
          :options="statusOptions"
        />
      </div>

      <!-- Size Range Filter -->
      <div class="mb-3">
        <CFormLabel>Size Range (SF)</CFormLabel>
        <div class="d-flex gap-2">
          <CFormInput
            v-model="filters.minSize"
            type="number"
            placeholder="Min"
          />
          <CFormInput
            v-model="filters.maxSize"
            type="number"
            placeholder="Max"
          />
        </div>
      </div>

      <!-- Additional Filters -->
      <div class="mb-3">
        <CFormLabel>Building Type</CFormLabel>
        <CFormSelect
          v-model="filters.buildingType"
          :options="buildingTypeOptions"
        />
      </div>
    </CCardBody>
  </CCard>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CButton
} from '@coreui/vue-pro'

const props = defineProps({
  initialFilters: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:filters', 'reset'])

const filters = ref({
  market: '',
  status: '',
  minSize: '',
  maxSize: '',
  buildingType: '',
  ...props.initialFilters
})

// Options for select inputs
const marketOptions = [
  { value: '', label: 'All Markets' },
  { value: 'monterrey', label: 'Monterrey' },
  { value: 'saltillo', label: 'Saltillo' },
  { value: 'mexico', label: 'Mexico City' }
]

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'available', label: 'Available' },
  { value: 'occupied', label: 'Occupied' },
  { value: 'under_construction', label: 'Under Construction' }
]

const buildingTypeOptions = [
  { value: '', label: 'All Types' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'warehouse', label: 'Warehouse' }
]

// Watch for changes and emit updates
watch(filters, (newFilters) => {
  emit('update:filters', newFilters)
}, { deep: true })

// Reset filters
const handleReset = () => {
  filters.value = {
    market: '',
    status: '',
    minSize: '',
    maxSize: '',
    buildingType: ''
  }
  emit('reset')
}
</script>

<style scoped>
.filter-panel {
  height: 100%;
  border-radius: 0;
}

.filter-panel .card-header {
  background-color: transparent;
  border-bottom: 1px solid var(--cui-border-color);
}
</style>