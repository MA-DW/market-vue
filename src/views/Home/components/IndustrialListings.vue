<script setup>
import { useTableFilters } from '../composables/useTableFilters'
import buildingsDataOriginal from '../_data'
import { computed, ref, onMounted } from 'vue'

// Estado para selección
const selected = ref([])

// Convertir buildingsDataOriginal a ref
const buildingsDataRef = ref(buildingsDataOriginal)

// Para debug
onMounted(() => {
  console.log('Datos originales:', buildingsDataOriginal)
  console.log('Datos filtrados:', filteredData.value)
  console.log('Datos de la tabla:', buildingsData.value)
})

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

const check = (event, id) => {
  if (event.target.checked) {
    selected.value = [...selected.value, id]
  } else {
    selected.value = selected.value.filter((itemId) => itemId !== id)
  }
}
</script>
<template>
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
                            :id="'checkbox-' + item.id"
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
</template>