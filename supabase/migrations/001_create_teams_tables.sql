-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create teams table
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    average_xp INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_members table
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    player_name VARCHAR(20) NOT NULL,
    xp_score INTEGER NOT NULL CHECK (xp_score >= 1500 AND xp_score <= 4000),
    member_position INTEGER NOT NULL CHECK (member_position >= 1 AND member_position <= 4),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(team_id, member_position)
);

-- Create indexes for better performance
CREATE INDEX idx_teams_average_xp ON teams(average_xp);
CREATE INDEX idx_team_members_team_id ON team_members(team_id);
CREATE INDEX idx_team_members_position ON team_members(team_id, member_position);

-- Add constraint to ensure exactly 4 members per team
-- This will be enforced in application logic for now