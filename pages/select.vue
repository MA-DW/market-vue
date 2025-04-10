<script setup lang="ts">
import { ref } from 'vue'

const selectData = [
  { label: 'Option 01', value: '01' },
  { label: 'Option 02', value: '02' },
  { label: 'Option 03', value: '03' },
  { label: 'Option 04', value: '04' },
  { label: 'Option 05', value: '05' },
  { label: 'Option 06', value: '06' },
]

// Single select values
const selectedValue = ref(null)
const selectedWithError = ref(null)
const selectedDisabled = ref('02')

// Multiple select values
const multiSelectedValue = ref([])
const multiSelectedWithError = ref([])
const multiSelectedDisabled = ref(['02', '03'])
</script>

<template>
  <div class="p-6">
    <h1 class="mb-6">Select</h1>
    
    <!-- Single Select -->
    <h2 class="text-xl font-bold mb-4">Single Select</h2>
    <div class="max-w-xs space-y-4 mb-8">
      <!-- Select básico -->
      <UikitSelect
        v-model="selectedValue"
        :data="selectData"
        label="Select normal"
        name="normal-select"
        empty="Seleccione una opción"
      />

      <!-- Select con error -->
      <UikitSelect
        v-model="selectedWithError"
        :data="selectData"
        label="Select con error"
        name="error-select"
        empty="Seleccione una opción"
        error="Este campo es requerido"
      />

      <!-- Select deshabilitado -->
      <UikitSelect
        v-model="selectedDisabled"
        :data="selectData"
        label="Select deshabilitado"
        name="disabled-select"
        empty="No puede seleccionar"
        disabled
      />
    </div>

    <!-- Multiple Select -->
    <h2 class="text-xl font-bold mb-4">Multiple Select</h2>
    <div class="max-w-xs space-y-4">
      <!-- Multi-select básico -->
      <UikitSelect
        v-model="multiSelectedValue"
        :data="selectData"
        label="Multi-select normal"
        name="multi-normal-select"
        empty="Seleccione opciones"
        multiple
      />

      <!-- Multi-select con error -->
      <UikitSelect
        v-model="multiSelectedWithError"
        :data="selectData"
        label="Multi-select con error"
        name="multi-error-select"
        empty="Seleccione opciones"
        error="Debe seleccionar al menos una opción"
        multiple
      />

      <!-- Multi-select deshabilitado -->
      <UikitSelect
        v-model="multiSelectedDisabled"
        :data="selectData"
        label="Multi-select deshabilitado"
        name="multi-disabled-select"
        empty="No puede seleccionar"
        disabled
        multiple
      />
    </div>
  </div>
</template> 