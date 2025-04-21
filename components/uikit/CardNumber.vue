<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  title?: string;
  text?: string | number;
  value?: string | number;
  size?: 'lg' | 'md';
}
const props = defineProps<Props>();
const length = computed(() => props.size || 'lg')
</script>

<template>
  <div
    :class="[
      'bg-white rounded-lg shadow-[0px_10px_30px_0px_rgba(0,0,0,.05)] flex items-center',
      length === 'lg' ? 'h-[117px] px-[45px] py-[25px]': 'h-[80px] px-[20px] py-[16px]',
    ]"
  >
    <div class="text-[60px] font-bold text-black" v-if="length === 'lg' && (typeof value !== 'undefined' || $slots.value)"><slot name="value">{{ value }}</slot></div>
    <div class="ml-4">
      <div class="text-oscuro-300 text-base"><slot name="title">{{ title }}</slot></div>
      <div class="text-black font-black text-[20px]"><slot name="text">{{ text }}</slot></div>
    </div>
  </div>
</template>
