<script setup lang="ts">
const checked = ref(false)
</script>
<template>
  <h1>Checkbox {{ checked}}</h1>
  <div class="w-3/12 p-3">
    <UikitCheckbox v-model="checked">Label</UikitCheckbox>
    <br>
    <UikitCheckbox v-model="checked" disabled>Label</UikitCheckbox>
    <br>
  </div>

  <div class="w-3/12 p-3 bg-primary">
    <UikitCheckbox v-model="checked" type="dark">Label</UikitCheckbox>
    <br>
    <UikitCheckbox v-model="checked" type="dark" disabled>Label</UikitCheckbox>
    <br>
  </div>
</template>