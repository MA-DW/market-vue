<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  modelValue: boolean;
  disabled?: boolean;
  name?: string;
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
      @change="emit('update:modelValue', ($event!.target as HTMLInputElement).checked)"
      class="peer hidden"
      :name="name"
    />
    <div
      class="w-4 h-4 border border-[#838F9E] rounded-sm flex items-center justify-center peer-checked:bg-[#00AEEF] peer-checked:border-[#00AEEF]"
      :class="{ 'opacity-50': props.disabled }"
    >
      <svg v-if="props.modelValue" class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
  </label>
</template>
