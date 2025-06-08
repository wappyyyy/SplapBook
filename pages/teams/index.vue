<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          🦑 スプラトゥーン固定チーム管理
        </h1>
        <p class="text-gray-400 text-lg">
          チームを登録して、XP範囲で検索できます
        </p>
      </header>
      
      <!-- Team Registration Section -->
      <section class="mb-12">
        <TeamRegistrationForm @team-created="handleTeamCreated" />
      </section>
      
      <!-- Team Search Section -->  
      <section class="mb-8">
        <TeamSearchForm @search="handleSearch" @clear="handleClear" />
      </section>
      
      <!-- Search Results -->
      <section>
        <TeamSearchResults 
          :teams="searchResults as Team[]" 
          :loading="searchLoading"
          :error="searchError"
        />
      </section>
    </div>

    <!-- Success Toast -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="showSuccessToast"
        class="fixed top-4 right-4 bg-green-900 border border-green-500 rounded-lg p-4 shadow-xl z-50 max-w-sm"
      >
        <div class="flex items-center">
          <Icon name="material-symbols:check-circle" class="text-green-400 text-2xl mr-3" />
          <div>
            <p class="text-green-200 font-semibold">チーム登録完了！</p>
            <p class="text-green-300 text-sm">{{ lastCreatedTeam?.name }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { TeamSearchFilters, Team } from '~/types/team'
import TeamRegistrationForm from '~/components/features/team/TeamRegistrationForm.vue'
import TeamSearchForm from '~/components/features/team/TeamSearchForm.vue'
import TeamSearchResults from '~/components/features/team/TeamSearchResults.vue'

// Meta
useHead({
  title: 'スプラトゥーン固定チーム管理',
  meta: [
    {
      name: 'description',
      content: 'スプラトゥーンの固定チームを登録・検索できるWebアプリケーションです。XP範囲でチームを検索し、適切なメンバーを見つけましょう。'
    }
  ]
})

// Composables
const { results: searchResults, loading: searchLoading, error: searchError } = useTeamSearch()


// State
const showSuccessToast = ref(false)
const lastCreatedTeam = ref<any>(null)

// Event Handlers
const handleTeamCreated = (team: any) => {
  lastCreatedTeam.value = team
  showSuccessToast.value = true
  
  // Auto hide toast after 3 seconds
  setTimeout(() => {
    showSuccessToast.value = false
  }, 3000)
}

const handleSearch = (filters: TeamSearchFilters) => {
  // Search is handled automatically by the TeamSearchForm component
  console.log('Searching with filters:', filters)
}

const handleClear = () => {
  console.log('Search cleared')
}

// Lifecycle
onMounted(() => {
  // Any initialization logic if needed
})
</script>

<style scoped>
/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500;
}

/* Smooth animations */
.container {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive improvements */
@media (max-width: 640px) {
  .container {
    @apply px-2;
  }
}
</style>