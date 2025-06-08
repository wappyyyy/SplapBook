<template>
  <BaseCard>
    <h2 class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
      🔍 チーム検索
    </h2>
    
    <form @submit.prevent="handleSearch" class="space-y-6">
      <!-- XP Range -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="minXp" class="block text-sm font-semibold text-gray-300 mb-2">
            XP下限値 <span class="text-red-400">*</span>
          </label>
          <BaseInput
            id="minXp"
            v-model="searchFilters.minXp"
            type="number"
            :min="1500"
            :max="4000"
            placeholder="1500"
            :error="errors.minXp"
            size="lg"
          />
        </div>
        
        <div>
          <label for="maxXp" class="block text-sm font-semibold text-gray-300 mb-2">
            XP上限値 <span class="text-red-400">*</span>
          </label>
          <BaseInput
            id="maxXp"
            v-model="searchFilters.maxXp"
            type="number"
            :min="1500"
            :max="4000"
            placeholder="4000"
            :error="errors.maxXp"
            size="lg"
          />
        </div>
      </div>

      <!-- XP Range Display -->
      <div v-if="isValidRange" class="bg-gradient-to-r from-cyan-900 to-blue-900 rounded-lg p-4 border border-cyan-500">
        <div class="flex items-center justify-center">
          <span class="text-lg font-semibold text-cyan-200">
            検索範囲: {{ searchFilters.minXp }} ～ {{ searchFilters.maxXp }} XP
          </span>
        </div>
      </div>

      <!-- Search Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <BaseButton
          type="submit"
          :disabled="!isValidRange"
          :loading="loading"
          loading-text="検索中..."
          variant="secondary"
          @click="handleSearch"
        >
          🎯 検索実行
        </BaseButton>
        
        <BaseButton
          type="button"
          :disabled="loading"
          variant="secondary"
          class="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 focus:ring-gray-500"
          @click="handleClear"
        >
          🗑️ クリア
        </BaseButton>
      </div>

      <!-- Error Message -->
      <BaseMessage
        v-if="error"
        type="error"
        :message="error"
        dismissible
      />
    </form>
  </BaseCard>
</template>

<script setup lang="ts">
import type { TeamSearchFilters } from '~/types/team'
import BaseCard from '~/components/base/BaseCard.vue'
import BaseInput from '~/components/base/BaseInput.vue'
import BaseButton from '~/components/base/BaseButton.vue'
import BaseMessage from '~/components/base/BaseMessage.vue'

const emit = defineEmits<{
  search: [filters: TeamSearchFilters]
  clear: []
}>()

const { searchTeams, loading, error, clearResults } = useTeamSearch()

const searchFilters = ref<TeamSearchFilters>({
  minXp: 1500,
  maxXp: 4000
})

const errors = ref<Record<string, string>>({})

const isValidRange = computed(() => {
  return searchFilters.value.minXp >= 1500 &&
         searchFilters.value.maxXp <= 4000 &&
         searchFilters.value.minXp <= searchFilters.value.maxXp
})

const validateFilters = () => {
  errors.value = {}

  if (!searchFilters.value.minXp || searchFilters.value.minXp < 1500 || searchFilters.value.minXp > 4000) {
    errors.value.minXp = 'XP下限値は1500から4000の間で入力してください'
  }

  if (!searchFilters.value.maxXp || searchFilters.value.maxXp < 1500 || searchFilters.value.maxXp > 4000) {
    errors.value.maxXp = 'XP上限値は1500から4000の間で入力してください'
  }

  if (searchFilters.value.minXp && searchFilters.value.maxXp && searchFilters.value.minXp > searchFilters.value.maxXp) {
    errors.value.maxXp = 'XP上限値は下限値以上で入力してください'
  }

  return Object.keys(errors.value).length === 0
}

const handleSearch = async () => {
  if (!validateFilters()) {
    return
  }

  try {
    await searchTeams(searchFilters.value)
    emit('search', searchFilters.value)
  } catch (err) {
    console.error('Search failed:', err)
  }
}

const handleClear = () => {
  searchFilters.value = {
    minXp: 1500,
    maxXp: 4000
  }
  errors.value = {}
  clearResults()
  emit('clear')
}

// Watch for changes to update validation
watch(searchFilters, () => {
  if (Object.keys(errors.value).length > 0) {
    validateFilters()
  }
}, { deep: true })
</script>