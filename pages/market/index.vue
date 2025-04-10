<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

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
  labels: [ 'January', 'February', 'March' ],
  datasets: [ { data: [40, 20, 12] } ]
})

const chartOptions = ref({
  responsive: true
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

    <div class="w-full h-80 bg-gray-500 mt-3">

    </div>

    <div class="mt-3">
      <h1>Availability Q2 2024</h1>
    </div>

    <div class="flex gap-4 w-full">
      <div class="bg-white flex-1 h-28">card</div>
      <div class="bg-white flex-1 h-28">card</div>
      <div class="bg-white flex-1 h-28">card</div>
      <div class="bg-white flex-1 h-28">card</div>
    </div>


    <div class="flex gap-4 w-full mt-3">
      <div class="bg-white flex-1 h-28">card</div>
      <div class="bg-white flex-1 h-28">
        <Bar
          id="my-chart-id"
          :options="chartOptions"
          :data="chartData"
        />

      </div>
      <div class="bg-white flex-1 h-28">card</div>
    </div>
  </div>
</template>