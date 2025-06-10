-- Insert test teams with exactly 4 members each
-- Team 1: チームアルファ (average XP: 2500)
INSERT INTO teams (id, name, average_xp) VALUES 
    ('11111111-1111-1111-1111-111111111111', 'チームアルファ', 2500);

INSERT INTO team_members (team_id, player_name, xp_score, member_position) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Player1', 2400, 1),
    ('11111111-1111-1111-1111-111111111111', 'Player2', 2500, 2),
    ('11111111-1111-1111-1111-111111111111', 'Player3', 2600, 3),
    ('11111111-1111-1111-1111-111111111111', 'Player4', 2500, 4);

-- Team 2: チームベータ (average XP: 3000)
INSERT INTO teams (id, name, average_xp) VALUES 
    ('22222222-2222-2222-2222-222222222222', 'チームベータ', 3000);

INSERT INTO team_members (team_id, player_name, xp_score, member_position) VALUES
    ('22222222-2222-2222-2222-222222222222', 'Alpha', 2800, 1),
    ('22222222-2222-2222-2222-222222222222', 'Beta', 3000, 2),
    ('22222222-2222-2222-2222-222222222222', 'Gamma', 3200, 3),
    ('22222222-2222-2222-2222-222222222222', 'Delta', 3000, 4);

-- Team 3: チームガンマ (average XP: 1800)
INSERT INTO teams (id, name, average_xp) VALUES 
    ('33333333-3333-3333-3333-333333333333', 'チームガンマ', 1800);

INSERT INTO team_members (team_id, player_name, xp_score, member_position) VALUES
    ('33333333-3333-3333-3333-333333333333', 'Rookie1', 1700, 1),
    ('33333333-3333-3333-3333-333333333333', 'Rookie2', 1800, 2),
    ('33333333-3333-3333-3333-333333333333', 'Rookie3', 1900, 3),
    ('33333333-3333-3333-3333-333333333333', 'Rookie4', 1800, 4);

-- Team 4: チームデルタ (average XP: 3500)
INSERT INTO teams (id, name, average_xp) VALUES 
    ('44444444-4444-4444-4444-444444444444', 'チームデルタ', 3500);

INSERT INTO team_members (team_id, player_name, xp_score, member_position) VALUES
    ('44444444-4444-4444-4444-444444444444', 'Pro1', 3400, 1),
    ('44444444-4444-4444-4444-444444444444', 'Pro2', 3500, 2),
    ('44444444-4444-4444-4444-444444444444', 'Pro3', 3600, 3),
    ('44444444-4444-4444-4444-444444444444', 'Pro4', 3500, 4);

-- Team 5: チームエプシロン (average XP: 2200)
INSERT INTO teams (id, name, average_xp) VALUES 
    ('55555555-5555-5555-5555-555555555555', 'チームエプシロン', 2200);

INSERT INTO team_members (team_id, player_name, xp_score, member_position) VALUES
    ('55555555-5555-5555-5555-555555555555', 'Mid1', 2100, 1),
    ('55555555-5555-5555-5555-555555555555', 'Mid2', 2200, 2),
    ('55555555-5555-5555-5555-555555555555', 'Mid3', 2300, 3),
    ('55555555-5555-5555-5555-555555555555', 'Mid4', 2200, 4);