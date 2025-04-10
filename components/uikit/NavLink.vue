<script setup lang="ts">
import type { RouteLocationAsRelativeGeneric } from 'vue-router';
import type { icons } from '~/assets/icons';

interface LinkProps {
  label: string;
  icon?: keyof typeof icons;
  to?: RouteLocationAsRelativeGeneric;
  disabled?: boolean;
}

const route = useRoute()
const props = withDefaults(defineProps<LinkProps>(), {
  disabled: false
});
</script>
<template>
  <NuxtLink :to="props.to" class="text-[#403F41] w-full hover:no-underline bg-transparent flex items-center py-2 px-3 hover:bg-[#dbdbde] text-[20px]" exact-active-class="!bg-primary !text-white">
    <div v-if="props.icon" class="me-2"><UikitIcon :name="props.icon" :color="(props.to && route.name === props.to.name) ? 'currentColor' : undefined"></UikitIcon></div>
    <div class="flex-1 pt-1">{{ props.label }}</div>
  </NuxtLink>
</template>