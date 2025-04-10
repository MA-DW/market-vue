<script setup lang="ts">
import { ref, computed } from 'vue';

interface Option {
  label: string;
  value: any;
}

interface SelectProps {
  modelValue?: any;
  data: Option[];
  label?: string;
  name?: string;
  empty?: string;
  disabled?: boolean;
  error?: string;
}

const props = defineProps<SelectProps>();
const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectedOption = computed(() => props.data.find(opt => opt.value === props.modelValue));
const hasError = computed(() => !!props.error);

const toggleSelect = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value);
  isOpen.value = false;
};

const clearSelection = (event: Event) => {
  event.stopPropagation();
  emit('update:modelValue', null);
};

const baseClasses = 'relative w-full font-normal text-base';
const labelClasses = 'block mb-1 text-sm font-medium text-oscuro';
const triggerClasses = computed(() => [
  'w-full h-[40px] px-3 flex items-center justify-between rounded transition-all duration-200',
  'border',
  {
    'border-[#C91038]': hasError.value,
    'bg-[#F3F4F6] text-[#67707A] cursor-not-allowed border-[#838F9E] border-opacity-40': props.disabled,
    'border-[#838F9E] border-opacity-40 focus:border-[#00AEEF] focus:border-[1.5px] focus:shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.25)]': !hasError.value && !props.disabled,
    'border-[#00AEEF] border-[1.5px] shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.25)]': isOpen.value && !hasError.value && !props.disabled
  }
]);

const dropdownClasses = 'absolute w-full mt-1 bg-white border border-[#838F9E] rounded-md shadow-md z-50';
const optionClasses = 'px-3 py-2 cursor-pointer hover:bg-secondary-100';
const clearButtonClasses = 'absolute right-8 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary-100 rounded-full transition-colors duration-200';
const errorClasses = 'mt-1 text-sm text-[#C91038]';
</script>

<template>
  <div :class="baseClasses">
    <label v-if="label" :for="name" :class="labelClasses">{{ label }}</label>
    <div class="relative">
      <div 
        :id="name"
        :class="triggerClasses"
        @click="toggleSelect"
      >
        <span>
          {{ selectedOption?.label || empty || 'Seleccione una opción' }}
        </span>
        <div class="flex items-center">
          <button 
            v-if="selectedOption && !disabled"
            type="button"
            :class="clearButtonClasses"
            @click="clearSelection"
            title="Limpiar selección"
          >
            <svg 
              class="w-4 h-4 text-oscuro-300"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <svg 
            class="w-5 h-5"
            :class="{ 'transform rotate-180': isOpen }"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div 
        v-if="isOpen && !disabled" 
        :class="dropdownClasses"
      >
        <div 
          v-for="option in data" 
          :key="option.value"
          :class="[
            optionClasses,
            { 'bg-secondary-100': option.value === modelValue }
          ]"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </div>

    <p 
      v-if="error"
      :class="errorClasses"
    >
      {{ error }}
    </p>
  </div>
</template> 