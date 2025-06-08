<template>
  <div class="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
    <h2 class="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-6">
      🦑 チーム登録
    </h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Team Name -->
      <div>
        <label for="teamName" class="block text-sm font-semibold text-gray-300 mb-2">
          チーム名 <span class="text-red-400">*</span>
        </label>
        <input
          id="teamName"
          v-model="formData.name"
          type="text"
          :class="[
            'w-full px-4 py-3 rounded-lg bg-gray-700 border-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors',
            errors.name ? 'border-red-500' : 'border-gray-600'
          ]"
          placeholder="チーム名を入力してください"
          maxlength="50"
        />
        <p v-if="errors.name" class="text-red-400 text-sm mt-1">{{ errors.name }}</p>
      </div>

      <!-- Team Members -->
      <div>
        <h3 class="text-lg font-semibold text-gray-300 mb-4">
          メンバー情報 <span class="text-red-400">*</span>
        </h3>
        <div class="space-y-4">
          <div
            v-for="(member, index) in formData.members"
            :key="index"
            class="bg-gray-700 rounded-lg p-4 border border-gray-600"
          >
            <h4 class="text-sm font-semibold text-cyan-400 mb-3">
              メンバー {{ index + 1 }}
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label :for="`playerName${index}`" class="block text-sm font-medium text-gray-300 mb-1">
                  プレイヤー名 <span class="text-red-400">*</span>
                </label>
                <input
                  :id="`playerName${index}`"
                  v-model="member.playerName"
                  type="text"
                  :class="[
                    'w-full px-3 py-2 rounded bg-gray-600 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors',
                    errors[`member${index}Name`] ? 'border-red-500' : 'border-gray-500'
                  ]"
                  placeholder="プレイヤー名"
                  maxlength="20"
                />
                <p v-if="errors[`member${index}Name`]" class="text-red-400 text-xs mt-1">
                  {{ errors[`member${index}Name`] }}
                </p>
              </div>
              <div>
                <label :for="`xpScore${index}`" class="block text-sm font-medium text-gray-300 mb-1">
                  XP値 <span class="text-red-400">*</span>
                </label>
                <input
                  :id="`xpScore${index}`"
                  v-model.number="member.xpScore"
                  type="number"
                  min="1500"
                  max="4000"
                  :class="[
                    'w-full px-3 py-2 rounded bg-gray-600 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors',
                    errors[`member${index}Xp`] ? 'border-red-500' : 'border-gray-500'
                  ]"
                  placeholder="1500-4000"
                />
                <p v-if="errors[`member${index}Xp`]" class="text-red-400 text-xs mt-1">
                  {{ errors[`member${index}Xp`] }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Average XP Display -->
      <div v-if="averageXp > 0" class="bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg p-4 border border-purple-500">
        <div class="flex items-center justify-between">
          <span class="text-lg font-semibold text-purple-200">平均XP</span>
          <span class="text-2xl font-bold text-purple-100">{{ averageXp }}</span>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <button
          type="submit"
          :disabled="loading || !isFormValid"
          class="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold rounded-lg hover:from-pink-600 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          <span v-if="loading" class="flex items-center">
            <Icon name="eos-icons:loading" class="mr-2" />
            登録中...
          </span>
          <span v-else>🎯 チーム登録</span>
        </button>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="bg-green-900 border border-green-500 rounded-lg p-4">
        <p class="text-green-200 text-center font-semibold">{{ successMessage }}</p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-900 border border-red-500 rounded-lg p-4">
        <p class="text-red-200 text-center">{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { TeamRegistrationInput } from '~/types/team'
import { validationRules } from '~/types/team'

const emit = defineEmits<{
  teamCreated: [team: any]
}>()

const { createTeam, loading, error } = useTeam()

const formData = ref<TeamRegistrationInput>({
  name: '',
  members: [
    { id: 0, playerName: '', xpScore: 0, memberPosition: 1 },
    { id: 0, playerName: '', xpScore: 0, memberPosition: 2 },
    { id: 0, playerName: '', xpScore: 0, memberPosition: 3 },
    { id: 0, playerName: '', xpScore: 0, memberPosition: 4 }
  ]
})

const errors = ref<Record<string, string>>({})
const successMessage = ref('')

const averageXp = computed(() => {
  const validScores = formData.value.members
    .map(m => m.xpScore)
    .filter(score => score >= 1500 && score <= 4000)
  
  if (validScores.length === 4) {
    return Math.floor(validScores.reduce((sum, score) => sum + score, 0) / 4)
  }
  return 0
})

const isFormValid = computed(() => {
  return formData.value.name.trim() !== '' && 
         formData.value.members.every(member => 
           member.playerName.trim() !== '' && 
           member.xpScore >= 1500 && 
           member.xpScore <= 4000
         )
})

const validateForm = () => {
  errors.value = {}

  // Validate team name
  if (!formData.value.name.trim()) {
    errors.value.name = 'チーム名は必須です'
  } else if (formData.value.name.length > validationRules.teamName.maxLength) {
    errors.value.name = `チーム名は${validationRules.teamName.maxLength}文字以内で入力してください`
  } else if (!validationRules.teamName.pattern.test(formData.value.name)) {
    errors.value.name = 'チーム名に使用できない文字が含まれています'
  }

  // Validate members
  formData.value.members.forEach((member, index) => {
    if (!member.playerName.trim()) {
      errors.value[`member${index}Name`] = 'プレイヤー名は必須です'
    } else if (member.playerName.length > validationRules.playerName.maxLength) {
      errors.value[`member${index}Name`] = `プレイヤー名は${validationRules.playerName.maxLength}文字以内で入力してください`
    } else if (!validationRules.playerName.pattern.test(member.playerName)) {
      errors.value[`member${index}Name`] = 'プレイヤー名に使用できない文字が含まれています'
    }

    if (!member.xpScore || member.xpScore < validationRules.xpScore.min || member.xpScore > validationRules.xpScore.max) {
      errors.value[`member${index}Xp`] = `XP値は${validationRules.xpScore.min}から${validationRules.xpScore.max}の間で入力してください`
    }
  })

  return Object.keys(errors.value).length === 0
}

const resetForm = () => {
  formData.value = {
    name: '',
    members: [
      { id: 0, playerName: '', xpScore: 0, memberPosition: 1 },
      { id: 0, playerName: '', xpScore: 0, memberPosition: 2 },
      { id: 0, playerName: '', xpScore: 0, memberPosition: 3 },
      { id: 0, playerName: '', xpScore: 0, memberPosition: 4 }
    ]
  }
  errors.value = {}
  successMessage.value = ''
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  try {
    const team = await createTeam(formData.value)
    successMessage.value = 'チームの登録が完了しました！'
    emit('teamCreated', team)
    resetForm()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (err) {
    console.error('Team creation failed:', err)
  }
}
</script>