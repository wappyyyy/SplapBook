import type { TeamSearchFilters, Team } from '~/types/team'

export const useTeamSearch = () => {
  const supabase = useSupabaseClient()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const results = ref<Team[]>([])

  const searchTeams = async (filters: TeamSearchFilters) => {
    loading.value = true
    error.value = null

    try {
      const { data: teams, error: searchError } = await supabase
        .from('teams')
        .select(`
          *,
          team_members (*)
        `)
        .gte('average_xp', filters.minXp)
        .lte('average_xp', filters.maxXp)
        .order('average_xp', { ascending: true })

      if (searchError) throw searchError

      // Sort team members by position and convert to camelCase
      const sortedTeams = teams?.map((team: any) => ({
        id: team.id,
        name: team.name,
        averageXp: team.average_xp,
        createdAt: team.created_at,
        teamMembers: team.team_members?.map((member: any) => ({
          id: member.id,
          playerName: member.player_name,
          xpScore: member.xp_score,
          memberPosition: member.member_position
        })).sort((a: any, b: any) => a.memberPosition - b.memberPosition) || []
      })) || []

      results.value = sortedTeams
      return sortedTeams
    } catch (err: any) {
      error.value = err.message || 'チームの検索に失敗しました'
      results.value = []
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearResults = () => {
    results.value = []
    error.value = null
  }

  return {
    searchTeams,
    clearResults,
    results: readonly(results),
    loading: readonly(loading),
    error: readonly(error)
  }
}