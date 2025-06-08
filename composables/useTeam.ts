import type { TeamRegistrationInput, Team } from '~/types/team'

export const useTeam = () => {
  const supabase = useSupabaseClient()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const createTeam = async (teamData: TeamRegistrationInput) => {
    loading.value = true
    error.value = null

    try {
      // Calculate average XP
      const totalXp = teamData.members.reduce((sum, member) => sum + member.xpScore, 0)
      const averageXp = Math.floor(totalXp / 4)

      // Insert team
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert({
          name: teamData.name,
          average_xp: averageXp
        })
        .select()
        .single()

      if (teamError) throw teamError

      // Insert team members
      const membersData = teamData.members.map((member, index) => ({
        team_id: team.id,
        player_name: member.playerName,
        xp_score: member.xpScore,
        member_position: member.memberPosition
      }))

      const { error: membersError } = await supabase
        .from('team_members')
        .insert(membersData)

      if (membersError) throw membersError

      // Convert to camelCase format
      const result: Team = {
        id: team.id,
        name: team.name,
        averageXp: team.average_xp,
        createdAt: team.created_at,
        teamMembers: []
      }
      
      return result
    } catch (err: any) {
      error.value = err.message || 'チームの登録に失敗しました'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getTeamById = async (id: string): Promise<Team | null> => {
    loading.value = true
    error.value = null

    try {
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .select(`
          *,
          team_members (*)
        `)
        .eq('id', id)
        .single()

      if (teamError) throw teamError

      // Convert to camelCase format
      const result: Team = {
        id: team.id,
        name: team.name,
        averageXp: team.average_xp,
        createdAt: team.created_at,
        teamMembers: team.team_members?.map((member: any) => ({
          id: member.id,
          playerName: member.player_name,
          xpScore: member.xp_score,
          memberPosition: member.member_position
        })) || []
      }
      
      return result
    } catch (err: any) {
      error.value = err.message || 'チームの取得に失敗しました'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    createTeam,
    getTeamById,
    loading: readonly(loading),
    error: readonly(error)
  }
}