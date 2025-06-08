-- ============================================
-- Splatoon Team Management Database Setup
-- ============================================

-- Drop existing tables if they exist (for development)
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS teams CASCADE;

-- Create teams table
CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  average_xp INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_members table
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  player_name VARCHAR(20) NOT NULL,
  xp_score INTEGER NOT NULL,
  member_position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, player_name)
);

-- Create indexes for better performance
CREATE INDEX idx_teams_average_xp ON teams(average_xp);
CREATE INDEX idx_team_members_team_id ON team_members(team_id);
CREATE INDEX idx_team_members_position ON team_members(member_position);

-- Enable Row Level Security
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (temporary for development)
-- Note: In production, you would want more restrictive policies
CREATE POLICY "Enable all operations for all users on teams" 
ON teams FOR ALL 
USING (true);

CREATE POLICY "Enable all operations for all users on team_members" 
ON team_members FOR ALL 
USING (true);

-- ============================================
-- Sample Data for Testing
-- ============================================

-- Insert sample teams
INSERT INTO teams (name, average_xp) VALUES
('チームイカ', 2100),
('スプラエリート', 3200),
('ナワバリウォーズ', 1800),
('ガチマッチ最強', 3500),
('初心者フレンドリー', 1600);

-- Insert sample team members
-- Team 1: チームイカ (average: 2100)
INSERT INTO team_members (team_id, player_name, xp_score, member_position) 
SELECT id, 'プレイヤー1', 2000, 1 FROM teams WHERE name = 'チームイカ'
UNION ALL
SELECT id, 'プレイヤー2', 2200, 2 FROM teams WHERE name = 'チームイカ'
UNION ALL
SELECT id, 'プレイヤー3', 2100, 3 FROM teams WHERE name = 'チームイカ'
UNION ALL
SELECT id, 'プレイヤー4', 2100, 4 FROM teams WHERE name = 'チームイカ';

-- Team 2: スプラエリート (average: 3200)
INSERT INTO team_members (team_id, player_name, xp_score, member_position) 
SELECT id, 'エキスパート1', 3400, 1 FROM teams WHERE name = 'スプラエリート'
UNION ALL
SELECT id, 'エキスパート2', 3200, 2 FROM teams WHERE name = 'スプラエリート'
UNION ALL
SELECT id, 'エキスパート3', 3100, 3 FROM teams WHERE name = 'スプラエリート'
UNION ALL
SELECT id, 'エキスパート4', 3100, 4 FROM teams WHERE name = 'スプラエリート';

-- Team 3: ナワバリウォーズ (average: 1800)
INSERT INTO team_members (team_id, player_name, xp_score, member_position) 
SELECT id, 'カジュアル1', 1900, 1 FROM teams WHERE name = 'ナワバリウォーズ'
UNION ALL
SELECT id, 'カジュアル2', 1800, 2 FROM teams WHERE name = 'ナワバリウォーズ'
UNION ALL
SELECT id, 'カジュアル3', 1700, 3 FROM teams WHERE name = 'ナワバリウォーズ'
UNION ALL
SELECT id, 'カジュアル4', 1800, 4 FROM teams WHERE name = 'ナワバリウォーズ';

-- Team 4: ガチマッチ最強 (average: 3500)
INSERT INTO team_members (team_id, player_name, xp_score, member_position) 
SELECT id, 'プロ1', 3600, 1 FROM teams WHERE name = 'ガチマッチ最強'
UNION ALL
SELECT id, 'プロ2', 3500, 2 FROM teams WHERE name = 'ガチマッチ最強'
UNION ALL
SELECT id, 'プロ3', 3400, 3 FROM teams WHERE name = 'ガチマッチ最強'
UNION ALL
SELECT id, 'プロ4', 3500, 4 FROM teams WHERE name = 'ガチマッチ最強';

-- Team 5: 初心者フレンドリー (average: 1600)
INSERT INTO team_members (team_id, player_name, xp_score, member_position) 
SELECT id, 'ビギナー1', 1700, 1 FROM teams WHERE name = '初心者フレンドリー'
UNION ALL
SELECT id, 'ビギナー2', 1600, 2 FROM teams WHERE name = '初心者フレンドリー'
UNION ALL
SELECT id, 'ビギナー3', 1500, 3 FROM teams WHERE name = '初心者フレンドリー'
UNION ALL
SELECT id, 'ビギナー4', 1600, 4 FROM teams WHERE name = '初心者フレンドリー';

-- ============================================
-- Verification Queries
-- ============================================

-- Check if data was inserted correctly
-- SELECT 
--   t.name,
--   t.average_xp,
--   array_agg(tm.player_name ORDER BY tm.member_position) as members,
--   array_agg(tm.xp_score ORDER BY tm.member_position) as xp_scores
-- FROM teams t
-- JOIN team_members tm ON t.id = tm.team_id
-- GROUP BY t.id, t.name, t.average_xp
-- ORDER BY t.average_xp;