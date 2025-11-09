import { motion, AnimatePresence } from 'framer-motion';
import { X, Atom, Beaker, Apple, Heart } from 'lucide-react';
import { TestTube as TestTubeType } from '@/shared/types';

interface ChemicalInfoModalProps {
  tube: TestTubeType | null;
  isOpen: boolean;
  onClose: () => void;
}

const chemicalInfo = {
  'Vitamina C': {
    fullName: 'Ácido Ascórbico',
    description: 'Vitamina hidrosoluble esencial para la síntesis de colágeno y función inmunológica.',
    functions: ['Antioxidante', 'Síntesis de colágeno', 'Absorción de hierro', 'Función inmune'],
    foodSources: ['Cítricos', 'Kiwi', 'Fresas', 'Pimientos', 'Brócoli'],
    deficiencySymptoms: 'Escorbuto, sangrado de encías, cicatrización lenta',
    dailyNeeds: '90mg (hombres), 75mg (mujeres)'
  },
  'Hierro': {
    fullName: 'Hierro',
    description: 'Mineral esencial para el transporte de oxígeno y producción de energía.',
    functions: ['Transporte de oxígeno', 'Metabolismo energético', 'Función cognitiva', 'Sistema inmune'],
    foodSources: ['Carnes rojas', 'Espinacas', 'Lentejas', 'Quinoa', 'Chocolate negro'],
    deficiencySymptoms: 'Anemia, fatiga, palidez, debilidad',
    dailyNeeds: '8mg (hombres), 18mg (mujeres)'
  },
  'Vitamina D': {
    fullName: 'Colecalciferol',
    description: 'Vitamina liposoluble crucial para la salud ósea y función inmunológica.',
    functions: ['Absorción de calcio', 'Salud ósea', 'Función inmune', 'Regulación hormonal'],
    foodSources: ['Pescados grasos', 'Yema de huevo', 'Lácteos fortificados', 'Exposición solar'],
    deficiencySymptoms: 'Raquitismo, osteomalacia, debilidad muscular',
    dailyNeeds: '600-800 UI diarias'
  },
  'Calcio': {
    fullName: 'Calcio',
    description: 'Mineral más abundante en el cuerpo, esencial para huesos y dientes.',
    functions: ['Salud ósea y dental', 'Contracción muscular', 'Coagulación', 'Transmisión nerviosa'],
    foodSources: ['Lácteos', 'Verduras de hoja verde', 'Almendras', 'Sardinas', 'Tofu'],
    deficiencySymptoms: 'Osteoporosis, calambres musculares, hormigueo',
    dailyNeeds: '1000-1200mg diarios'
  },
  'Vitamina B1': {
    fullName: 'Tiamina',
    description: 'Vitamina del complejo B esencial para el metabolismo energético.',
    functions: ['Metabolismo de carbohidratos', 'Función nerviosa', 'Crecimiento', 'Desarrollo muscular'],
    foodSources: ['Cereales integrales', 'Legumbres', 'Nueces', 'Carne de cerdo', 'Semillas'],
    deficiencySymptoms: 'Beriberi, fatiga, confusión, debilidad muscular',
    dailyNeeds: '1.2mg (hombres), 1.1mg (mujeres)'
  },
  'Vitamina B3': {
    fullName: 'Niacina',
    description: 'Vitamina del complejo B importante para el metabolismo y salud cardiovascular.',
    functions: ['Metabolismo energético', 'Síntesis de hormonas', 'Reparación de ADN', 'Salud cardiovascular'],
    foodSources: ['Pescado', 'Pollo', 'Cacahuetes', 'Setas', 'Cereales integrales'],
    deficiencySymptoms: 'Pelagra, dermatitis, diarrea, demencia',
    dailyNeeds: '16mg (hombres), 14mg (mujeres)'
  },
  'Vitamina E': {
    fullName: 'Tocoferol',
    description: 'Vitamina liposoluble con potentes propiedades antioxidantes.',
    functions: ['Antioxidante', 'Protección celular', 'Salud cardiovascular', 'Función inmune'],
    foodSources: ['Aceites vegetales', 'Frutos secos', 'Semillas', 'Aguacate', 'Espinacas'],
    deficiencySymptoms: 'Debilidad muscular, problemas de visión, neuropatía',
    dailyNeeds: '15mg diarios'
  },
  'Magnesio': {
    fullName: 'Magnesio',
    description: 'Mineral cofactor en más de 300 reacciones enzimáticas del cuerpo.',
    functions: ['Función muscular', 'Síntesis proteica', 'Control glucémico', 'Salud cardiovascular'],
    foodSources: ['Verduras de hoja verde', 'Frutos secos', 'Semillas', 'Cereales integrales', 'Chocolate negro'],
    deficiencySymptoms: 'Calambres musculares, fatiga, arritmias, irritabilidad',
    dailyNeeds: '400-420mg (hombres), 310-320mg (mujeres)'
  },
  'Vitamina B6': {
    fullName: 'Piridoxina',
    description: 'Vitamina del complejo B crucial para el metabolismo de proteínas.',
    functions: ['Metabolismo de aminoácidos', 'Síntesis de neurotransmisores', 'Función inmune', 'Formación de glóbulos rojos'],
    foodSources: ['Pollo', 'Pescado', 'Plátanos', 'Patatas', 'Garbanzos'],
    deficiencySymptoms: 'Anemia, dermatitis, confusión, depresión',
    dailyNeeds: '1.3-1.7mg diarios'
  },
  'Biotina': {
    fullName: 'Vitamina B7',
    description: 'Vitamina del complejo B esencial para el metabolismo de macronutrientes.',
    functions: ['Metabolismo de grasas', 'Metabolismo de carbohidratos', 'Síntesis de ácidos grasos', 'Expresión génica'],
    foodSources: ['Yema de huevo', 'Hígado', 'Nueces', 'Semillas', 'Aguacate'],
    deficiencySymptoms: 'Dermatitis, pérdida de cabello, fatiga, depresión',
    dailyNeeds: '30mcg diarios'
  },
  'Vitamina B2': {
    fullName: 'Riboflavina',
    description: 'Vitamina del complejo B importante para la producción de energía.',
    functions: ['Metabolismo energético', 'Antioxidante', 'Función celular', 'Crecimiento y desarrollo'],
    foodSources: ['Lácteos', 'Huevos', 'Verduras de hoja verde', 'Carnes magras', 'Cereales integrales'],
    deficiencySymptoms: 'Dermatitis, grietas en los labios, sensibilidad a la luz',
    dailyNeeds: '1.3mg (hombres), 1.1mg (mujeres)'
  }
};

export default function ChemicalInfoModal({ tube, isOpen, onClose }: ChemicalInfoModalProps) {
  if (!tube || !isOpen) return null;

  const info = chemicalInfo[tube.name as keyof typeof chemicalInfo];

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
                {info && <p className="text-gray-300">{info.fullName}</p>}
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {info && (
            <div className="space-y-6">
              {/* Description */}
              <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Atom className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">¿Qué es?</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{info.description}</p>
              </div>

              {/* Functions */}
              <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Beaker className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Funciones Principales</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {info.functions.map((func, index) => (
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
                  {info.foodSources.map((source, index) => (
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
                  <p className="text-gray-300 text-sm">{info.dailyNeeds}</p>
                </div>

                <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">Síntomas de Deficiencia</h3>
                  <p className="text-gray-300 text-sm">{info.deficiencySymptoms}</p>
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
