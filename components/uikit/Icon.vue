<script setup lang="ts">
import { computed } from 'vue'
import { icons } from '~/assets/icons'
const colorStore = useColorStore()

const props = defineProps<{
  name: keyof typeof icons,
  color?: string
}>()

const iconSvg = computed(() => {
  const svgRaw = icons[props.name];
  if (!svgRaw) return ''
  return svgRaw.replace(/--color-primary/g, props.color || `rgba(${colorStore.primary}, 1)`).replace(/--color-secondary/g, props.color || `rgba(${colorStore.secondary}, 1)`)
})
</script>
<template>
  <span v-html="iconSvg" class="container-icon-svg text-2xl"></span>
</template>
<style scoped>
.container-icon-svg :deep(svg) {
  width: 1em;
  height: 1em;
}
</style>
