// Sistema de mecánicas de puzzle químico avanzado

export interface ChemicalProperty {
  molecular_weight: number;
  solubility: string;
  state_at_room_temp: string;
  discovery_year?: number;
  discoverer?: string;
  functional_groups: string[];
  biological_role: string;
  daily_requirement?: string;
  deficiency_symptoms: string;
  food_sources?: string[]; // Añadido
}

export const chemicalProperties: Record<string, ChemicalProperty> = {
  'C₆H₈O₆': {
    molecular_weight: 176.12,
    solubility: 'Hidrosoluble',
    state_at_room_temp: 'Sólido cristalino',
    discovery_year: 1928,
    discoverer: 'Albert Szent-Györgyi',
    functional_groups: ['Ácido carboxílico', 'Alcohol'],
    biological_role: 'Cofactor enzimático antioxidante',
    daily_requirement: '75-90mg',
    deficiency_symptoms: 'Escorbuto, sangrado de encías',
    food_sources: ['Cítricos', 'Kiwi', 'Fresas', 'Pimientos', 'Brócoli']
  },
  'Fe²⁺': {
    molecular_weight: 55.845,
    solubility: 'Soluble en medio ácido',
    state_at_room_temp: 'Ion metálico',
    functional_groups: ['Ion de transición'],
    biological_role: 'Transporte de oxígeno en hemoglobina',
    daily_requirement: '8-18mg',
    deficiency_symptoms: 'Anemia ferropénica, fatiga',
    food_sources: ['Carnes rojas', 'Espinacas', 'Lentejas', 'Quinoa', 'Chocolate negro']
  },
  'C₂₇H₄₄O': {
    molecular_weight: 384.64,
    solubility: 'Liposoluble',
    state_at_room_temp: 'Sólido ceroso',
    discovery_year: 1922,
    discoverer: 'Elmer McCollum',
    functional_groups: ['Alcohol secundario', 'Cicloalcano'],
    biological_role: 'Regulador de absorción de calcio',
    daily_requirement: '600-800 UI',
    deficiency_symptoms: 'Raquitismo, osteomalacia',
    food_sources: ['Pescados grasos', 'Yema de huevo', 'Lácteos fortificados', 'Exposición solar']
  },
  'Ca²⁺': {
    molecular_weight: 40.078,
    solubility: 'Soluble en agua',
    state_at_room_temp: 'Ion metálico',
    functional_groups: ['Ion alcalinotérreo'],
    biological_role: 'Estructura ósea y contracción muscular',
    daily_requirement: '1000-1200mg',
    deficiency_symptoms: 'Osteoporosis, calambres',
    food_sources: ['Lácteos', 'Verduras de hoja verde', 'Almendras', 'Sardinas', 'Tofu']
  },
  'C₁₂H₁₇N₄OS⁺': {
    molecular_weight: 265.35,
    solubility: 'Hidrosoluble',
    state_at_room_temp: 'Sal cristalina',
    discovery_year: 1897,
    discoverer: 'Christiaan Eijkman',
    functional_groups: ['Pirimidina', 'Tiazol'],
    biological_role: 'Coenzima en metabolismo de carbohidratos',
    daily_requirement: '1.1-1.2mg',
    deficiency_symptoms: 'Beriberi, neuropatía',
    food_sources: ['Cereales integrales', 'Legumbres', 'Nueces', 'Carne de cerdo', 'Semillas']
  },
  'Mg²⁺': {
    molecular_weight: 24.305,
    solubility: 'Soluble en agua',
    state_at_room_temp: 'Ion metálico',
    functional_groups: ['Ion alcalinotérreo'],
    biological_role: 'Cofactor en 300+ enzimas',
    daily_requirement: '310-420mg',
    deficiency_symptoms: 'Calambres, arritmias',
    food_sources: ['Verduras de hoja verde', 'Frutos secos', 'Semillas', 'Cereales integrales', 'Chocolate negro']
  }
};

// Sistema de pistas progresivas
export interface ProgressiveHint {
  level: 1 | 2 | 3 | 4 | 5;
  hint_text: string;
  cost: number; // Costo en puntos
}

export const getProgressiveHints = (formula: string): ProgressiveHint[] => {
  const properties = chemicalProperties[formula];
  if (!properties) return [];

  return [
    {
      level: 1,
      hint_text: `Esta molécula tiene un peso molecular de ${properties.molecular_weight} g/mol`,
      cost: 100
    },
    {
      level: 2,
      hint_text: `Es ${properties.solubility.toLowerCase()} y se encuentra en estado ${properties.state_at_room_temp.toLowerCase()} a temperatura ambiente`,
      cost: 200
    },
    {
      level: 3,
      hint_text: `Su función biológica principal es: ${properties.biological_role}`,
      cost: 300
    },
    {
      level: 4,
      hint_text: `Los requerimientos diarios son: ${properties.daily_requirement || 'Variables según individuo'}`,
      cost: 400
    },
    {
      level: 5,
      hint_text: `Su deficiencia causa: ${properties.deficiency_symptoms}`,
      cost: 500
    }
  ];
};

// Generador de señuelos químicos realistas
export const generateChemicalDecoys = (targetFormula: string, count: number): string[] => {
  const allFormulas = Object.keys(chemicalProperties);
  const decoys: string[] = [];
  
  // Generar señuelos basados en similitudes químicas
  const similarityPatterns = {
    'vitamins': ['C₆H₈O₆', 'C₂₉H₅₀O₂', 'C₂₇H₄₄O', 'C₂₀H₃₀O'],
    'b_vitamins': ['C₁₂H₁₇N₄OS⁺', 'C₁₇H₂₀N₄O₆', 'C₆H₅NO₂', 'C₈H₁₁NO₃'],
    'minerals': ['Fe²⁺', 'Ca²⁺', 'Mg²⁺', 'Zn²⁺', 'Cu²⁺']
  };

  // Encontrar categoría del objetivo
  let targetCategory = 'others';
  for (const [category, formulas] of Object.entries(similarityPatterns)) {
    if (formulas.includes(targetFormula)) {
      targetCategory = category;
      break;
    }
  }

  // Seleccionar señuelos de la misma categoría (más difícil)
  const categoryFormulas = similarityPatterns[targetCategory as keyof typeof similarityPatterns] || allFormulas;
  
  for (const formula of categoryFormulas) {
    if (formula !== targetFormula && decoys.length < count) {
      decoys.push(formula);
    }
  }

  return decoys;
};

// Sistema de análisis espectroscópico simulado
export interface SpectroscopicData {
  ir_peaks: string[];
  nmr_signals: string[];
  mass_spec_fragments: number[];
  uv_absorption: number;
}

export const getSpectroscopicHint = (formula: string): SpectroscopicData | null => {
  const spectroData: Record<string, SpectroscopicData> = {
    'C₆H₈O₆': {
      ir_peaks: ['3300-3500 cm⁻¹ (O-H)', '1760 cm⁻¹ (C=O)', '1650 cm⁻¹ (C=C)'],
      nmr_signals: ['4.5 ppm (H enólico)', '3.7 ppm (CH-OH)', '1.2 ppm (CH₃)'],
      mass_spec_fragments: [176, 158, 140, 116],
      uv_absorption: 245
    },
    'C₂₇H₄₄O': {
      ir_peaks: ['3400 cm⁻¹ (O-H)', '2900-3000 cm⁻¹ (C-H)', '1450 cm⁻¹ (C-C)'],
      nmr_signals: ['3.8 ppm (CHOH)', '2.1 ppm (CH₂)', '0.9 ppm (CH₃)'],
      mass_spec_fragments: [384, 366, 271, 136],
      uv_absorption: 265
    }
  };

  return spectroData[formula] || null;
};

// Mecánica de "laboratorio en tiempo real"
export const getRealTimeClues = (timeElapsed: number): string[] => {
  const clues: string[] = [];
  
  if (timeElapsed > 30) {
    clues.push("💡 Los compuestos con oxígeno suelen ser antioxidantes");
  }
  
  if (timeElapsed > 60) {
    clues.push("⚗️ Los iones divalentes (²⁺) son esenciales para estructura");
  }
  
  if (timeElapsed > 90) {
    clues.push("🧪 Las moléculas con anillos aromáticos absorben UV");
  }
  
  if (timeElapsed > 120) {
    clues.push("🔬 Los compuestos hidrosolubles se almacenan mal en el cuerpo");
  }

  return clues;
};

// Sistema de combinaciones falsas realistas
export const generateFalseCombinations = (level: number): Array<{formula_a: string, formula_b: string, fake_result: string}> => {
  const falseCombos = [
    {
      formula_a: 'C₆H₈O₆',
      formula_b: 'Ca²⁺',
      fake_result: 'Forma precipitado insoluble que reduce biodisponibilidad'
    },
    {
      formula_a: 'Fe²⁺',
      formula_b: 'C₆H₅NO₂',
      fake_result: 'Reacción redox que inactiva ambos nutrientes'
    },
    {
      formula_a: 'Mg²⁺',
      formula_b: 'C₂₇H₄₄O',
      fake_result: 'Competencia por sitios de absorción intestinal'
    }
  ];

  return falseCombos.slice(0, Math.min(level, falseCombos.length));
};
