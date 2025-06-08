<template>
  <BaseCard variant="gradient" :hoverable="true">
    <!-- Team Header -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold text-white truncate">
        {{ team.name }}
      </h3>
      <div class="flex items-center space-x-2">
        <span class="text-sm font-medium text-gray-400">平均XP</span>
        <span class="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-full">
          {{ team.averageXp }}
        </span>
      </div>
    </div>

    <!-- Team Members -->
    <div class="space-y-3">
      <h4 class="text-sm font-semibold text-cyan-400 mb-2">👥 メンバー</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          v-for="member in sortedMembers"
          :key="member.id"
          class="bg-gray-700 rounded-lg p-3 border border-gray-600"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {{ member.memberPosition }}
              </span>
              <span class="font-semibold text-white truncate">
                {{ member.playerName }}
              </span>
            </div>
            <span class="text-sm font-bold text-purple-300">
              {{ member.xpScore }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Info Footer -->
    <div class="mt-4 pt-4 border-t border-gray-600">
      <div class="flex items-center justify-between text-sm text-gray-400">
        <span>
          🕒 {{ formatDate(team.createdAt) }}
        </span>
        <div class="flex items-center space-x-1">
          <span>XP範囲:</span>
          <span class="font-semibold text-gray-300">
            {{ minXp }} - {{ maxXp }}
          </span>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import type { Team } from '~/types/team'
import BaseCard from '~/components/base/BaseCard.vue'

interface Props {
  team: Team
}

const props = defineProps<Props>()

const sortedMembers = computed(() => {
  return [...props.team.teamMembers].sort((a, b) => a.memberPosition - b.memberPosition)
})

const minXp = computed(() => {
  return Math.min(...props.team.teamMembers.map(m => m.xpScore))
})

const maxXp = computed(() => {
  return Math.max(...props.team.teamMembers.map(m => m.xpScore))
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>