<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>
            <input 
              type="checkbox" 
              :checked="allSelected"
              @change="toggleAllSelection"
            >
          </th>
          <th>Hide</th>
          <th v-for="column in visibleColumns" :key="column.field">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="row in filteredData" 
          :key="row.id"
          :class="{ 'table-secondary': isHidden(row.id) }"
        >
          <td>
            <input 
              type="checkbox"
              :checked="isSelected(row.id)"
              @change="toggleSelection(row.id)"
            >
          </td>
          <td>
            <input 
              type="checkbox"
              :checked="isHidden(row.id)"
              @change="toggleHidden(row.id)"
            >
          </td>
          <td v-for="column in visibleColumns" :key="column.field">
            {{ formatValue(row[column.field], column.type) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIndustrialData } from '../composables/useIndustrialData'

const { 
  filteredData, 
  selectedRows, 
  hiddenRows,
  toggleRowSelection,
  toggleRowHidden
} = useIndustrialData()

const columns = [
  { field: 'buildingName', label: 'BUILDING NAME', type: 'text' },
  { field: 'class', label: 'CLASS', type: 'text' },
  { field: 'buildingSizeSF', label: 'BUILDING SIZE (SF)', type: 'number' },
  { field: 'availableSF', label: 'AVAILABLE (SF)', type: 'number' },
  { field: 'minSpaceSF', label: 'MINIMUM SPACE (SF)', type: 'number' },
  { field: 'expansionSF', label: 'EXPANSION UP TO (SF)', type: 'number' },
  { field: 'industrialPark', label: 'INDUSTRIAL PARK', type: 'text' },
  { field: 'clearHeight', label: 'CLEAR HEIGHT', type: 'number' },
  { field: 'dockDoors', label: 'DOCK DOORS', type: 'number' },
  { field: 'driveInDoor', label: 'DRIVE IN DOOR', type: 'number' },
  { field: 'floorThickness', label: 'FLOOR THICKNESS', type: 'text' },
  { field: 'type', label: 'TYPE', type: 'text' },
  { field: 'owner', label: 'OWNER', type: 'text' },
  { field: 'developer', label: 'DEVELOPER', type: 'text' },
  { field: 'builder', label: 'BUILDER', type: 'text' },
  { field: 'status', label: 'STATUS', type: 'text' },
  { field: 'market', label: 'MARKET', type: 'text' },
  { field: 'subMarket', label: 'SUBMARKET', type: 'text' },
  { field: 'deal', label: 'DEAL', type: 'text' },
  { field: 'currency', label: 'CURRENCY', type: 'text' },
  { field: 'minLeaseSF', label: 'MIN. LEASE (SF/YR)', type: 'number' },
  { field: 'maxLeaseSF', label: 'MAX. LEASE (SF/YR)', type: 'number' },
  { field: 'salePriceSF', label: 'SALE PRICE (SF/YR)', type: 'number' },
  { field: 'availableSince', label: 'AVAILABLE SINCE', type: 'date' },
  { field: 'tenantType', label: 'SINGLE OR MULTITENANT', type: 'text' },
  { field: 'listingBroker', label: 'LISTING BROKER', type: 'text' },
  { field: 'comments', label: 'COMMENTS', type: 'text' },
  { field: 'contact', label: 'CONTACT', type: 'text' },
  { field: 'phone', label: 'PHONE', type: 'text' },
  { field: 'email', label: 'EMAIL', type: 'text' }
]

const visibleColumns = computed(() => columns)

const allSelected = computed(() => 
  filteredData.value.length > 0 && 
  filteredData.value.every(row => selectedRows.value.includes(row.id))
)

const isSelected = (id) => selectedRows.value.includes(id)
const isHidden = (id) => hiddenRows.value.includes(id)

const toggleSelection = (id) => toggleRowSelection(id)
const toggleHidden = (id) => toggleRowHidden(id)

const toggleAllSelection = () => {
  if (allSelected.value) {
    selectedRows.value = []
  } else {
    selectedRows.value = filteredData.value.map(row => row.id)
  }
}

const formatValue = (value, type) => {
  if (value == null) return ''
  
  switch (type) {
    case 'number':
      return new Intl.NumberFormat().format(value)
    case 'date':
      return new Date(value).toLocaleDateString()
    default:
      return value
  }
}
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}

.table th {
  white-space: nowrap;
  background-color: #f8f9fa;
}

.table td {
  white-space: nowrap;
}
</style> 