<script setup lang="ts">
import { Doughnut, Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { onClickOutside } from '@vueuse/core'
import VueSlider from 'vue-3-slider-component'
ChartJS.register(Title, Tooltip, Legend, ArcElement)

definePageMeta({
  title: 'Availability Buildings',
  auth: true
})

type ItemCatalogs = {label: string; value: string | number}

const buildingApi = useBuilding()
const marketsApi = useMarket()
const availabilityApi = useAvailabilityBuilding()

const initialFilters = {
  market: [],
  submarket: [],
  category: [],
  type: [],
  deal: [],
  availableSize: [0, 50],
  isSf: true,

  region: [],
  status: [],
  currency: [],
  tenancy: [],
  building_name: '',
  industrialPark: [],
  sharedTrunk: '',
  doors: [],
  developer: [],
  askingPrice: true,
}

const filters = reactive(initialFilters)

const markets = reactive({items: [] as ItemCatalogs[], loading: false});
const submarkets = reactive({items: [] as ItemCatalogs[], loading: false});
const categories = reactive({items: [] as ItemCatalogs[], loading: false});
const types = reactive({items: [] as ItemCatalogs[], loading: false});
const deals = reactive({items: [] as ItemCatalogs[], loading: false});
const regions = reactive({items: [] as ItemCatalogs[], loading: false});
const status = reactive({items: [] as ItemCatalogs[], loading: false});
const currencies = reactive({items: [] as ItemCatalogs[], loading: false});
const industrialParks = reactive({items: [] as ItemCatalogs[], loading: false});
const developers = reactive({items: [] as ItemCatalogs[], loading: false});
const loadingDoors = reactive({items: [] as ItemCatalogs[], loading: false});
const tenancies = reactive({items: [] as ItemCatalogs[], loading: false});
const sharedTruck = reactive({items: [{value: 'Yes', label: 'Yes'}, {value: 'No', label: 'No'}] as ItemCatalogs[], loading: false});

async function fetchCategories() {
  const response = await buildingApi.fetchCategories()
  categories.items = Object.values(response.data).map(k => ({label: k, value: k}))
}

async function fetchMarkets() {
  const response = await marketsApi.fetchMarkets()
  markets.items = response.data.sort((a, b) => a.name.localeCompare(b.name)).map(({id: value, name: label}) => ({label, value}))
}

async function fetchSubmarkets() {
  const response = await marketsApi.fetchSubMarkets()
  submarkets.items = response.data.sort((a, b) => a.name.localeCompare(b.name)).map(({id: value, name: label}) => ({label, value}))
}

async function fetchTypes() {
  const response = await buildingApi.fetchTypes({availability: true})
  types.items = response.data.map(item => ({label: item, value: item}))
}

async function fetchDeals() {
  const response = await buildingApi.fetchDeals()
  deals.items = Object.values(response.data).map(k => ({label: k, value: k}))
}

async function fetchRegions() {
  const response = await marketsApi.fetchRegions()
  regions.items = response.data.sort((a, b) => a.name.localeCompare(b.name)).map(({id, name}) => ({label: name, value: id}))
}

async function fetchIndustrialParks() {
  const response = await marketsApi.fetchIndustrialParks()
  industrialParks.items = response.data.sort((a, b) => a.name.localeCompare(b.name)).map(({id, name}) => ({label: name, value: id}))
}

async function fetchDevelopers() {
  const response = await marketsApi.fetchDevelopers({is_developer: true})
  developers.items = response.data.sort((a, b) => a.name.localeCompare(b.name)).map(({id, name}) => ({label: name, value: id}))
}

async function fetchCurrencies() {
  const response = await buildingApi.fetchCurrencies()
  currencies.items = Object.values(response.data).map(k => ({label: k, value: k}))
}

async function fetchStatus() {
  const response = await buildingApi.fetchStatus()
  status.items = Object.values(response.data).map(k => ({label: k, value: k}))
}

async function fetchLoadingDoor() {
  const response = await buildingApi.fetchLoadingDoor()
  loadingDoors.items = Object.values(response.data).map(k => ({label: k, value: k}))
}

async function fetchTenancies() {
  const response = await buildingApi.fetchTenancies()
  tenancies.items = Object.values(response.data).map(k => ({label: k, value: k}))
}

async function fetchAvl(filters: any) {
  const response = await availabilityApi.fetchAvailability(filters);
  console.log(response)
}

const statisticsCards = reactive({
  totalBuilding: { total: 0, size: 0 },
  totalCategoryA: { total: 0, size: 0 },
  totalCategoryB: { total: 0, size: 0 },
  totalCategoryC: { total: 0, size: 0 },
  underConstruction: { total: 0, size: 0 },
})
async function fetchAvlStatistics(filters: any) {
  const response = await availabilityApi.fetchAvlStatistics(filters);

  statisticsCards.totalBuilding.total = response.data.total_buildings_count as any;
  statisticsCards.totalBuilding.size = response.data.total_buildings as any;

  statisticsCards.totalCategoryA.total = response.data.total_class_a_count as any;
  statisticsCards.totalCategoryA.size = response.data.total_class_a as any;

  statisticsCards.totalCategoryB.total = response.data.total_class_b_count as any;
  statisticsCards.totalCategoryB.size = response.data.total_class_b as any;

  statisticsCards.totalCategoryC.total = response.data.total_class_c_count as any;
  statisticsCards.totalCategoryC.size = response.data.total_class_c as any;

  statisticsCards.underConstruction.total = response.data.total_underconstruction_count as any;
  statisticsCards.underConstruction.size = response.data.total_underconstruction as any;
}

onMounted(async () => {
  fetchCategories()
  fetchMarkets()
  fetchSubmarkets()
  fetchTypes()
  fetchDeals()
  fetchRegions()
  fetchDevelopers()
  fetchIndustrialParks()
  fetchCurrencies()
  fetchStatus()
  fetchLoadingDoor()
  fetchTenancies()

  fetchAvl(filters);
  fetchAvlStatistics(filters);
})

const isOpenAdvancedFilters = ref(false)
const dropdownAdvancedFiltersRef = ref(null)

onClickOutside(dropdownAdvancedFiltersRef, () => {
  isOpenAdvancedFilters.value = false
})

const isOpenSize = ref(false)
const dropdownSizeRef = ref(null)

onClickOutside(dropdownSizeRef, () => {
  isOpenSize.value = false
})

function submit() {
  console.log('se ejecuto el submit', filters)
}

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
    <form class="bg-primary rounded grid p-3" @submit.prevent="submit">

      <div class="grid grid-cols-4">
        <!-- inputs -->
        <div class="col-span-3 grid grid-cols-7 gap-2">
          <div class="">
            <UikitSelect
              v-model="filters.market"
              :data="markets.items"
              empty="Market"
              name="market"
              multiple
              show-select-all
            />
          </div>

          <div class="">
            <UikitSelect
              v-model="filters.submarket"
              :data="submarkets.items"
              empty="Submarket"
              name="submarket"
              multiple
              show-select-all
            />
          </div>

          <div class="">
            <UikitSelect
              v-model="filters.category"
              :data="categories.items"
              name="class"
              empty="Class"
              multiple
              show-select-all
            />
          </div>

          <div class="">
            <UikitSelect
              v-model="filters.type"
              :data="types.items"
              empty="Type"
              name="type"
              multiple
              show-select-all
            />
          </div>

          <div class="">
            <UikitSelect
              v-model="filters.deal"
              :data="deals.items"
              empty="Deal"
              name="deal"
              multiple
              show-select-all
            />
          </div>

          <div class="relative" ref="dropdownSizeRef">
            <div @click="isOpenSize = !isOpenSize" class="h-[40px] bg-white flex items-center rounded p-2">
              <svg class="pointer-events-none" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_195_1845)">
                <path d="M22.0713 11.4639L25.6068 14.9994L22.0713 18.5349" stroke="#403F41" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.92871 18.5349L4.39318 14.9994L7.92871 11.4639" stroke="#403F41" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M25.6062 14.9998H17.3567" stroke="#403F41" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.39377 14.9998H12.6433" stroke="#403F41" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_195_1845">
                <rect width="20" height="20" fill="white" transform="translate(15 0.857422) rotate(45)"/>
                </clipPath>
                </defs>
              </svg>
              <div class="pointer-events-none ml-1 overflow-hidden whitespace-nowrap text-ellipsis">
                Available Size (SF)
              </div>
            </div>

            <div v-if="isOpenSize" class="absolute block top-18 right-0 bg-white w-80 p-4 rounded shadow-[0px_2px_4px_0px_rgb(0_0_0_/_.15)] text-lg z-50">
              <div class="bg-white p-4">
                <VueSlider v-model="filters.availableSize" />
              </div>
    
              <div class="flex">
                <div>
                  <UikitInput
                    v-model="filters.availableSize[0]"
                    label="Number input"
                    name="number-input"
                    type="number"
                  />
                </div>
                <div class="p-1 w-auto">
                  -
                </div>
                <div>
                  <UikitInput
                    v-model="filters.availableSize[1]"
                    label="Number input"
                    name="number-input"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="relative" ref="dropdownAdvancedFiltersRef">
            <UikitButton @click="isOpenAdvancedFilters = !isOpenAdvancedFilters">
              <UikitIcon name="configuration" color="currentColor" /> Advanced
            </UikitButton>
            <div v-if="isOpenAdvancedFilters" class="absolute block top-12 left-[-24px] bg-white w-[600px] rounded shadow-[0px_2px_4px_0px_rgb(0_0_0_/_.15)] p-0 text-lg z-[100]">
              <div class="p-2 w-full flex flex-wrap">
                
                <div class="w-1/3 p-1">
                  <UikitSelect
                    v-model="filters.region"
                    :data="regions.items"
                    empty="Region"
                    name="Region"
                    multiple
                    show-select-all
                  />
                </div>
                <div class="w-1/3 p-1">
                  <UikitSelect
                    v-model="filters.status"
                    :data="status.items"
                    empty="Status"
                    name="Status"
                    multiple
                    show-select-all
                  />
                </div>
                <div class="w-1/3 p-1">
                  <UikitSelect
                    v-model="filters.currency"
                    :data="currencies.items"
                    empty="Currency"
                    name="Currency"
                    multiple
                    show-select-all
                  />
                </div>
                <div class="w-1/3 p-1">
                  <UikitSelect
                    v-model="filters.tenancy"
                    :data="tenancies.items"
                    empty="Tenancy"
                    name="tenancies"
                    multiple
                    show-select-all
                  />
                </div>
                <div class="w-1/3 p-1">
                  <UikitInput
                    v-model="filters.building_name"
                    name="name"
                    placeholder="Building name"
                  />
                </div>
                <div class="w-1/3 p-1">
                  <UikitSelect
                    v-model="filters.industrialPark"
                    :data="industrialParks.items"
                    empty="Industrial Parks"
                    name="Industrial_Parks"
                    multiple
                    show-select-all
                  />
                </div>
                <div class="w-1/3 p-1">
                  <UikitSelect
                    v-model="filters.sharedTrunk"
                    :data="sharedTruck.items"
                    empty="Shared Trunk Court Area"
                    name="shared-trunk"
                  />
                </div>
                <div class="w-1/3 p-1">
                  <UikitSelect
                    v-model="filters.doors"
                    :data="loadingDoors.items"
                    empty="Loading Doors"
                    name="Loading_Doors"
                    multiple
                    show-select-all
                  />
                </div>
                <div class="w-1/3 p-1">
                  <UikitSelect
                    v-model="filters.developer"
                    :data="developers.items"
                    empty="Developers"
                    name="Developers"
                    multiple
                    show-select-all
                  />
                </div>
                <div class="w-1/3 p-2">
                  <div class="flex">
                    <div class="pr-2 text-oscuro-300 text-sm">Asking Price:</div>
                    <UikitSwitchToggle v-model="filters.askingPrice" label-left="MO" label-right="YR" theme="dark" />
                  </div>
                </div>


              </div>
            </div>
          </div>

        </div>
        <!-- botones -->
        <div class="grid grid-cols-7 gap-2 border-l border-[rgb(234_234_234_/_.2)]">
          <div class="col-span-3 self-center">
            <UikitSwitchToggle v-model="filters.isSf" label-left="SF" label-right="SM" />
          </div>
    
          <div class="col-span-3">
            <UikitButton class="w-full" type="submit">Search</UikitButton>
          </div>

          <div class="flex">
            <div class="basis-full items-center justify-center bg-[#39709a] rounded flex" title="reset filters" @click="filters = initialFilters">
              <UikitIcon name="reset" color="white" />
            </div>
          </div>
        </div>
      </div>

    </form>

    <div class="w-full mt-4">
      <img src="/assets/images/map.png" alt="fake gmap" class="w-full">
    </div>

    <div class="my-5">
      <span class="font-bold uppercase text-[32px]">INDUSTRIAL Availability | Q2 2024</span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
      <div class="">
        <UikitCardNumber title="Total Buildings" :text="statisticsCards.totalBuilding.size" :value="statisticsCards.totalBuilding.total"></UikitCardNumber>
      </div>
      <div class="">
        <UikitCardNumber title="Buildings Class A" :text="statisticsCards.totalCategoryA.size" :value="statisticsCards.totalCategoryA.total"></UikitCardNumber>
      </div>
      <div class="">
        <UikitCardNumber title="Buildings Class B" :text="statisticsCards.totalCategoryB.size" :value="statisticsCards.totalCategoryB.total"></UikitCardNumber>
      </div>
      <div class="">
        <UikitCardNumber title="Buildings Class C" :text="statisticsCards.totalCategoryC.size" :value="statisticsCards.totalCategoryC.total"></UikitCardNumber>
      </div>
      <div class="">
        <UikitCardNumber title="Under Construction" :text="statisticsCards.underConstruction.size" :value="statisticsCards.underConstruction.total"></UikitCardNumber>
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
      <DatatableHome :filters="(filters as any)" />
    </div>
  </div>
</template>