export interface TeamMember {
  id: number
  playerName: string
  xpScore: number
  memberPosition: number
}

export interface Team {
  id: number
  name: string
  averageXp: number
  createdAt: string
  teamMembers: TeamMember[]
}

export interface TeamRegistrationInput {
  name: string
  members: {
    id: number
    playerName: string
    xpScore: number
    memberPosition: number
  }[]
}

export interface TeamSearchFilters {
  minXp: number
  maxXp: number
}

export interface ValidationRules {
  teamName: {
    required: boolean
    maxLength: number
    pattern: RegExp
  }
  playerName: {
    required: boolean
    maxLength: number
    pattern: RegExp
  }
  xpScore: {
    required: boolean
    min: number
    max: number
    type: string
  }
}

export const validationRules: ValidationRules = {
  teamName: {
    required: true,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9ひらがなカタカナ漢字\s]+$/
  },
  playerName: {
    required: true,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9ひらがなカタカナ漢字]+$/
  },
  xpScore: {
    required: true,
    min: 1500,
    max: 4000,
    type: 'number'
  }
}