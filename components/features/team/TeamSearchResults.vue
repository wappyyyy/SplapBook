<template>
  <div>
    <!-- Results Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
        🎯 検索結果
      </h2>
      <div v-if="teams.length > 0" class="text-gray-400">
        <span class="font-semibold text-green-400">{{ teams.length }}</span> チーム見つかりました
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <Icon name="eos-icons:loading" class="text-4xl text-cyan-400 mb-4" />
        <p class="text-gray-400 font-semibold">チームを検索中...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-900 border border-red-500 rounded-2xl p-6">
      <div class="text-center">
        <Icon name="material-symbols:error" class="text-4xl text-red-400 mb-4" />
        <p class="text-red-200 font-semibold">{{ error }}</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="teams.length === 0 && !loading && !error" class="bg-gray-800 border border-gray-700 rounded-2xl p-8">
      <div class="text-center">
        <Icon name="material-symbols:search-off" class="text-6xl text-gray-500 mb-4" />
        <h3 class="text-xl font-bold text-gray-300 mb-2">チームが見つかりませんでした</h3>
        <p class="text-gray-400">
          検索条件を変更して再度お試しください。
        </p>
      </div>
    </div>

    <!-- Results Grid -->
    <div v-else class="space-y-6">
      <!-- Results Summary -->
      <div class="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-4 border border-green-500">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div class="flex items-center space-x-4">
            <span class="text-green-200 font-semibold">
              {{ teams.length }}チーム
            </span>
            <span class="text-gray-300">|</span>
            <span class="text-blue-200 font-semibold">
              平均XP範囲: {{ minAverageXp }} - {{ maxAverageXp }}
            </span>
          </div>
          <div class="text-sm text-gray-300">
            平均XP昇順で表示
          </div>
        </div>
      </div>

      <!-- Teams Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <TeamCard
          v-for="team in teams"
          :key="team.id"
          :team="team"
        />
      </div>

      <!-- Load More Section (Future enhancement) -->
      <div v-if="teams.length >= 20" class="text-center pt-6">
        <p class="text-gray-400 text-sm">
          20チーム以上の結果がある場合は、検索条件を絞り込むことをお勧めします。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Team } from '~/types/team'
import TeamCard from './TeamCard.vue'

interface Props {
  teams: readonly Team[]
  loading: boolean
  error?: string | null
}

const props = defineProps<Props>()

const minAverageXp = computed(() => {
  if (props.teams.length === 0) return 0
  return Math.min(...props.teams.map(team => team.averageXp))
})

const maxAverageXp = computed(() => {
  if (props.teams.length === 0) return 0
  return Math.max(...props.teams.map(team => team.averageXp))
})
</script>