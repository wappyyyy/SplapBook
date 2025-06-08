# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Setup and Installation
```bash
bun install                    # Install dependencies (preferred)
npm install                   # Alternative package manager
```

### Development Server
```bash
bun run dev                   # Start development server on localhost:3000
npm run dev                   # Alternative command
```

### Build Commands
```bash
bun run build                 # Build for production
bun run preview               # Preview production build locally
bun run generate              # Generate static site
```

## Environment Setup

### Required Environment Variables
Create `.env.local` with:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup
Execute `supabase/database-setup.sql` in Supabase SQL Editor to create:
- `teams` table with team information and average XP
- `team_members` table with individual player data
- Sample test data for 5 teams

## Architecture Overview

### Data Flow Pattern
This is a Splatoon team management app with a specific data architecture:
- **Teams** contain exactly 4 members with XP scores (1500-4000 range)
- **Average XP** is auto-calculated as `Math.floor(totalXP / 4)` and stored in database
- **Search** operates on average XP ranges, not individual member XP
- **Validation** happens at both frontend (types/team.ts) and database level

### Component Architecture
```
pages/teams/index.vue          # Main app page
├── TeamRegistrationForm.vue   # Form with 4 member inputs + validation
├── TeamSearchForm.vue         # XP range search inputs
├── TeamSearchResults.vue      # Grid display of teams
└── TeamCard.vue              # Individual team display card
```

### State Management Pattern
- **useTeam.ts**: CRUD operations with Supabase, handles snake_case ↔ camelCase conversion
- **useTeamSearch.ts**: Search logic with XP range filtering
- No global store - composables return reactive refs for local component state

### Database Naming Convention
- Database uses `snake_case` (average_xp, team_id, player_name)
- Frontend uses `camelCase` (averageXp, teamId, playerName)
- Conversion handled in composables, not components

### Styling System
- Tailwind CSS with Splatoon-inspired color scheme
- Gradient backgrounds: `from-pink-500 to-orange-400`
- Dark theme base with cyan/purple accents
- Bold fonts throughout for gaming aesthetic

## Key Business Rules

### XP Score Validation
- Individual XP: 1500-4000 range (enforced in types/team.ts)
- Team names: max 50 chars, Japanese/English alphanumeric
- Player names: max 20 chars, no spaces allowed
- Exactly 4 members required per team

### Team Search Logic
- Search by average XP range only (not individual member XP)
- Results sorted by average XP ascending
- Database indexes on average_xp for performance

## File Location Patterns

- **Types**: All in `types/team.ts` with validation rules
- **Components**: Feature-specific in `components/features/team/`
- **Pages**: Main route at `pages/teams/index.vue`
- **Composables**: Business logic in `composables/use*.ts`
- **Database**: Schema and sample data in `supabase/database-setup.sql`