<template>
  <div v-if="visible" :class="messageClasses">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <Icon v-if="icon" :name="icon" class="mr-2 text-xl" />
        <p class="font-semibold">{{ message }}</p>
      </div>
      <button
        v-if="dismissible"
        @click="handleDismiss"
        class="ml-4 text-xl hover:opacity-70 transition-opacity"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
type MessageType = 'success' | 'error' | 'warning' | 'info'

interface Props {
  type: MessageType
  message: string
  dismissible?: boolean
  autoHide?: boolean
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  dismissible: false,
  autoHide: false,
  duration: 3000
})

const emit = defineEmits<{
  dismiss: []
}>()

const visible = ref(true)

const typeConfig = {
  success: {
    classes: 'bg-green-900 border-green-500 text-green-200',
    icon: 'material-symbols:check-circle'
  },
  error: {
    classes: 'bg-red-900 border-red-500 text-red-200',
    icon: 'material-symbols:error'
  },
  warning: {
    classes: 'bg-yellow-900 border-yellow-500 text-yellow-200',
    icon: 'material-symbols:warning'
  },
  info: {
    classes: 'bg-blue-900 border-blue-500 text-blue-200',
    icon: 'material-symbols:info'
  }
}

const messageClasses = computed(() => [
  'border rounded-lg p-4',
  typeConfig[props.type].classes
])

const icon = computed(() => typeConfig[props.type].icon)

const handleDismiss = () => {
  visible.value = false
  emit('dismiss')
}

if (props.autoHide) {
  setTimeout(() => {
    if (visible.value) {
      handleDismiss()
    }
  }, props.duration)
}
</script>