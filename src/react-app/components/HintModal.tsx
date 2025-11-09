import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Lightbulb, ArrowDown, Atom, Microscope } from 'lucide-react';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formula?: string;
  hint?: string;
  showWarning: boolean;
}

export default function HintModal({ isOpen, onClose, onConfirm, formula, hint, showWarning }: HintModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-md w-full border border-white/20"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Pista Química</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {showWarning ? (
            /* Warning View */
            <div className="space-y-4">
              <div className="bg-red-900/30 rounded-xl p-4 border border-red-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                  <h3 className="text-lg font-bold text-red-300">¡Advertencia!</h3>
                </div>
                <div className="space-y-3 text-red-100 text-sm">
                  <p>
                    <strong>Usar una pista te costará un logro completado.</strong>
                  </p>
                  <p>
                    Si has completado episodios anteriores, perderás el progreso de tu episodio más reciente.
                  </p>
                  <div className="bg-red-800/30 rounded-lg p-3 border border-red-600/30 mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowDown className="w-4 h-4 text-red-400" />
                      <span className="text-red-200 font-medium">Penalización:</span>
                    </div>
                    <ul className="text-xs space-y-1 text-red-200/80">
                      <li>• Se marca como incompleto tu último episodio logrado</li>
                      <li>• Tu puntuación se reduce en 500 puntos</li>
                      <li>• Esta acción no se puede deshacer</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-medium"
                >
                  Usar Pista de Todos Modos
                </button>
              </div>

              <p className="text-gray-400 text-xs text-center">
                💡 Intenta resolver sin ayuda primero para conservar tus logros
              </p>
            </div>
          ) : (
            /* Hint View */
            <div className="space-y-4">
              <div className="bg-yellow-900/30 rounded-xl p-4 border border-yellow-500/30">
                <div className="text-center mb-4">
                  <div className="text-2xl font-mono text-yellow-200 mb-2">{formula}</div>
                  <h3 className="text-lg font-bold text-yellow-300">Análisis Molecular</h3>
                </div>
                
                <div className="bg-yellow-800/30 rounded-lg p-3 border border-yellow-600/30 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Atom className="w-4 h-4 text-yellow-200" />
                    <span className="text-yellow-200 font-medium text-sm">Estructura Química:</span>
                  </div>
                  <p className="text-yellow-100 text-sm leading-relaxed">{hint}</p>
                </div>

                <div className="bg-yellow-700/20 rounded-lg p-3 border border-yellow-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Microscope className="w-4 h-4 text-yellow-300" />
                    <span className="text-yellow-300 font-medium text-sm">Análisis Espectroscópico:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-yellow-200">IR: </span>
                      <span className="text-yellow-100">3300-3500 cm⁻¹</span>
                    </div>
                    <div>
                      <span className="text-yellow-200">UV: </span>
                      <span className="text-yellow-100">245-265 nm</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-500/20">
                <h4 className="text-blue-300 font-medium mb-2">🧪 Deducción Química:</h4>
                <p className="text-blue-100 text-sm">
                  Analiza los elementos presentes en la fórmula. Los grupos funcionales como -OH, =O y anillos 
                  aromáticos te darán pistas sobre la identidad del compuesto y su posible pareja sinérgica.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Continuar Investigando
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
