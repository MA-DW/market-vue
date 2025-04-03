<template>
  <div class="">
    <h1>Components</h1>
    
    <div class="mb-8">
      <h2 class="mb-4">Input</h2>
      <div class="max-w-xs space-y-4">
        <!-- Input de texto básico -->
        <UikitInput
          v-model="textValue"
          label="Text input"
          name="text-input"
        />

        <!-- Input numérico -->
        <UikitInput
          v-model="numberValue"
          label="Number input"
          name="number-input"
          type="number"
        />

        <!-- Input with error -->
        <UikitInput
          v-model="errorValue"
          label="Input with error"
          name="error-input"
          error="This field is required"
        />

        <!-- Disabled input -->
        <UikitInput
          v-model="disabledValue"
          label="Disabled input"
          name="disabled-input"
          disabled
        />
      </div>
    </div>

    <div class="mb-8">
      <h2 class="mb-4">Select</h2>
      <div class="max-w-xs space-y-4">
        <UikitSelect
          v-model="selectedValue"
          :data="selectData"
          label="Normal select"
          name="normal-select"
          empty="Select an option"
        />

        <UikitSelect
          v-model="selectedOption2"
          :data="selectData"
          label="Disabled select"
          name="disabled-select"
          empty="Cannot select"
          disabled
        />
      </div>
    </div>

    <h2>Colors</h2>
    <div>Primary</div>
    <div class="flex">
      <div class="w-14 h-6 bg-primary"></div>
      <div class="w-14 h-6 bg-primary-300"></div>
      <div class="w-14 h-6 bg-primary-200"></div>
      <div class="w-14 h-6 bg-primary-100"></div>
    </div>

    <div>Secondary</div>
    <div class="flex">
      <div class="w-14 h-6 bg-secondary"></div>
      <div class="w-14 h-6 bg-secondary-300"></div>
      <div class="w-14 h-6 bg-secondary-200"></div>
      <div class="w-14 h-6 bg-secondary-100"></div>
    </div>

    <div>Terciary</div>
    <div class="flex">
      <div class="w-14 h-6 bg-terciary"></div>
      <div class="w-14 h-6 bg-terciary-300"></div>
      <div class="w-14 h-6 bg-terciary-200"></div>
      <div class="w-14 h-6 bg-terciary-100"></div>
    </div>

    <div>Fondos</div>
    <div class="flex">
      <div class="w-14 h-6 bg-oscuro"></div>
      <div class="w-14 h-6 bg-oscuro-300"></div>
      <div class="w-14 h-6 bg-oscuro-200"></div>
      <div class="w-14 h-6 bg-oscuro-100"></div>
    </div>

    <div>Alerta</div>
    <div class="flex">
      <div class="w-14 h-6 text-center bg-error text-white">Text</div>
      <div class="w-14 h-6 text-center bg-error-50 text-error">Text</div>
    </div>

    <div>Success</div>
    <div class="flex">
      <div class="w-14 h-6 text-center bg-success text-white">Text</div>
      <div class="w-14 h-6 text-center bg-success-50 text-success">Text</div>
    </div>

    <div>Disabled</div>
    <div class="flex">
      <div class="w-14 h-6 text-center text-disable-100 bg-terciary-200">Text</div>
    </div>
  </div>

  <div>Typografy</div>

  <h1>H1. ENCABEZADO 1</h1>
  <h2>H2. ENCABEZADO 2</h2>
  <h3>H3. ENCABEZADO 3</h3>

  <hr>
  <h1>Botones</h1>
  <div class="p-2 flex gap-4">
    <UikitButton @click="console.log('click me')">Button</UikitButton>
    <UikitButton>
      <UikitIcon name="configuration" color="currentColor" /> Button
    </UikitButton>
    <UikitButton>
      <UikitIcon name="configuration" color="currentColor" /> Button
    </UikitButton>
  </div>

  <div class="p-2 flex gap-4">
    <UikitButton outline>Button</UikitButton>
    <UikitButton outline>
      <UikitIcon name="configuration" color="currentColor" /> Button
      Button
    </UikitButton>
    <UikitButton outline>
      <UikitIcon name="configuration" color="currentColor" /> Button
    </UikitButton>
  </div>

  <div class="p-2 flex gap-4">
    <UikitButton variant="secondary">Button</UikitButton>
    <UikitButton variant="secondary">
      <UikitIcon name="configuration" color="currentColor" /> Button
      Button
    </UikitButton>
    <UikitButton variant="secondary">
      <UikitIcon name="configuration" color="currentColor" /> Button
    </UikitButton>
  </div>

  <div class="p-2 flex gap-4">
    <UikitButton outline variant="secondary">Button</UikitButton>
    <UikitButton outline variant="secondary">
      <UikitIcon name="configuration" color="currentColor" /> Button
      Button
    </UikitButton>
    <UikitButton outline variant="secondary">
      <UikitIcon name="configuration" color="currentColor" /> Button
    </UikitButton>
  </div>
  
  
  <div class="bg-primary">
    <div class="p-2 flex gap-4">
    <UikitButton background="dark">Button</UikitButton>
    <UikitButton background="dark">
      <UikitIcon name="configuration" color="currentColor" /> Button
      Button
    </UikitButton>
    <UikitButton background="dark">
      <UikitIcon name="configuration" color="currentColor" /> Button
    </UikitButton>
  </div>

  <div class="p-2 flex gap-4">
    <UikitButton background="dark" outline>Button</UikitButton>
    <UikitButton background="dark" outline>
      <UikitIcon name="configuration" color="currentColor" /> Button
      Button
    </UikitButton>
    <UikitButton background="dark" outline>
      <UikitIcon name="configuration" color="currentColor" /> Button
    </UikitButton>
  </div>

  <div class="p-2 flex gap-4">
    <UikitButton background="dark" variant="secondary">Button</UikitButton>
    <UikitButton background="dark" variant="secondary">
      <UikitIcon name="configuration" color="currentColor" /> Button
      Button
    </UikitButton>
    <UikitButton background="dark" variant="secondary">
      <UikitIcon name="configuration" color="currentColor" /> Button
    </UikitButton>
  </div>

  <div class="p-2 flex gap-4">
    <UikitButton background="dark" outline variant="secondary">Button</UikitButton>
    <UikitButton background="dark" outline variant="secondary">
      <UikitIcon name="configuration" color="currentColor" /> Button
      Button
    </UikitButton>
    <UikitButton background="dark" outline variant="secondary">
      <UikitIcon name="configuration" color="currentColor" /> Button
    </UikitButton>
  </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'

// Input values
const textValue = ref('')
const numberValue = ref(0)
const errorValue = ref('')
const disabledValue = ref('Disabled value')

const selectedValue = ref(null)
const selectedOption2 = ref(null)
const selectData = [
  { label: 'Option 01', value: '01' },
  { label: 'Option 02', value: '02' },
  { label: 'Option 03', value: '03' },
  { label: 'Option 04', value: '04' },
  { label: 'Option 05', value: '05' },
  { label: 'Option 06', value: '06' },
]
</script>