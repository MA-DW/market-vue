<script setup lang="ts">
import { Doughnut, Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement)

definePageMeta({
  title: 'Availability Buildings'
})

const filters = reactive({
  market: '',
  submarket: '',
  category: '',
  type: '',
  deal: '',
  availableSize: '',
  isSf: true,
})


const chartData = ref({
  labels: ['Rojo', 'Azul', 'Amarillo'],
  datasets: [
    {
      label: 'Distribución de colores',
      data: [40, 30, 30],
      backgroundColor: ['navy', '#60a5fa', 'blue'],
      borderColor: ['#ffffff', '#ffffff', '#ffffff'],
      borderWidth: 2,
    }
  ]
})

const chartDataPie = ref({
  labels: ['Producto A', 'Producto B', 'Producto C'],
  datasets: [
    {
      label: '2023',
      data: [40, 30, 30],
      backgroundColor: ['navy', '#60a5fa', 'blue'],
    },
    {
      label: '2024',
      data: [20, 50, 30],
      backgroundColor: ['#fb923c', '#34d399', '#a78bfa'],
    }
  ]
})

const chartOptions = ref({
  responsive: true,
})
</script>
<template>
  <div class="">

    <div class="p-3 bg-primary rounded flex gap-2">
      <div>
        <UikitSelect
          v-model="filters.market"
          :data="[
            { label: 'market 01', value: '01' },
            { label: 'market 02', value: '02' },
          ]"
          empty="Market"
          name="market"
        />
      </div>

      <div>
        <UikitSelect
          v-model="filters.submarket"
          :data="[
            { label: 'submarket 01', value: '01' },
            { label: 'submarket 02', value: '02' },
          ]"
          empty="Submarket"
          name="submarket"
        />
      </div>

      <div>
        <UikitSelect
          v-model="filters.category"
          :data="[
            { label: 'Class 01', value: '01' },
            { label: 'Class 02', value: '02' },
          ]"
          empty="Class"
          name="class"
        />
      </div>

      <div>
        <UikitSelect
          v-model="filters.type"
          :data="[
            { label: 'Type 01', value: '01' },
            { label: 'Type 02', value: '02' },
          ]"
          empty="Type"
          name="type"
        />
      </div>

      <div>
        <UikitSelect
          v-model="filters.deal"
          :data="[
            { label: 'deal 01', value: '01' },
            { label: 'deal 02', value: '02' },
          ]"
          empty="Deal"
          name="deal"
        />
      </div>

      <div>
        <UikitSelect
          v-model="filters.availableSize"
          :data="[
            { label: 'available Size 01', value: '01' },
            { label: 'available Size 02', value: '02' },
          ]"
          empty="Available size (SF)"
          name="availableSize"
        />
      </div>

      <div>
        <UikitSelect
          v-model="filters.market"
          :data="[
            { label: 'market 01', value: '01' },
            { label: 'market 02', value: '02' },
          ]"
          empty="Market"
          name="market"
        />
      </div>

      <div>
        <UikitButton>
          <UikitIcon name="configuration" color="currentColor" /> Advanced
        </UikitButton>
      </div>

      <div class="flex">
        <UikitSwitchToggle v-model="filters.isSf" label-left="SF" label-right="SM" />
      </div>

      <div>
        <UikitButton>Search</UikitButton>
      </div>

      <div>
        <UikitButton title="reset filters"><UikitIcon name="reset" color="currentColor" /></UikitButton>
      </div>

    </div>

    <div class="w-full mt-4">
      <img src="/assets/images/map.png" alt="fake gmap" class="w-full">
    </div>

    <div class="my-5">
      <span class="font-bold uppercase text-[32px]">INDUSTRIAL Availability | Q2 2024</span>
    </div>

    <div class="flex flex-wrap">
      <div class="w-1/4 md:w-1/2 lg:w-1/4 pr-2">
        <UikitCardNumber title="Card title/hame/header" text="000,000,000" value="000"></UikitCardNumber>
      </div>
      <div class="w-1/4 md:w-1/2 lg:w-1/4 px-2">
        <UikitCardNumber title="Card title/hame/header" text="000,000,000" value="000"></UikitCardNumber>
      </div>
      <div class="w-1/4 md:w-1/2 lg:w-1/4 px-2">
        <UikitCardNumber title="Card title/hame/header" text="000,000,000" value="000"></UikitCardNumber>
      </div>
      <div class="w-1/4 md:w-1/2 lg:w-1/4 pl-2">
        <UikitCardNumber title="Card title/hame/header" text="000,000,000" value="000"></UikitCardNumber>
      </div>
    </div>

    <div class="flex flex-wrap w-full mt-4">
      <div class="w-full md:w-1/2 lg:w-1/4 pr-2">
        <div class="h-full rounded-lg bg-white shadow-[0_10px_30px_0_rgb(0_0_0_/_.05)] p-4">
          <div class="font-calibri font-bold text-[20px]">Building by location</div>

          <div class="mt-4 overflow-auto max-h-96">
            <div class="mb-4">
              <div class="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>Aguascalientes</span>
                <span class="font-semibold text-gray-800">27.5%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 27.5%;"></div>
              </div>
            </div>
            <div class="mb-4">
              <div class="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>Aguascalientes</span>
                <span class="font-semibold text-gray-800">27.5%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 27.5%;"></div>
              </div>
            </div>
            <div class="mb-4">
              <div class="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>Aguascalientes</span>
                <span class="font-semibold text-gray-800">27.5%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 27.5%;"></div>
              </div>
            </div>
            <div class="mb-4">
              <div class="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>Aguascalientes</span>
                <span class="font-semibold text-gray-800">27.5%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 27.5%;"></div>
              </div>
            </div>
            <div class="mb-4">
              <div class="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>Aguascalientes</span>
                <span class="font-semibold text-gray-800">27.5%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 27.5%;"></div>
              </div>
            </div>
            <div class="mb-4">
              <div class="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>Aguascalientes</span>
                <span class="font-semibold text-gray-800">27.5%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 27.5%;"></div>
              </div>
            </div>
            <div class="mb-4">
              <div class="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>Aguascalientes</span>
                <span class="font-semibold text-gray-800">27.5%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 27.5%;"></div>
              </div>
            </div>
            <div class="mb-4">
              <div class="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>Aguascalientes</span>
                <span class="font-semibold text-gray-800">27.5%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 27.5%;"></div>
              </div>
            </div>
            <div class="mb-4">
              <div class="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>Aguascalientes</span>
                <span class="font-semibold text-gray-800">27.5%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 27.5%;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-2/4 px-2">
        <div class="h-full rounded-lg bg-white shadow-[0_10px_30px_0_rgb(0_0_0_/_.05)] p-4">
          <div class="flex">
            <div class="w-1/2">
              <Pie
                id="my-chart-id"
                :options="chartOptions"
                :data="chartDataPie"
              />
            </div>
            <div class="w-1/2">
              <div>
                <div class="text-center font-calibri font-bold text-[20px]">Pecentage by Class</div>
                <div class="flex flex-col text-center mt-10">
                  <div class="font-bold text-[45px]">59.14%</div>
                  <div class="text-gray-600"><div class="w-3 h-3 rounded-full mr-2 bg-primary inline-block"></div>Class A Building</div>
                </div>
                <div class="flex flex-col text-center mt-10">
                  <div class="font-bold text-[45px]">45.06%</div>
                  <div class="text-gray-600"><div class="w-3 h-3 rounded-full mr-2 bg-secondary inline-block"></div>Class A Building</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 lg:w-1/4 pl-2">
        <div class="h-full rounded-lg bg-white shadow-[0_10px_30px_0_rgb(0_0_0_/_.05)] p-4">
          <Doughnut
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
          />
        </div>
      </div>
    </div>

    <div class="my-5">
      <span class="font-bold uppercase text-[32px]">INDUSTRIAL Listing</span>
    </div>

    <div>
      <DatatableHome :filters="filters" />
    </div>
  </div>
</template>