<template>
  <div class="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
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
          <input
            id="minXp"
            v-model.number="searchFilters.minXp"
            type="number"
            min="1500"
            max="4000"
            :class="[
              'w-full px-4 py-3 rounded-lg bg-gray-700 border-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors',
              errors.minXp ? 'border-red-500' : 'border-gray-600'
            ]"
            placeholder="1500"
          />
          <p v-if="errors.minXp" class="text-red-400 text-sm mt-1">{{ errors.minXp }}</p>
        </div>
        
        <div>
          <label for="maxXp" class="block text-sm font-semibold text-gray-300 mb-2">
            XP上限値 <span class="text-red-400">*</span>
          </label>
          <input
            id="maxXp"
            v-model.number="searchFilters.maxXp"
            type="number"
            min="1500"
            max="4000"
            :class="[
              'w-full px-4 py-3 rounded-lg bg-gray-700 border-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors',
              errors.maxXp ? 'border-red-500' : 'border-gray-600'
            ]"
            placeholder="4000"
          />
          <p v-if="errors.maxXp" class="text-red-400 text-sm mt-1">{{ errors.maxXp }}</p>
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
        <button
          type="submit"
          :disabled="loading || !isValidRange"
          class="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <Icon name="eos-icons:loading" class="mr-2" />
            検索中...
          </span>
          <span v-else>🎯 検索実行</span>
        </button>
        
        <button
          type="button"
          @click="handleClear"
          :disabled="loading"
          class="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-lg hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          🗑️ クリア
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-900 border border-red-500 rounded-lg p-4">
        <p class="text-red-200 text-center">{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { TeamSearchFilters } from '~/types/team'

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