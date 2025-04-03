<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue?: string,
  disabled?: boolean,
  placeholder?: string
  error?: string,
}>();
const emit = defineEmits(['update:modelValue']);

const hasError = computed(() => !!props.error)

const inputClasses = computed(() => {
  return [
    'w-full pl-10 pr-4 py-2 rounded text-gray-700 focus:outline-none border',
    props.disabled
      ? 'bg-[#F3F4F6] text-[#67707A] cursor-not-allowed'
      : hasError.value
      ? 'border-[#C91038]'
      : 'border-[rgb(131 142 158 / .4)] focus:border-[#00AEEF] focus:border-[1.5px] focus:shadow-[inset_2px_2px_4px_0_rgb(0_0_0_/_0.25)]',
  ];
});
</script>

<template>
  <div class="relative w-full h-10">
    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" :class="{'opacity-50': props.disabled}">
      <UikitIcon name="search"></UikitIcon>
    </span>
    <input
      :class="inputClasses"
      :value="modelValue"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event!.target as HTMLInputElement).value)"
      type="text"
      :placeholder="placeholder"
    />
    <p v-if="hasError" class="text-[#C91038] text-sm mt-1 text-right">{{ error }}</p>
  </div>
</template>
