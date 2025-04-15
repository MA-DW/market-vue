<script lang="ts" setup>
import type { Column, Table } from '@tanstack/vue-table'
import { computed, type PropType } from 'vue'
import DebouncedInput from './DebounceInput.vue'
const props = defineProps({
  column: {
    type: Object as PropType<Column<any, unknown>>,
    required: true,
  },
  table: {
    type: Object as PropType<Table<any>>,
    required: true,
  },
})
const firstValue = computed(() =>
  props.table.getPreFilteredRowModel().flatRows[0]?.getValue(props.column.id)
)
const columnFilterValue = computed(() => props.column.getFilterValue())
const sortedUniqueValues = computed(() =>
  typeof firstValue.value === 'number'
    ? []
    : Array.from(props.column.getFacetedUniqueValues().keys()).sort()
)
</script>

<template>
  <DebouncedInput
    type="text"
    :modelValue="((columnFilterValue ?? '') as string)"
    @update:modelValue="value => column.setFilterValue(value)"
    :placeholder="`Search...`"
    class="w-36 border shadow rounded"
  />
</template>
