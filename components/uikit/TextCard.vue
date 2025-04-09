<script setup lang="ts">
interface TextCardProps {
  title: string;
  headerText?: string;
  description?: string;
}

const props = defineProps<TextCardProps>();
</script>

<template>
  <div class="text-card">
    <div class="text-card-number">
      {{ title }}
    </div>
    <div class="text-card-content">
      <div class="text-card-text">
        <span class="text-card-header">{{ headerText || 'Card title/name/header' }}</span>
        <span class="text-card-description">{{ description || '000,000,000' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-card {
  height: 117px;
  border-radius: 8px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  gap: 2rem;
}

.text-card-number {
  font-size: 48px;
  font-weight: bold;
  color: #000000;
  line-height: 1;
}

.text-card-content {
  flex: 1;
}

.text-card-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.text-card-header {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}

.text-card-description {
  font-size: 16px;
  color: #000000;
}
</style> 