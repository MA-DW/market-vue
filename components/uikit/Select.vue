<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core';

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
  multiple?: boolean;
  showSelectAll?: boolean;
  searchable?: boolean;
}

const props = withDefaults(defineProps<SelectProps>(), {
  searchable: true
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectRef = ref(null);
const triggerRef = ref(null);
const searchInputRef = ref(null);
const searchQuery = ref('');

onClickOutside(selectRef, () => {
  isOpen.value = false;
});

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.data;
  const query = searchQuery.value.toLowerCase();
  return props.data.filter(option => 
    option.label.toLowerCase().includes(query)
  );
});

const selectedOptions = computed(() => {
  if (props.multiple) {
    return props.data.filter(opt => Array.isArray(props.modelValue) && props.modelValue.includes(opt.value));
  }
  return props.data.find(opt => opt.value === props.modelValue) ? [props.data.find(opt => opt.value === props.modelValue)] : [];
});

const hasError = computed(() => !!props.error);
const displayValue = computed(() => {
  if (selectedOptions.value.length === 0) return props.empty || 'Seleccione una opción';
  if (props.multiple) {
    if (selectedOptions.value.length === props.data.length) return 'Todos seleccionados';
    return selectedOptions.value.length === 1 
      ? selectedOptions.value[0].label 
      : `${selectedOptions.value.length} elementos seleccionados`;
  }
  return selectedOptions.value[0].label;
});

const isAllSelected = computed(() => {
  return props.multiple && Array.isArray(props.modelValue) && props.modelValue.length === props.data.length;
});

const toggleSelect = async () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      searchQuery.value = '';
      await nextTick();
      if (searchInputRef.value) {
        searchInputRef.value.focus();
      }
    }
  }
};

const selectOption = (option: Option) => {
  if (props.multiple) {
    const currentValue = Array.isArray(props.modelValue) ? props.modelValue : [];
    const newValue = currentValue.includes(option.value)
      ? currentValue.filter(v => v !== option.value)
      : [...currentValue, option.value];
    emit('update:modelValue', newValue);
  } else {
    emit('update:modelValue', option.value);
    isOpen.value = false;
  }
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    emit('update:modelValue', []);
  } else {
    emit('update:modelValue', props.data.map(opt => opt.value));
  }
};

const clearSelection = (event: Event) => {
  event.stopPropagation();
  emit('update:modelValue', props.multiple ? [] : null);
};

const isSelected = (option: Option) => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(option.value);
  }
  return option.value === props.modelValue;
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

const searchClasses = 'w-full h-full px-3 focus:outline-none bg-transparent';
const dropdownClasses = 'absolute w-full mt-1 bg-white border border-[#838F9E] rounded-md shadow-md z-50 max-h-60 overflow-y-auto';
const optionClasses = 'px-3 py-2 cursor-pointer hover:bg-secondary-100';
const selectAllClasses = 'px-3 py-2 cursor-pointer hover:bg-secondary-100 border-b border-[#838F9E] border-opacity-40 font-medium';
const clearButtonClasses = 'absolute right-8 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary-100 rounded-full transition-colors duration-200';
const errorClasses = 'mt-1 text-sm text-[#C91038]';
</script>

<template>
  <div :class="baseClasses" ref="selectRef">
    <label v-if="label" :for="name" :class="labelClasses">{{ label }}</label>
    <div class="relative">
      <div 
        :id="name"
        :class="triggerClasses"
        @click="toggleSelect"
        ref="triggerRef"
        tabindex="0"
      >
        <div class="flex-1 flex items-center">
          <template v-if="!isOpen || !searchable">
            <span class="truncate">
              {{ displayValue }}
            </span>
          </template>
          <template v-else>
            <input
              ref="searchInputRef"
              v-model="searchQuery"
              type="text"
              :class="searchClasses"
              placeholder="Buscar..."
              @click.stop
            />
          </template>
        </div>
        <div class="flex items-center">
          <button 
            v-if="selectedOptions.length > 0 && !disabled"
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
        <!-- Opción Seleccionar todos -->
        <div 
          v-if="multiple && showSelectAll"
          :class="selectAllClasses"
          @click="toggleSelectAll"
        >
          <div class="flex items-center">
            <svg 
              v-if="isAllSelected"
              class="w-4 h-4 mr-2 text-primary"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span v-else class="w-4 h-4 mr-2"></span>
            Seleccionar todos
          </div>
        </div>

        <!-- Opciones normales -->
        <div 
          v-for="option in filteredOptions" 
          :key="option.value"
          :class="[
            optionClasses,
            { 'bg-secondary-100': isSelected(option) }
          ]"
          @click="selectOption(option)"
        >
          <div class="flex items-center">
            <svg 
              v-if="isSelected(option)"
              class="w-4 h-4 mr-2 text-primary"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span v-else class="w-4 h-4 mr-2"></span>
            {{ option.label }}
          </div>
        </div>

        <!-- Mensaje cuando no hay resultados -->
        <div v-if="filteredOptions.length === 0" class="px-3 py-2 text-oscuro-300">
          No se encontraron resultados
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