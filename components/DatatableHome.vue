<script setup lang="ts">
import { 
  createColumnHelper, 
  FlexRender, 
  getCoreRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel, 
  getSortedRowModel, 
  useVueTable, 
  type Column, 
  type ColumnFiltersState, 
  type RowSelectionState,
  type SortingState
} from '@tanstack/vue-table';
import { onClickOutside } from '@vueuse/core';

interface BuildingInterface {
  // id: number
  "class": 'A' | 'B' | 'C'
  "building_name": string
  "building_size": number
  "available_size": number
  "minimum_space": number
  "expansion_up_to": number
  "industrial_park": string
  "clear_height": number
  "dock_doors": number
  "drive_in_door": string | number
  "floor_thickness": string | number
  "type": string
  "owner": string
  "developer": string
  "builder": string
  "generation": string
  "market": string
  "submarket": string
  "deal": string
  "currency": string
  "min_lease": string | number
  "max_lease": string | number
  "sale_price": string | number
  "available_since": string
  "tenancy": string
  "broker": string
  "comments": string
}

const availabilityApi = useAvailabilityBuilding()

const props = defineProps<{
  filters: {
    market: string,
    submarket: string,
    category: string,
    type: string,
    deal: string,
    availableSize: [number, number],
    isSf: boolean
  }
}>()

const data = ref<BuildingInterface[]>([])
const columnVisibility = ref({})
const rowSelection = ref<RowSelectionState>({})
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const rowVisibilityMap = reactive(new Map<number | string, boolean>())
const pageSizes = [10, 25, 50, 100, 500, 1000]

const columnHelper = createColumnHelper<BuildingInterface>()

const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => {
      return h(resolveComponent('UikitCheckbox'), {
        modelValue: table.getIsAllRowsSelected(),
        onChange: table.getToggleAllRowsSelectedHandler(),
        indeterminate: table.getIsSomeRowsSelected(),
      })
    },
    cell: ({ row }) => {
      return h(resolveComponent('UikitCheckbox'), {
        modelValue: row.getIsSelected(),
        onChange: row.getToggleSelectedHandler(),
        disabled: !row.getCanSelect(),
      })
    },
    enableHiding: false,
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'hide', 
    header: 'Hide', 
    enableHiding: false,
    enableSorting: false,
    cell({ row }) {
      const visible = rowVisibilityMap.get(row.id) ?? true;
      return h('div', {
          class: 'text-center inline-block cursor-pointer p-1 bg-oscuro-100 rounded',
          onClick: () => rowVisibilityMap.set(row.id, !visible),
        },
        h(resolveComponent('UikitIcon'), {
          name: visible ? 'view' : 'hide'
        })
      )
    }
  }),
  columnHelper.accessor('building_name', {
    header: 'Building Name',
  }),
  columnHelper.accessor('class', {
    header: 'Class',
    cell: (info) => {
      return h('span', {class: 'inline-flex justify-center items-center bg-terciary-100 h-5 w-5 text-sm text-primary-fixed rounded-full font-bold'}, info.getValue())
    },
  }),
  columnHelper.accessor('building_size', {
    header: 'Building Size',
  }),
  columnHelper.accessor('available_size', {
    header: 'Available (SF)',
  }),
  columnHelper.accessor('minimum_space', {
    header: 'Minimum Space',
  }),
  columnHelper.accessor('expansion_up_to', {
    header: 'Expansion Up To (SF)',
  }),
  columnHelper.accessor('industrial_park', {
    header: 'Industrial Park',
  }),
  columnHelper.accessor('clear_height', {
    header: 'Clear Height',
  }),
  columnHelper.accessor('dock_doors', {
    header: 'Dock Door',
  }),
  columnHelper.accessor('drive_in_door', {
    header: 'Drive in Door',
  }),
  columnHelper.accessor('floor_thickness', {
    header: 'Floor Thickness',
  }),
  columnHelper.accessor('type', {
    header: 'Type',
  }),
  columnHelper.accessor('owner', {
    header: 'Owner',
  }),
  columnHelper.accessor('developer', {
    header: 'Developer',
  }),
  columnHelper.accessor('builder', {
    header: 'Builder',
  }),
  columnHelper.accessor('generation', {
    header: 'Generation',
  }),
  columnHelper.accessor('market', {
    header: 'Market',
  }),
  columnHelper.accessor('submarket', {
    header: 'Submarket',
  }),
  columnHelper.accessor('deal', {
    header: 'Deal',
  }),
  columnHelper.accessor('currency', {
    header: 'Currency',
  }),
  columnHelper.accessor('min_lease', {
    header: 'Min Lease',
  }),
  columnHelper.accessor('max_lease', {
    header: 'Max Lease',
  }),
  columnHelper.accessor('sale_price', {
    header: 'Sale Price',
  }),
  columnHelper.accessor('available_since', {
    header: 'Available Since',
  }),
  columnHelper.accessor('tenancy', {
    header: 'Tenancy',
  }),
  columnHelper.accessor('broker', {
    header: 'Broker',
  }),
  columnHelper.accessor('comments', {
    header: 'comments',
  }),
]

const table = useVueTable({
  get data() {
    return data.value
  },
  columns,
  state: {
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
  },
  enableRowSelection: true,
  onRowSelectionChange: updateOrValue => {
    rowSelection.value = typeof updateOrValue === 'function'
      ? updateOrValue(rowSelection.value)
      : updateOrValue
  },
  onSortingChange: updaterOrValue => {
    sorting.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue
  },
  onColumnFiltersChange: updaterOrValue => {
    columnFilters.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(columnFilters.value)
        : updaterOrValue
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
})

function toggleColumnVisibility(column: Column<any, any>) {
  columnVisibility.value = {
    ...columnVisibility.value,
    [column.id]: !column.getIsVisible(),
  }
}

function toggleAllColumnsVisibility() {
  table.getAllLeafColumns().forEach(column => {
    toggleColumnVisibility(column)
  })
}

function handlePageSizeChange(e: any) {
  table.setPageSize(e.target.value)
}

function handleGoToPage(e: any) {
  const page = e.target.value ? Number(e.target.value) -1 : 0
  if (page < 0 || page > table.getPageCount()) {
    return
  }
  table.setPageIndex(page)
}

async function fetchAvl(filters: any) {
  const response = await availabilityApi.fetchAvailability(filters);
  data.value = response.data as any
}

onMounted(async () => {
  fetchAvl(props.filters);
})

const isOpen = ref(false)
const dropdownRef = ref(null)

onClickOutside(dropdownRef, () => {
  isOpen.value = false
})
</script>
<template>
  <div class="shadow-[0_10px_30px_0_rgb(0_0_0_/_.05)] p-4 bg-white my-5 rounded-lg">
    <div class="flex">
      <div class="flex gap-4 flex-1">
        Entries per page: 
        <select name="per_pages" :value="table.getState().pagination.pageSize" @change="handlePageSizeChange">
          <option v-for="pageSize in pageSizes" :key="pageSize" :value="pageSize">{{ pageSize }}</option>
        </select>
        Last update: 15/12/2024
      </div>
      <div class="relative flex gap-2" ref="dropdownRef">
        <div class="bg-primary-100 cursor-pointer rounded active:ring-2 p-1" tabindex="0" title="mode gallery"><UikitIcon name="gallery" /></div>
        <div class="bg-primary-100 cursor-pointer rounded active:ring-2 p-1" tabindex="0" title="visible columns" @click="isOpen = !isOpen"><UikitIcon name="rows" /></div>
        <div class="bg-primary-100 cursor-pointer rounded active:ring-2 p-1" tabindex="0" title="compare"><UikitIcon name="compare" /></div>
        <div class="bg-primary-100 cursor-pointer rounded active:ring-2 p-1" tabindex="0" title="download"><UikitIcon name="download" /></div>
        <div class="bg-primary-100 cursor-pointer rounded active:ring-2 p-1" tabindex="0" title="favorite"><UikitIcon name="favorite" /></div>

        <ul v-if="isOpen" class="absolute block top-12 right-0 bg-white w-60 rounded shadow-[0px_2px_4px_0px_rgb(0_0_0_/_.15)] py-3 px-4 text-lg z-50">
          <li class="px-1 border-b border-oscuro-100">
            <label>
              <input
                type="checkbox"
                :checked="table.getIsAllColumnsVisible()"
                @input="toggleAllColumnsVisibility"
              />
              Toggle All
            </label>
          </li>
          <li
            v-for="column in table.getAllLeafColumns()"
            :key="column.id"
            class="px-1"
          >
            <label>
              <input
                type="checkbox"
                :checked="column.getIsVisible()"
                @input="toggleColumnVisibility(column)"
              />
              {{ ['select'].includes(column.id) ? column.id : column.columnDef.header }}
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="bg-white shadow-[0_10px_30px_0_rgb(0_0_0_/_.05)] p-4 my-5 rounded-lg w-full">
    
    <div class="overflow-x-auto">
      <table class="border-collapse w-full min-w-full">
        <thead>
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="bg-[#DEDFE3] text-oscuro-300 text-sm rounded-lg"
          >
            <th
              v-for="(header, index) in headerGroup.headers"
              :key="header.id"
              :colSpan="header.colSpan"
              class="uppercase py-4 px-2"
              :class="[
                header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                index === 0 ? 'rounded-tl-lg rounded-bl-lg' : '',
                index === columns.length - 1 ? 'rounded-tr-lg rounded-br-lg' : ''
              ]"
            >
              <div @click="header.column.getToggleSortingHandler()?.($event)">
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
                <svg v-if="header.column.getIsSorted() === 'asc'" class="inline" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: currentColor"><path d="M11 9h9v2h-9zm0 4h7v2h-7zm0-8h11v2H11zm0 12h5v2h-5zm-6 3h2V8h3L6 4 2 8h3z"></path></svg>
                <svg v-else-if="header.column.getIsSorted() === 'desc'" class="inline" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: currentColor"><path d="m6 20 4-4H7V4H5v12H2zm5-12h9v2h-9zm0 4h7v2h-7zm0-8h11v2H11zm0 12h5v2h-5z"></path></svg>
              </div>
              <template
                v-if="!header.isPlaceholder && header.column.getCanFilter()"
              >
                <Filter :column="header.column" :table="table" />
              </template>
            </th>
          </tr>
        </thead>
        <tbody class="">
          <tr v-for="row in table.getRowModel().rows" :key="row.id" :class="{ 'opacity-30': rowVisibilityMap.get(row.id) === false }">
            <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="border-b border-oscuro-100 py-2 text-center align-middle">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="my-5">
      <div class="flex flex-wrap text-oscuro-300 items-center">
        <div class="info_selected w-1/6 ">Selected {{ Object.keys(rowSelection).length }} of {{ table.getRowCount() }} entries</div>
        <div class="controls w-4/6 flex justify-center items-center">
          <button 
            class="previous rotate-180 flex items-center p-2"
            :class="{'opacity-50': !table.getCanPreviousPage(), 'cursor-not-allowed': !table.getCanPreviousPage()}"
            @click="() => table.previousPage()"
            :disabled="!table.getCanPreviousPage()"
          >
            <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.43729 5.50039C7.43729 5.76706 7.32704 6.03372 7.10767 6.23685L2.60767 10.4035C2.16779 10.8108 1.45679 10.8108 1.01692 10.4035C0.577043 9.99622 0.577043 9.33789 1.01692 8.9306L4.73504 5.48789L1.15754 2.05768C0.726668 1.64206 0.739043 0.984766 1.18567 0.584766C1.63229 0.184766 2.34554 0.196225 2.77642 0.609766L7.12117 4.77643C7.33267 4.97956 7.43729 5.23997 7.43729 5.50039" fill="currentColor"/>
            </svg>
          </button>
          Page
          <input
            min="1"
            :max="table.getPageCount()"
            type="number"
            :value="table.getState().pagination.pageIndex + 1"
            @change="handleGoToPage"
            class="border p-1 rounded w-14 mx-2"
          />
          of
          {{ table.getPageCount() }}
          <button 
            class="next flex items-center p-2"
            :class="{'opacity-50': !table.getCanNextPage(), 'cursor-not-allowed': !table.getCanNextPage()}"
            @click="() => table.nextPage()"
            :disabled="!table.getCanNextPage()"
          >
            <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.43729 5.50039C7.43729 5.76706 7.32704 6.03372 7.10767 6.23685L2.60767 10.4035C2.16779 10.8108 1.45679 10.8108 1.01692 10.4035C0.577043 9.99622 0.577043 9.33789 1.01692 8.9306L4.73504 5.48789L1.15754 2.05768C0.726668 1.64206 0.739043 0.984766 1.18567 0.584766C1.63229 0.184766 2.34554 0.196225 2.77642 0.609766L7.12117 4.77643C7.33267 4.97956 7.43729 5.23997 7.43729 5.50039" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <div class="total w-1/6 ">
          Showing {{ table.getRowModel().rows.length }} of {{ table.getRowCount() }} entries
        </div>
      </div>
    </div>
  </div>
</template>