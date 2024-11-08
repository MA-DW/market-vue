<template>
  <div 
    :class="[
      'loading-overlay',
      { 'full-page': fullPage },
      { 'with-backdrop': showBackdrop }
    ]" 
    v-if="active"
  >
    <div class="loading-content">
      <div :class="['spinner', `spinner-${type}`]">
        <!-- Spinner Circular -->
        <template v-if="type === 'circular'">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </template>

        <!-- Spinner de Puntos -->
        <template v-else-if="type === 'dots'">
          <div class="loading-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </template>

        <!-- Spinner de Pulso -->
        <template v-else-if="type === 'pulse'">
          <div class="loading-pulse"></div>
        </template>
      </div>

      <div v-if="text" :class="['loading-text', `text-${size}`]">
        {{ text }}
        <div v-if="showProgress" class="progress-text">
          {{ progress }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: true
  },
  text: {
    type: String,
    default: 'Loading data...'
  },
  fullPage: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'circular',
    validator: (value) => ['circular', 'dots', 'pulse'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  showBackdrop: {
    type: Boolean,
    default: true
  },
  showProgress: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.loading-overlay {
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.with-backdrop {
  background-color: rgba(255, 255, 255, 0.9);
}

.loading-content {
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
}

/* Estilos para el spinner circular */
.spinner-border {
  width: 3rem;
  height: 3rem;
  color: #175689;
}

/* Estilos para el spinner de puntos */
.loading-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.dot {
  width: 1rem;
  height: 1rem;
  background-color: #175689;
  border-radius: 50%;
  animation: bounce 0.5s infinite alternate;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

/* Estilos para el spinner de pulso */
.loading-pulse {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #175689;
  animation: pulse 1.5s infinite;
}

/* Estilos de texto según tamaño */
.loading-text {
  margin-top: 1rem;
  color: #175689;
  font-weight: 500;
}

.text-sm {
  font-size: 0.875rem;
}

.text-md {
  font-size: 1rem;
}

.text-lg {
  font-size: 1.25rem;
}

.progress-text {
  font-size: 0.875rem;
  margin-top: 0.5rem;
  color: #666;
}

.full-page {
  position: fixed;
  z-index: 9999;
}

/* Animaciones */
@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-0.5rem);
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
}
</style>