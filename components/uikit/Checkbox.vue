<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  modelValue: boolean;
  disabled?: boolean;
  name?: string;
  indeterminate?: boolean
  type?: 'light' | 'dark'
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();
const bg = computed(() => props.type || 'light')
</script>
<template>
  <label class="flex items-center space-x-2 cursor-pointer" :class="{ '!cursor-not-allowed': props.disabled }">
    <span :class="bg === 'light' ? 'text-black' : 'text-white'"><slot></slot></span>
    <input
      type="checkbox"
      :checked="props.modelValue"
      :disabled="props.disabled"
      :indeterminate="props.indeterminate"
      @change="emit('update:modelValue', ($event!.target as HTMLInputElement).checked)"
      :name="name"
    />
  </label>
</template>
