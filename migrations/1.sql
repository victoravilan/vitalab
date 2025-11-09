
CREATE TABLE game_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  level_number INTEGER NOT NULL,
  episode_number INTEGER NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  best_time INTEGER DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vitamin_combinations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vitamin_a TEXT NOT NULL,
  vitamin_b TEXT NOT NULL,
  interaction_type TEXT NOT NULL,
  chemical_result TEXT NOT NULL,
  benefits TEXT,
  damages TEXT,
  food_sources TEXT,
  color_a TEXT NOT NULL,
  color_b TEXT NOT NULL,
  result_color TEXT DEFAULT '#FFD700',
  level_number INTEGER NOT NULL,
  episode_number INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_game_progress_user_level ON game_progress(user_id, level_number, episode_number);
CREATE INDEX idx_combinations_level ON vitamin_combinations(level_number, episode_number);
