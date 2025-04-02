<template>
  <div class="">
    <h1>Components</h1>
    
    <div class="mb-8">
      <h2 class="mb-4">Input</h2>
      <div class="max-w-xs space-y-4">
        <UikitInput
          v-model="inputValue1"
          label="Normal input"
          name="normal-input"
          placeholder="Write your text here"
        />

        <UikitInput
          v-model="inputValue2"
          label="Input with value"
          name="filled-input"
          placeholder="Write your text here"
        />

        <UikitInput
          v-model="inputValue3"
          label="Input with error"
          name="error-input"
          placeholder="Write your text here"
          error="This field is required"
        />

        <UikitInput
          v-model="inputValue4"
          label="Disabled input"
          name="disabled-input"
          placeholder="Cannot write here"
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
    <UikitButton disabled>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
      Button
    </UikitButton>
    <UikitButton disabled>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    </UikitButton>
  </div>

  <div class="p-2 flex gap-4">
    <UikitButton outline>Button</UikitButton>
    <UikitButton outline>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
      Button
    </UikitButton>
    <UikitButton outline>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    </UikitButton>
  </div>

  <div class="p-2 flex gap-4">
    <UikitButton variant="secondary">Button</UikitButton>
    <UikitButton variant="secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
      Button
    </UikitButton>
    <UikitButton variant="secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    </UikitButton>
  </div>

  <div class="p-2 flex gap-4">
    <UikitButton outline variant="secondary">Button</UikitButton>
    <UikitButton outline variant="secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
      Button
    </UikitButton>
    <UikitButton outline variant="secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    </UikitButton>
  </div>
  
  
  <div class="bg-primary">
    <div class="p-2 flex gap-4">
    <UikitButton background="dark">Button</UikitButton>
    <UikitButton background="dark">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
      Button
    </UikitButton>
    <UikitButton background="dark">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    </UikitButton>
  </div>

  <div class="p-2 flex gap-4">
    <UikitButton background="dark" outline>Button</UikitButton>
    <UikitButton background="dark" outline>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
      Button
    </UikitButton>
    <UikitButton background="dark" outline>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    </UikitButton>
  </div>

  <div class="p-2 flex gap-4">
    <UikitButton background="dark" variant="secondary">Button</UikitButton>
    <UikitButton background="dark" variant="secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
      Button
    </UikitButton>
    <UikitButton background="dark" variant="secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    </UikitButton>
  </div>

  <div class="p-2 flex gap-4">
    <UikitButton background="dark" outline variant="secondary">Button</UikitButton>
    <UikitButton background="dark" outline variant="secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
      Button
    </UikitButton>
    <UikitButton background="dark" outline variant="secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    </UikitButton>
  </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue1 = ref('')
const inputValue2 = ref('This input has a value')
const inputValue3 = ref('')
const inputValue4 = ref('Disabled value')

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