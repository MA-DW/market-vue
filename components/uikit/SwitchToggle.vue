<template>
  <div class="flex items-center justify-center space-x-2">
    <span
      v-if="labelLeft"
      :class="[
        'text-sm font-semibold transition-colors',
        modelValue ? textColorEnabled : textColorDisabled
      ]"
    >
      {{ labelLeft }}
    </span>

    <button
      @click="toggle"
      class="relative inline-flex h-6 w-12 items-center rounded-full bg-white shadow-inner transition-colors duration-300 border"
    >
      <span
        :class="[
          'inline-block h-5 w-5 transform rounded-full transition-transform duration-300 bg-secondary',
          modelValue ? 'translate-x-1' : 'translate-x-6',
        ]"
      ></span>
    </button>

    <span
      v-if="labelRight"
      :class="[
        'text-sm font-semibold transition-colors',
        modelValue ? textColorDisabled : textColorEnabled
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
  labelRight?: string;
  theme?: 'dark' | 'light'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const schema = computed(() => props.theme ?? 'light')

const textColorEnabled = computed(() => schema.value === 'light' ? 'text-white' : 'text-oscuro-300')
const textColorDisabled = computed(() => schema.value === 'light' ? 'text-white/30' : 'text-oscuro-100')

function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>
