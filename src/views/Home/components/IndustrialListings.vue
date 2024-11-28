<template>
  <CCard class="mb-4">
    <CCardHeader>
      <strong>Industrial Listings</strong>
    </CCardHeader>
    <CCardBody>
      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Building Name</CTableHeaderCell>
            <CTableHeaderCell>Market</CTableHeaderCell>
            <CTableHeaderCell>Submarket</CTableHeaderCell>
            <CTableHeaderCell>Class</CTableHeaderCell>
            <CTableHeaderCell>Type</CTableHeaderCell>
            <CTableHeaderCell>Size (SF)</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Available Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow v-for="building in buildingsData" :key="building.id">
            <CTableDataCell>{{ building.buildingName }}</CTableDataCell>
            <CTableDataCell>{{ building.market }}</CTableDataCell>
            <CTableDataCell>{{ building.subMarket }}</CTableDataCell>
            <CTableDataCell>{{ building.class }}</CTableDataCell>
            <CTableDataCell>{{ building.type }}</CTableDataCell>
            <CTableDataCell>{{ building.buildingSizeSF.toLocaleString() }}</CTableDataCell>
            <CTableDataCell>
              <CBadge :color="getStatusColor(building.status)">
                {{ building.status }}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell>{{ formatDate(building.availableDate) }}</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>
</template>

<script setup>
import { computed } from 'vue'
import { useIndustrialData } from '../composables/useIndustrialData'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CBadge
} from '@coreui/vue-pro'

const { filteredData } = useIndustrialData()

const buildingsData = computed(() => filteredData.value)

const getStatusColor = (status) => {
  const colors = {
    'Available': 'success',
    'Occupied': 'danger',
    'Under Construction': 'warning',
    'Future Available': 'info'
  }
  return colors[status] || 'secondary'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
</script>