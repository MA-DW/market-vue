<script setup lang="ts">
interface TextCardProps {
  title?: string;
  subtitle?: string;
  header?: string;
}

const props = defineProps<TextCardProps>();
</script>

<template>
  <div class="text-card">
    <div class="text-card-content">
      <div class="text-card-header" v-if="header">
        {{ header }}
      </div>
      <div class="text-card-body">
        <h3 class="text-card-title" v-if="title">{{ title }}</h3>
        <p class="text-card-subtitle" v-if="subtitle">{{ subtitle }}</p>
        <slot></slot>
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
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.text-card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.text-card-header {
  font-size: 0.875rem;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
}

.text-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.text-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary);
  margin: 0;
}

.text-card-subtitle {
  font-size: 1rem;
  color: var(--color-secondary);
  margin: 0;
}
</style> 