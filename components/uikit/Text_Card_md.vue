<script setup lang="ts">
interface Text_Card_mdProps {
  totalSum: string;
  headerText: string;
}

const props = defineProps<Text_Card_mdProps>();
</script>

<template>
  <div class="text-card-md">
    <div class="text-card-content">
      <span class="text-card-header">{{ headerText }}</span>
      <span class="text-card-number">{{ totalSum }}</span>
    </div>
  </div>
</template>

<style scoped>
.text-card-md {
  height: 80px;
  border-radius: 8px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
  background-color: white;
  padding: 1rem;
}

.text-card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.text-card-header {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  line-height: 1;
}

.text-card-number {
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  line-height: 1;
}
</style> 