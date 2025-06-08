<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
type CardVariant = 'default' | 'gradient' | 'bordered'

interface Props {
  variant?: CardVariant
  hoverable?: boolean
  padding?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  hoverable: false,
  padding: 'p-6'
})

const baseClasses = 'rounded-2xl shadow-xl border'

const variantClasses = {
  default: 'bg-gray-800 border-gray-700',
  gradient: 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700',
  bordered: 'bg-gray-800 border-purple-500'
}

const hoverClasses = 'hover:border-purple-500 transition-all duration-300 transform hover:scale-105'

const cardClasses = computed(() => [
  baseClasses,
  variantClasses[props.variant],
  props.padding,
  props.hoverable ? hoverClasses : ''
])
</script>