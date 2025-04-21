<script setup lang="ts">
import { computed } from 'vue';

interface InputProps {
  // Required props
  modelValue: string | number; // value
  label?: string;
  name: string;
  placeholder?: string;
  // Optional props
  type?: 'text' | 'number';
  disabled?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = props.type === 'number' ? Number(target.value) : target.value;
  emit('update:modelValue', value);
};

const baseClasses = 'relative w-full font-normal text-base';
const labelClasses = 'block mb-1 text-sm font-medium text-oscuro';
const inputClasses = computed(() => [
  // Base classes
  'w-full h-[40px] px-3 rounded transition-all duration-200 focus:outline-none',
  
  // Estados específicos
  {
    // Estado de error
    'border border-[#C91038]': props.error,
    // Estado deshabilitado
    'bg-[#F3F4F6] text-[#67707A] text-opacity-30 border border-[#838F9E] border-opacity-40 cursor-not-allowed': props.disabled,
    // Estado normal y activo (si no hay error ni está deshabilitado)
    'border border-[#838F9E] border-opacity-40 focus:border-[#00AEEF] focus:border-[1.5px] focus:shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.25)]': !props.error && !props.disabled
  }
]);

const errorClasses = 'mt-1 text-sm text-[#C91038]';
</script>

<template>
  <div :class="baseClasses">
    <label 
      v-if="label"
      :for="name"
      :class="labelClasses"
    >
      {{ label }}
    </label>
    
    <div class="relative">
      <input
        :id="name"
        :name="name"
        :type="type"
        :value="modelValue"
        :disabled="disabled"
        :class="inputClasses"
        @input="updateValue"
        :placeholder="placeholder"
      />
    </div>

    <p 
      v-if="error"
      :class="errorClasses"
    >
      {{ error }}
    </p>
  </div>
</template> 