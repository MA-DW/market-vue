<script setup lang="ts">
import { computed } from 'vue';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  background?: 'light' | 'dark';
  outline?: boolean;
  text?: string;
};

const props = defineProps<ButtonProps>();
const attrs = useAttrs();

const type = computed(() => props.variant || 'primary')
const bg = computed(() => props.background || 'light')

const baseClasses = 'box-border px-5 py-2.5 rounded flex items-center justify-center gap-2 text-lg font-normal border active:shadow-inset h-[40px]';
const disabledClasses = 'box-border px-5 py-2.5 rounded flex items-center justify-center gap-2 text-lg font-normal border opacity-50 cursor-not-allowed text-disable-100 bg-terciary-200';
const outlineClasses = computed(() => (props.outline
  ? (type.value === 'primary' ? `${bg.value === 'light' ? 'border-secondary text-primary hover:text-white hover:bg-secondary' : 'border-white text-white hover:text-primary hover:bg-white'}` : `${bg.value === 'light' ? 'border-secondary-200 text-primary hover:bg-secondary-100 active:bg-secondary-200' : 'border-secondary-200 text-white hover:bg-secondary-100 active:bg-secondary-200'}`) 
  : (type.value === 'primary' ? `border-transparent bg-secondary text-white` : `${bg.value === 'light' ? 'text-primary bg-primary-100 active:text-white active:bg-primary' : 'text-white bg-primary-100 active:text-white active:bg-primary'}`))
);

const classes = computed(() => {
  if ('disabled' in attrs) {
    return [disabledClasses];
  }
  return [
    baseClasses,
    outlineClasses.value,
  ]
})
</script>

<template>
  <button :class="classes">
    <slot v-if="$slots.default"></slot>
    <template v-else>
      <slot name="icon" v-if="$slots.icon"></slot>
      <span v-if="text">{{ text }}</span>
    </template>
  </button>
</template>
