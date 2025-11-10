import { motion, AnimatePresence } from 'framer-motion';
import { X, Atom, Beaker, Apple, Heart } from 'lucide-react';
import { TestTube as TestTubeType } from '@/shared/types';
import { chemicalProperties, ChemicalProperty } from '@/react-app/data/puzzleMechanics'; // Importar chemicalProperties

interface ChemicalInfoModalProps {
  tube: TestTubeType | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChemicalInfoModal({ tube, isOpen, onClose }: ChemicalInfoModalProps) {
  if (!tube || !isOpen) return null;

  // Usar tube.formula para obtener la información de chemicalProperties
  const info: ChemicalProperty | undefined = chemicalProperties[tube.formula];

  // Mapear los campos de ChemicalProperty a los que usa el modal
  const mappedInfo = info ? {
    fullName: tube.name, // Usar el nombre del tubo como nombre completo
    description: `Peso molecular: ${info.molecular_weight} g/mol. Solubilidad: ${info.solubility}. Estado a temperatura ambiente: ${info.state_at_room_temp}.`,
    functions: [`Rol biológico: ${info.biological_role}`],
    foodSources: info.food_sources || [], // Ahora disponible
    deficiencySymptoms: info.deficiency_symptoms,
    dailyNeeds: info.daily_requirement || 'No especificado'
  } : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-24 rounded-full border-2 border-gray-300/60 relative overflow-hidden"
                style={{ background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.2))' }}
              >
                <div 
                  className="absolute bottom-1 left-1 right-1 rounded-full h-16"
                  style={{ 
                    background: `linear-gradient(to top, ${tube.color}, ${tube.color}dd)` 
                  }}
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white font-orbitron">{tube.name}</h2>
                <p className="text-blue-300 text-lg font-mono">{tube.formula}</p>
                {mappedInfo && <p className="text-gray-300">{mappedInfo.fullName}</p>}
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {mappedInfo && (
            <div className="space-y-6">
              {/* Description */}
              <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Atom className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">¿Qué es?</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{mappedInfo.description}</p>
              </div>

              {/* Functions */}
              <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Beaker className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Funciones Principales</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {mappedInfo.functions.map((func, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-gray-300 text-sm">{func}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Food Sources */}
              <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Apple className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">Fuentes Alimentarias</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mappedInfo.foodSources.map((source, index) => (
                    <span 
                      key={index} 
                      className="bg-yellow-500/20 text-yellow-200 px-3 py-1 rounded-full text-sm border border-yellow-400/30"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              {/* Health Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-semibold text-white">Necesidades Diarias</h3>
                  </div>
                  <p className="text-gray-300 text-sm">{mappedInfo.dailyNeeds}</p>
                </div>

                <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">Síntomas de Deficiencia</h3>
                  <p className="text-gray-300 text-sm">{mappedInfo.deficiencySymptoms}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Entendido
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
