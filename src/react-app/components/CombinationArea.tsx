import { motion, AnimatePresence } from 'framer-motion';
import { TestTube } from '@/shared/types';
import { Beaker, Plus, Sparkles, Lightbulb } from 'lucide-react';

interface CombinationAreaProps {
  selectedTubes: TestTube[];
  onCombine: () => void;
  onHint?: () => void;
  isProcessing: boolean;
  result?: {
    success: boolean;
    resultColor: string;
    benefits?: string;
    damages?: string;
    foodSources?: string;
  } | null;
}

export default function CombinationArea({ 
  selectedTubes, 
  onCombine, 
  onHint,
  isProcessing, 
  result 
}: CombinationAreaProps) {
  const canCombine = selectedTubes.length === 2 && !isProcessing;

  return (
    <div className="bg-gradient-to-br from-slate-800/20 to-slate-900/30 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2 font-orbitron flex items-center justify-center gap-2">
          <Beaker className="w-6 h-6 text-blue-400" />
          Área de Combinación
        </h3>
        <p className="text-gray-300 text-sm">
          Selecciona 2 vitaminas/minerales para combinar
        </p>
      </div>

      {/* Combination Display */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {/* First Tube Slot */}
        <div className="relative">
          <AnimatePresence>
            {selectedTubes[0] ? (
              <motion.div
                key={selectedTubes[0].id}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                className="w-12 h-24 bg-gradient-to-b from-blue-50/20 to-blue-100/40 rounded-full border-2 border-gray-300/60 relative overflow-hidden"
              >
                <div 
                  className="absolute bottom-1 left-1 right-1 rounded-full h-16"
                  style={{ 
                    background: `linear-gradient(to top, ${selectedTubes[0].color}, ${selectedTubes[0].color}dd)` 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full" />
              </motion.div>
            ) : (
              <motion.div 
                className="w-12 h-24 border-2 border-dashed border-gray-500/50 rounded-full flex items-center justify-center"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-gray-500 text-xs">Tubo 1</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Plus Symbol */}
        <motion.div
          animate={selectedTubes.length === 1 ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5, repeat: selectedTubes.length === 1 ? Infinity : 0 }}
        >
          <Plus className="w-8 h-8 text-gray-400" />
        </motion.div>

        {/* Second Tube Slot */}
        <div className="relative">
          <AnimatePresence>
            {selectedTubes[1] ? (
              <motion.div
                key={selectedTubes[1].id}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                className="w-12 h-24 bg-gradient-to-b from-blue-50/20 to-blue-100/40 rounded-full border-2 border-gray-300/60 relative overflow-hidden"
              >
                <div 
                  className="absolute bottom-1 left-1 right-1 rounded-full h-16"
                  style={{ 
                    background: `linear-gradient(to top, ${selectedTubes[1].color}, ${selectedTubes[1].color}dd)` 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full" />
              </motion.div>
            ) : (
              <motion.div 
                className="w-12 h-24 border-2 border-dashed border-gray-500/50 rounded-full flex items-center justify-center"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <span className="text-gray-500 text-xs">Tubo 2</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Result Tube */}
        {(canCombine || result) && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Plus className="w-6 h-6 text-gray-400" />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-32 relative"
            >
              <div className="w-full h-full bg-gradient-to-b from-blue-50/20 to-blue-100/40 rounded-full border-2 border-gray-300/60 relative overflow-hidden">
                {result ? (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: '75%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute bottom-1 left-1 right-1 rounded-full"
                    style={{ 
                      background: result.success 
                        ? `linear-gradient(to top, ${result.resultColor}, ${result.resultColor}dd, ${result.resultColor}88)`
                        : 'linear-gradient(to top, #ef4444, #dc2626)'
                    }}
                  >
                    {result.success && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            `0 0 20px ${result.resultColor}44`,
                            `0 0 40px ${result.resultColor}66`,
                            `0 0 20px ${result.resultColor}44`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                ) : isProcessing && (
                  <motion.div
                    className="absolute bottom-1 left-1 right-1 rounded-full bg-gradient-to-t from-purple-400 to-purple-200"
                    animate={{ height: ['0%', '75%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full" />
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {onHint && (
          <motion.button
            onClick={onHint}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Pista
            </span>
          </motion.button>
        )}
        
        <motion.button
          onClick={onCombine}
          disabled={!canCombine}
          className={`${onHint ? 'flex-1' : 'w-full'} px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
            canCombine
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={canCombine ? { scale: 1.05 } : {}}
          whileTap={canCombine ? { scale: 0.95 } : {}}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Combinando...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              ¡Combinar!
            </span>
          )}
        </motion.button>
      </div>

      {/* Result Display */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mt-6 p-4 rounded-xl border ${
              result.success 
                ? 'bg-green-900/30 border-green-500/50 text-green-100'
                : 'bg-red-900/30 border-red-500/50 text-red-100'
            }`}
          >
            <div className="text-center mb-3">
              <h4 className="font-bold text-lg">
                {result.success ? '¡Combinación Exitosa!' : 'Combinación Incorrecta'}
              </h4>
            </div>
            
            {result.success && (
              <div className="space-y-3 text-sm">
                {result.benefits && (
                  <div className="bg-green-800/30 rounded-lg p-3 border border-green-500/30">
                    <strong className="text-green-200 flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      Sinergia Lograda:
                    </strong>
                    <p className="text-green-100">{result.benefits}</p>
                  </div>
                )}
                {result.foodSources && (
                  <div className="bg-orange-800/30 rounded-lg p-3 border border-orange-500/30">
                    <strong className="text-orange-200 flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full" />
                      Cómo Obtenerlo Naturalmente:
                    </strong>
                    <p className="text-orange-100 leading-relaxed">{result.foodSources}</p>
                    <div className="mt-2 text-xs text-orange-200/80">
                      💡 Tip: Consume estos alimentos juntos para maximizar la absorción
                    </div>
                  </div>
                )}
                {result.success && (
                  <div className="bg-yellow-800/30 rounded-lg p-3 border border-yellow-500/30">
                    <strong className="text-yellow-200 flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      Recomendación Nutricional:
                    </strong>
                    <p className="text-yellow-100 text-xs leading-relaxed">
                      Esta combinación potencia la biodisponibilidad de ambos nutrientes. 
                      Incluye estos alimentos en tu dieta diaria para aprovechar esta sinergia natural.
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
