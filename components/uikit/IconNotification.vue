<script setup lang="ts">
interface PropsIconNotification {
  name: 'favorite' | 'notification' | 'configuration'
}
const props = defineProps<PropsIconNotification>()
</script>
<template>
  <button class="bg-white w-10 h-10 shadow-[0px_2px_4px_0px_rgb(0_0_0_/_.15)] flex justify-center items-center rounded-full active:ring-2">
    <UikitIcon :name="name" />
  </button>
</template>