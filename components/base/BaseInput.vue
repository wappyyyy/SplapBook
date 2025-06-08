<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-semibold text-gray-300 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-400">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :maxlength="maxlength"
      :disabled="disabled"
      :class="inputClasses"
      @input="handleInput"
      @blur="handleBlur"
    />
    <p v-if="error" class="text-red-400 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
type InputSize = 'sm' | 'md' | 'lg'

interface Props {
  id?: string
  type?: 'text' | 'number' | 'email' | 'password'
  modelValue?: string | number
  label?: string
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  min?: string | number
  max?: string | number
  maxlength?: number
  size?: InputSize
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
}>()

const baseClasses = 'w-full rounded bg-gray-600 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors'
const errorClasses = 'border-red-500'
const normalClasses = 'border-gray-500'
const focusClasses = 'focus:ring-cyan-500'

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-3 py-2',
  lg: 'px-4 py-3 text-lg'
}

const inputClasses = computed(() => [
  baseClasses,
  props.error ? errorClasses : normalClasses,
  focusClasses,
  sizeClasses[props.size]
])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>