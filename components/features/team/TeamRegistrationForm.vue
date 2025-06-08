<template>
  <BaseCard>
    <h2 class="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-6">
      🦑 チーム登録
    </h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Team Name -->
      <div>
        <label for="teamName" class="block text-sm font-semibold text-gray-300 mb-2">
          チーム名 <span class="text-red-400">*</span>
        </label>
        <BaseInput
          id="teamName"
          v-model="formData.name"
          type="text"
          placeholder="チーム名を入力してください"
          :maxlength="50"
          :error="errors.name"
        />
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
                <BaseInput
                  :id="`playerName${index}`"
                  v-model="member.playerName"
                  type="text"
                  placeholder="プレイヤー名"
                  :maxlength="20"
                  :error="errors[`member${index}Name`]"
                  size="sm"
                />
              </div>
              <div>
                <label :for="`xpScore${index}`" class="block text-sm font-medium text-gray-300 mb-1">
                  XP値 <span class="text-red-400">*</span>
                </label>
                <BaseInput
                  :id="`xpScore${index}`"
                  v-model="member.xpScore"
                  type="number"
                  :min="1500"
                  :max="4000"
                  placeholder="1500-4000"
                  :error="errors[`member${index}Xp`]"
                  size="sm"
                />
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
        <BaseButton
          type="submit"
          :disabled="!isFormValid"
          :loading="loading"
          loading-text="登録中..."
          variant="primary"
          @click="handleSubmit"
        >
          🎯 チーム登録
        </BaseButton>
      </div>

      <!-- Success Message -->
      <BaseMessage
        v-if="successMessage"
        type="success"
        :message="successMessage"
        :auto-hide="true"
        @dismiss="successMessage = ''"
      />

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
import type { TeamRegistrationInput } from '~/types/team'
import { validationRules } from '~/types/team'
import BaseCard from '~/components/base/BaseCard.vue'
import BaseInput from '~/components/base/BaseInput.vue'
import BaseButton from '~/components/base/BaseButton.vue'
import BaseMessage from '~/components/base/BaseMessage.vue'

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