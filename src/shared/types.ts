import z from "zod";

export const GameProgressSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  level_number: z.number().int().min(1).max(16),
  episode_number: z.number().int().min(1).max(7),
  is_completed: z.boolean().default(false),
  score: z.number().int().default(0),
  attempts: z.number().int().default(0),
  best_time: z.number().int().optional(),
  created_at: z.string(),
  updated_at: z.string()
});

export const VitaminCombinationSchema = z.object({
  id: z.number(),
  vitamin_a: z.string(),
  vitamin_b: z.string(),
  interaction_type: z.string(),
  chemical_result: z.string(),
  benefits: z.string().optional(),
  damages: z.string().optional(),
  food_sources: z.string().optional(),
  color_a: z.string(),
  color_b: z.string(),
  result_color: z.string().default('#FFD700'),
  level_number: z.number().int().min(1).max(16),
  episode_number: z.number().int().min(1).max(7),
  created_at: z.string(),
  updated_at: z.string()
});

export const GameStateSchema = z.object({
  currentLevel: z.number().int().min(1).max(16),
  currentEpisode: z.number().int().min(1).max(7),
  selectedTubes: z.array(z.string()).max(2),
  isCompleted: z.boolean().default(false),
  timer: z.number().int().default(0),
  score: z.number().int().default(0),
  attempts: z.number().int().default(0)
});

export type GameProgress = z.infer<typeof GameProgressSchema>;
export type VitaminCombination = z.infer<typeof VitaminCombinationSchema>;
export type GameState = z.infer<typeof GameStateSchema>;

export interface TestTube {
  id: string;
  name: string;
  formula: string;
  color: string;
  isSelected: boolean;
  description: string;
}

export interface CombinationResult {
  success: boolean;
  resultColor: string;
  benefits?: string;
  damages?: string;
  foodSources?: string;
  score: number;
}
