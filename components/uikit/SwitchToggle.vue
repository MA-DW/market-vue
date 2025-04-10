<template>
  <div class="flex items-center space-x-2">
    <span
      v-if="labelLeft"
      :class="[
        'text-sm font-semibold transition-colors',
        modelValue ? 'text-white' : 'text-white/80'
      ]"
    >
      {{ labelLeft }}
    </span>

    <button
      @click="toggle"
      class="relative inline-flex h-6 w-12 items-center rounded-full bg-white shadow-inner transition-colors duration-300"
    >
      <span
        :class="[
          'inline-block h-5 w-5 transform rounded-full bg-blue-700 transition-transform duration-300',
          modelValue ? 'translate-x-1' : 'translate-x-6'
        ]"
      />
    </button>

    <span
      v-if="labelRight"
      :class="[
        'text-sm font-semibold transition-colors',
        modelValue ? 'text-white/80' : 'text-white'
      ]"
    >
      {{ labelRight }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  labelLeft?: string
  labelRight?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>
