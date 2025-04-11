<script setup lang="ts">
interface Text_Card_autoProps {
  title: string;
  description: string;
}

const props = defineProps<Text_Card_autoProps>();
</script>

<template>
  <div class="text-card-auto">
    <h3 class="text-card-title">{{ title }}</h3>
    <p class="text-card-description">{{ description }}</p>
  </div>
</template>

<style scoped>
.text-card-auto {
  width: 288px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
  padding: 16px;
  margin: 30px 0;
}

.text-card-title {
  font-size: 16px;
  font-weight: bold;
  color: #165788;
  margin-bottom: 16px;
  line-height: 1.2;
}

.text-card-description {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.5;
  margin: 0;
}
</style> 