import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Clock, Target, HelpCircle } from 'lucide-react';
import TestTube from '@/react-app/components/TestTube';
import CombinationArea from '@/react-app/components/CombinationArea';
import EpisodeObjective from '@/react-app/components/EpisodeObjective';
import ChemicalInfoModal from '@/react-app/components/ChemicalInfoModal';
import GameGuide from '@/react-app/components/GameGuide';
import HintModal from '@/react-app/components/HintModal';
import { TestTube as TestTubeType, CombinationResult, GameState } from '@/shared/types';
import { getChemicalHint } from '@/react-app/data/chemicalHints';

interface GameProps {
  level: number;
  episode: number;
  onBack: () => void;
  onComplete: (score: number, episodesCompleted?: number) => void;
}

export default function Game({ level, episode, onBack, onComplete }: GameProps) {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: level,
    currentEpisode: episode,
    selectedTubes: [],
    isCompleted: false,
    timer: 0,
    score: 0,
    attempts: 0
  });

  const [tubes, setTubes] = useState<TestTubeType[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CombinationResult | null>(null);
  const [targetCombination, setTargetCombination] = useState<{vitamin_a: string, vitamin_b: string, benefits?: string, food_sources?: string, success: boolean} | null>(null);
  const [selectedTubeForInfo, setSelectedTubeForInfo] = useState<TestTubeType | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showGameGuide, setShowGameGuide] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [hintWarning, setHintWarning] = useState(true);
  const [totalEpisodesCompleted, setTotalEpisodesCompleted] = useState(0);

  // Timer effect
  useEffect(() => {
    if (!gameState.isCompleted) {
      const interval = setInterval(() => {
        setGameState(prev => ({ ...prev, timer: prev.timer + 1 }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState.isCompleted]);

  // Load level data
  useEffect(() => {
    loadLevelData();
    // Reset game state when level/episode changes
    setGameState(prev => ({
      ...prev,
      currentLevel: level,
      currentEpisode: episode,
      selectedTubes: [],
      isCompleted: false,
      timer: 0,
      attempts: 0
    }));
    setResult(null);
  }, [level, episode]);

  const loadLevelData = () => {
    // Expanded combinations for more variety - different for each episode
    const allCombinations = [
      // Episodio 1 - Absorción de Hierro
      { vitamin_a: 'Vitamina C', vitamin_b: 'Hierro', benefits: 'Aumenta hasta 6x la absorción de hierro no hemo', food_sources: 'Combina espinacas con zumo de limón, lentejas con pimientos rojos, o brócoli con naranja. La vitamina C convierte el hierro férrico en ferroso, facilitando su absorción intestinal y previniendo la anemia ferropénica.', success: true },
      
      // Episodio 2 - Salud Ósea
      { vitamin_a: 'Vitamina D', vitamin_b: 'Calcio', benefits: 'Mejora absorción intestinal y fijación ósea de calcio', food_sources: 'Lácteos con exposición solar, yogur con sardinas, o queso con salmón. La vitamina D regula la síntesis de proteínas transportadoras de calcio en el intestino, maximizando su biodisponibilidad para la formación ósea.', success: true },
      
      // Episodio 3 - Metabolismo Energético
      { vitamin_a: 'Vitamina B1', vitamin_b: 'Magnesio', benefits: 'Potencia el metabolismo de carbohidratos y la función neuromuscular', food_sources: 'Cereales integrales con frutos secos, quinoa con almendras, o avena con semillas de girasol. El magnesio activa las enzimas dependientes de B1 en el ciclo de Krebs para la producción de energía.', success: true },
      
      // Episodio 4 - Protección Antioxidante
      { vitamin_a: 'Vitamina E', vitamin_b: 'Vitamina C', benefits: 'La vitamina C regenera la vitamina E oxidada, amplificando la protección antioxidante', food_sources: 'Almendras con naranjas, aguacate con kiwi, o aceite de oliva virgen con fresas. Esta sinergia protege las membranas celulares del daño oxidativo y previene el envejecimiento prematuro.', success: true },
      
      // Episodio 5 - Equilibrio Mineral
      { vitamin_a: 'Calcio', vitamin_b: 'Magnesio', benefits: 'El magnesio mejora la absorción de calcio y regula su metabolismo (ratio ideal 2:1)', food_sources: 'Lácteos con frutos secos, yogur con almendras, o queso con semillas de sésamo. El magnesio activa la vitamina D y facilita el transporte de calcio, previniendo calambres musculares.', success: true },
      
      // Episodio 6 - Función Neurológica
      { vitamin_a: 'Vitamina B6', vitamin_b: 'Zinc', benefits: 'Colaboran en la síntesis de neurotransmisores y la función inmune', food_sources: 'Pescado con semillas de calabaza, plátano con nueces, o pollo con legumbres. Ambos nutrientes son cofactores esenciales para la síntesis de serotonina y dopamina.', success: true },
      
      // Episodio 7 - Cadena Respiratoria
      { vitamin_a: 'Vitamina B2', vitamin_b: 'Vitamina B3', benefits: 'Optimizan las reacciones redox en la cadena respiratoria celular', food_sources: 'Lácteos con cereales integrales, huevos con pan integral, o yogur con avena. Estas vitaminas trabajan juntas como cofactores FAD y NAD+ en la producción eficiente de ATP mitocondrial.', success: true },
      
      // Nivel 2 - Episodio 1 - Síntesis de Colágeno
      { vitamin_a: 'Vitamina C', vitamin_b: 'Vitamina K', benefits: 'Potencian la síntesis y estabilización del colágeno', food_sources: 'Brócoli con kiwi, espinacas con fresas, o col rizada con naranja. La vitamina C hidroxila la prolina y lisina, mientras K activa proteínas que estabilizan la matriz de colágeno.', success: true },
      
      // Nivel 2 - Episodio 2 - Metabolismo de Folatos
      { vitamin_a: 'Ácido Fólico', vitamin_b: 'Vitamina B12', benefits: 'Colaboran en la síntesis de ADN y prevención de anemia megaloblástica', food_sources: 'Verduras de hoja verde con productos de origen animal, espinacas con salmón, o lentejas con huevos. B12 regenera el folato activo en el ciclo de metionina.', success: true },
      
      // Nivel 2 - Episodio 3 - Absorción de Carotenoides
      { vitamin_a: 'Beta-caroteno', vitamin_b: 'Vitamina E', benefits: 'La vitamina E protege los carotenoides de la oxidación durante la absorción', food_sources: 'Zanahorias con aceite de oliva, calabaza con frutos secos, o batata con aguacate. Las grasas saludables mejoran hasta 15x la absorción de carotenoides.', success: true },
      
      // Nivel 2 - Episodio 4 - Función Tiroidea
      { vitamin_a: 'Yodo', vitamin_b: 'Selenio', benefits: 'El selenio protege la tiroides del daño oxidativo causado por el metabolismo del yodo', food_sources: 'Algas marinas con nueces de Brasil, pescado marino con semillas de girasol. El selenio es cofactor de las enzimas deiodinasas que activan las hormonas tiroideas.', success: true },
      
      // Nivel 2 - Episodio 5 - Metabolismo de Aminoácidos
      { vitamin_a: 'Vitamina B6', vitamin_b: 'Vitamina B2', benefits: 'Trabajan juntas en el metabolismo de aminoácidos y síntesis de neurotransmisores', food_sources: 'Carnes magras con lácteos, pescado con cereales integrales. B6 como piridoxal fosfato y B2 como FAD son cofactores en transaminación y deaminación oxidativa.', success: true },
      
      // Nivel 2 - Episodio 6 - Síntesis de Hemoglobina
      { vitamin_a: 'Hierro', vitamin_b: 'Cobre', benefits: 'El cobre facilita la incorporación del hierro en la hemoglobina', food_sources: 'Carnes rojas con frutos secos, hígado con semillas de sésamo. La ceruloplasmina (proteína de cobre) oxida Fe2+ a Fe3+ para su incorporación en la transferrina.', success: true },
      
      // Nivel 2 - Episodio 7 - Antioxidantes Liposolubles
      { vitamin_a: 'Vitamina A', vitamin_b: 'Vitamina E', benefits: 'Se complementan protegiendo diferentes compartimentos celulares del estrés oxidativo', food_sources: 'Hígado con aceites vegetales, zanahorias con frutos secos. Vitamina A protege membranas mucosas y E protege membranas celulares de la peroxidación lipídica.', success: true },
      
      // Continuar expandiendo para más niveles...
      // Nivel 3 - Sinergias Avanzadas
      { vitamin_a: 'Vitamina D', vitamin_b: 'Vitamina K2', benefits: 'K2 dirige el calcio activado por D3 hacia los huesos y lo aleja de arterias', food_sources: 'Pescado graso con natto, salmón con quesos fermentados. D3 aumenta absorción de calcio, K2 activa osteocalcina y proteína GLA para dirigir el calcio correctamente.', success: true },
      
      { vitamin_a: 'Cromo', vitamin_b: 'Vitamina B3', benefits: 'Mejoran la sensibilidad a la insulina y el metabolismo de la glucosa', food_sources: 'Levadura nutricional con cereales integrales, brócoli con carne magra. El cromo potencia la acción de la insulina mientras B3 mejora el perfil lipídico.', success: true },
      
      { vitamin_a: 'Coenzima Q10', vitamin_b: 'Vitamina E', benefits: 'Se regeneran mutuamente en la cadena antioxidante mitocondrial', food_sources: 'Pescado azul con aceites vegetales prensados en frío, sardinas con aguacate. CoQ10 protege la cadena respiratoria y E protege membranas mitocondriales.', success: true },
      
      { vitamin_a: 'Ácido Alfa-lipoico', vitamin_b: 'Vitamina C', benefits: 'El ácido lipoico regenera la vitamina C oxidada, amplificando su poder antioxidante', food_sources: 'Espinacas con cítricos, vísceras con pimientos. El ácido lipoico es soluble en agua y grasa, regenerando múltiples antioxidantes.', success: true },
      
      { vitamin_a: 'Manganeso', vitamin_b: 'Vitamina K', benefits: 'El manganeso es cofactor de enzimas que sintetizan proteínas dependientes de vitamina K', food_sources: 'Verduras de hoja verde con frutos secos, espinacas con almendras. Manganeso activa la protrombina carboxilasa en la síntesis de factores de coagulación.', success: true }
    ];

    const colors = {
      'Vitamina C': '#FF0080',      // Rosa metálico fluorescente
      'Hierro': '#FF4500',          // Naranja metálico brillante
      'Vitamina D': '#FFD700',      // Dorado metálico fluorescente
      'Calcio': '#E6E6FA',          // Blanco perla metálico
      'Vitamina B1': '#00FF80',     // Verde neón metálico
      'Magnesio': '#00FFFF',        // Cyan metálico brillante
      'Vitamina E': '#8A2BE2',      // Violeta metálico brillante
      'Vitamina B6': '#FF1493',     // Rosa profundo metálico
      'Zinc': '#C0C0C0',            // Plata metálico puro
      'Vitamina B2': '#FF8C00',     // Naranja metálico brillante
      'Vitamina B3': '#FF69B4',     // Rosa metálico caliente
      'Vitamina K': '#32CD32',      // Verde lima metálico
      'Ácido Fólico': '#DA70D6',    // Orquídea metálico
      'Vitamina B12': '#DC143C',    // Rojo carmesí metálico
      'Beta-caroteno': '#FF6347',   // Tomate metálico brillante
      'Yodo': '#4B0082',            // Índigo metálico profundo
      'Selenio': '#B0C4DE',         // Azul acero metálico
      'Cobre': '#B87333',           // Cobre metálico brillante
      'Vitamina A': '#FFA500',      // Naranja metálico puro
      'Vitamina K2': '#228B22',     // Verde bosque metálico
      'Cromo': '#708090',           // Gris pizarra metálico
      'Coenzima Q10': '#FF1493',    // Rosa profundo metálico
      'Ácido Alfa-lipoico': '#00FA9A', // Verde mar metálico
      'Manganeso': '#CD853F',       // Marrón arena metálico
    };

    const formulas = {
      'Vitamina C': 'C₆H₈O₆',
      'Hierro': 'Fe²⁺',
      'Vitamina D': 'C₂₇H₄₄O',
      'Calcio': 'Ca²⁺',
      'Vitamina B1': 'C₁₂H₁₇N₄OS⁺',
      'Magnesio': 'Mg²⁺',
      'Vitamina E': 'C₂₉H₅₀O₂',
      'Vitamina B6': 'C₈H₁₁NO₃',
      'Zinc': 'Zn²⁺',
      'Vitamina B2': 'C₁₇H₂₀N₄O₆',
      'Vitamina B3': 'C₆H₅NO₂',
      'Vitamina K': 'C₃₁H₄₆O₂',
      'Ácido Fólico': 'C₁₉H₁₉N₇O₆',
      'Vitamina B12': 'C₆₃H₈₈CoN₁₄O₁₄P',
      'Beta-caroteno': 'C₄₀H₅₆',
      'Yodo': 'I⁻',
      'Selenio': 'Se',
      'Cobre': 'Cu²⁺',
      'Vitamina A': 'C₂₀H₃₀O',
      'Vitamina K2': 'C₄₆H₆₄O₂',
      'Cromo': 'Cr³⁺',
      'Coenzima Q10': 'C₅₉H₉₀O₄',
      'Ácido Alfa-lipoico': 'C₈H₁₄O₂S₂',
      'Manganeso': 'Mn²⁺',
    };

    // Calculate unique index for each level-episode combination
    const globalEpisodeIndex = (level - 1) * 7 + (episode - 1);
    const target = allCombinations[globalEpisodeIndex % allCombinations.length];
    setTargetCombination(target);

    // Create available tubes (target pair + 3-4 unique decoys)
    const availableVitamins = Object.keys(colors);
    
    // Ensure decoys are different for each episode
    const usedVitamins = new Set([target.vitamin_a, target.vitamin_b]);
    const decoys = [];
    let decoyIndex = globalEpisodeIndex * 3; // Start at different position for each episode
    
    while (decoys.length < 3 && decoys.length < availableVitamins.length - 2) {
      const candidateDecoy = availableVitamins[decoyIndex % availableVitamins.length];
      if (!usedVitamins.has(candidateDecoy)) {
        decoys.push(candidateDecoy);
        usedVitamins.add(candidateDecoy);
      }
      decoyIndex++;
    }

    const allTubes = [target.vitamin_a, target.vitamin_b, ...decoys];
    
    // Shuffle tubes for each episode
    const shuffledTubes = [...allTubes].sort(() => 0.5 - Math.random());
    
    const tubeObjects: TestTubeType[] = shuffledTubes.map((vitamin, index) => ({
      id: `tube-${index}`,
      name: vitamin, // Hidden from display, used for logic only
      formula: formulas[vitamin as keyof typeof formulas] || '',
      color: colors[vitamin as keyof typeof colors] || '#666',
      isSelected: false,
      description: `Fórmula química: ${formulas[vitamin as keyof typeof formulas]}`
    }));

    setTubes(tubeObjects);
  };

  const handleTubeSelect = (tubeId: string) => {
    setTubes(prevTubes => {
      const updatedTubes = prevTubes.map(tube => {
        if (tube.id === tubeId) {
          return { ...tube, isSelected: !tube.isSelected };
        }
        if (tube.isSelected && gameState.selectedTubes.length >= 2) {
          return { ...tube, isSelected: false };
        }
        return tube;
      });

      const selectedTubes = updatedTubes.filter(tube => tube.isSelected);
      
      setGameState(prev => ({
        ...prev,
        selectedTubes: selectedTubes.map(t => t.id)
      }));

      return updatedTubes;
    });
  };

  const handleShowTubeInfo = (tube: TestTubeType) => {
    setSelectedTubeForInfo(tube);
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    setSelectedTubeForInfo(null);
  };

  const handleShowHint = () => {
    setShowHintModal(true);
    setHintWarning(true);
  };

  const handleConfirmHint = () => {
    if (totalEpisodesCompleted > 0) {
      const newEpisodesCompleted = Math.max(0, totalEpisodesCompleted - 1);
      setTotalEpisodesCompleted(newEpisodesCompleted);
      setGameState(prev => ({ ...prev, score: Math.max(0, prev.score - 500) }));
    }
    setHintWarning(false);
  };

  const handleCloseHintModal = () => {
    setShowHintModal(false);
    setHintWarning(true);
  };

  // Get hint data for the target combination
  const getHintData = () => {
    if (!targetCombination) return { formula: '', hint: '' };
    
    // Get formula from one of the target vitamins
    const formulas = {
      'Vitamina C': 'C₆H₈O₆',
      'Hierro': 'Fe²⁺',
      'Vitamina D': 'C₂₇H₄₄O',
      'Calcio': 'Ca²⁺',
      'Vitamina B1': 'C₁₂H₁₇N₄OS⁺',
      'Magnesio': 'Mg²⁺',
      'Vitamina E': 'C₂₉H₅₀O₂',
      'Vitamina B6': 'C₈H₁₁NO₃',
      'Zinc': 'Zn²⁺',
      'Vitamina B2': 'C₁₇H₂₀N₄O₆',
      'Vitamina B3': 'C₆H₅NO₂',
    };

    const targetFormula = formulas[targetCombination.vitamin_a as keyof typeof formulas] || 
                         formulas[targetCombination.vitamin_b as keyof typeof formulas] ||
                         'C₆H₈O₆';
    
    return {
      formula: targetFormula,
      hint: getChemicalHint(targetFormula)
    };
  };

  const handleCombine = async () => {
    if (gameState.selectedTubes.length !== 2 || !targetCombination) return;

    setIsProcessing(true);
    setResult(null);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const selectedTubeObjects = tubes.filter(tube => tube.isSelected);
    const selectedNames = selectedTubeObjects.map(tube => tube.name);
    
    const isCorrect = 
      (selectedNames.includes(targetCombination.vitamin_a) && selectedNames.includes(targetCombination.vitamin_b));

    const newAttempts = gameState.attempts + 1;
    let score = gameState.score;

    if (isCorrect) {
      // Award points based on attempts (fewer attempts = more points)
      const baseScore = 1000;
      const attemptPenalty = Math.max(0, (newAttempts - 1) * 100);
      const timePenalty = Math.max(0, (gameState.timer - 30) * 2);
      score += Math.max(100, baseScore - attemptPenalty - timePenalty);
    }

    const combinationResult: CombinationResult = {
      success: isCorrect,
      resultColor: isCorrect ? '#FFD700' : '#ef4444',
      benefits: isCorrect ? targetCombination.benefits : undefined,
      foodSources: isCorrect ? targetCombination.food_sources : undefined,
      score: score - gameState.score
    };

    setResult(combinationResult);
    setGameState(prev => ({
      ...prev,
      attempts: newAttempts,
      score,
      isCompleted: isCorrect
    }));

    // Reset selection after showing result
    setTimeout(() => {
      setTubes(prevTubes => 
        prevTubes.map(tube => ({ ...tube, isSelected: false }))
      );
      setGameState(prev => ({ ...prev, selectedTubes: [] }));
    }, 1000);

    if (isCorrect) {
      const newEpisodesCompleted = totalEpisodesCompleted + 1;
      setTotalEpisodesCompleted(newEpisodesCompleted);
      // Complete episode after showing success animation
      setTimeout(() => {
        onComplete(score, newEpisodesCompleted);
      }, 3500);
    }

    setIsProcessing(false);
  };

  const selectedTubeObjects = tubes.filter(tube => tube.isSelected);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver
              </button>
              
              <button
                onClick={() => setShowGameGuide(true)}
                className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                Guía
              </button>
            </div>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white font-orbitron">
                VitaLab
              </h1>
              <p className="text-blue-300 text-sm">
                Nivel {level} - Episodio {episode}
              </p>
            </div>

            <div className="flex items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="font-mono">{formatTime(gameState.timer)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="font-mono">{gameState.score}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                <span className="font-mono">{gameState.attempts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Episode Objective */}
        <EpisodeObjective
          targetCombination={targetCombination}
          level={level}
          episode={episode}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Test Tubes */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6 text-center font-orbitron">
                Laboratorio de Análisis Molecular
              </h2>
              <p className="text-center text-gray-300 text-sm mb-6">
                🧪 Identifica los compuestos por sus fórmulas químicas y encuentra la combinación sinérgica
              </p>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
                {tubes.map((tube) => (
                  <TestTube
                    key={tube.id}
                    tube={tube}
                    onSelect={handleTubeSelect}
                    onShowInfo={handleShowTubeInfo}
                    isDisabled={gameState.isCompleted || gameState.selectedTubes.length >= 2 && !tube.isSelected}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Combination Area */}
          <div className="lg:col-span-1">
            <CombinationArea
              selectedTubes={selectedTubeObjects}
              onCombine={handleCombine}
              onHint={handleShowHint}
              isProcessing={isProcessing}
              result={result}
            />
          </div>
        </div>

        {/* Success Animation */}
        <AnimatePresence>
          {gameState.isCompleted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-8 text-center shadow-2xl max-w-md mx-4"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                >
                  <Trophy className="w-16 h-16 text-yellow-900 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-yellow-900 mb-2">
                  ¡Episodio Completado!
                </h3>
                <p className="text-yellow-800 mb-2">
                  Puntuación obtenida: {result?.score || 0} puntos
                </p>
                <p className="text-yellow-800 text-sm mb-4">
                  {episode < 7 ? 'Avanzando al siguiente episodio...' : 
                   level < 16 ? 'Avanzando al siguiente nivel...' : 
                   '¡Has completado todos los niveles!'}
                </p>
                <motion.div
                  className="w-full bg-yellow-300 rounded-full h-2 mb-3"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                />
                <div className="text-yellow-800 text-xs">
                  {episode < 7 ? `Episodio ${episode + 1} de nivel ${level}` :
                   level < 16 ? `Nivel ${level + 1} - Episodio 1` :
                   'Juego completado'}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-400 text-sm">
            Creado por Victor M.F. Avilan - Valor Agregado. Todos los derechos reservados
          </p>
        </div>
      </footer>

      {/* Chemical Info Modal */}
      <ChemicalInfoModal
        tube={selectedTubeForInfo}
        isOpen={showInfoModal}
        onClose={handleCloseInfoModal}
      />

      {/* Game Guide Modal */}
      <GameGuide
        isOpen={showGameGuide}
        onClose={() => setShowGameGuide(false)}
      />

      {/* Hint Modal */}
      <HintModal
        isOpen={showHintModal}
        onClose={handleCloseHintModal}
        onConfirm={handleConfirmHint}
        showWarning={hintWarning}
        formula={!hintWarning ? getHintData().formula : undefined}
        hint={!hintWarning ? getHintData().hint : undefined}
      />
    </div>
  );
}
