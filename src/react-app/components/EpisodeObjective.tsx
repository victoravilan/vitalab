import { motion } from 'framer-motion';
import { Target, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface EpisodeObjectiveProps {
  targetCombination: {
    vitamin_a: string;
    vitamin_b: string;
    benefits?: string;
    food_sources?: string;
  } | null;
  level: number;
  episode: number;
}

export default function EpisodeObjective({ targetCombination, episode }: EpisodeObjectiveProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!targetCombination) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-6 backdrop-blur-sm border border-blue-400/20 mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-bold text-white font-orbitron">
            Objetivo del Episodio {episode}
          </h3>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      <div className="bg-black/20 rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="bg-gradient-to-br from-purple-600/30 to-purple-700/40 rounded-lg px-4 py-3 border border-purple-400/30">
            <div className="text-purple-200 font-mono text-lg">? ? ?</div>
            <div className="text-purple-300 text-xs">Compuesto A</div>
          </div>
          
          <span className="text-2xl text-blue-400">+</span>
          
          <div className="bg-gradient-to-br from-purple-600/30 to-purple-700/40 rounded-lg px-4 py-3 border border-purple-400/30">
            <div className="text-purple-200 font-mono text-lg">? ? ?</div>
            <div className="text-purple-300 text-xs">Compuesto B</div>
          </div>
          
          <span className="text-2xl text-yellow-400">=</span>
          
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg px-4 py-2 border border-yellow-400/30">
            <span className="text-yellow-200 font-medium">Sinergia Dorada</span>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ 
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0 
          }}
          className="overflow-hidden"
        >
          <div className="pt-4 space-y-3 border-t border-white/10">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-medium mb-1">Enigma Químico:</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Dos compuestos moleculares se necesitan mutuamente para crear una sinergia bioquímica excepcional. 
                  Analiza las fórmulas químicas, deduce la identidad de cada nutriente y encuentra la combinación perfecta.
                </p>
              </div>
            </div>
            
            {targetCombination.benefits && (
              <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/20">
                <h4 className="text-green-300 font-medium mb-1">Beneficio Esperado:</h4>
                <p className="text-green-100 text-sm">{targetCombination.benefits}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">
          🧪 Deduce la identidad de cada compuesto y encuentra la combinación sinérgica perfecta
        </p>
      </div>
    </motion.div>
  );
}
