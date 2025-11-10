import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Trophy, Lightbulb, Heart, BookOpen } from 'lucide-react';

interface GameGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GameGuide({ isOpen, onClose }: GameGuideProps) {
  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-400" />
                <h2 className="text-3xl font-bold text-white font-orbitron">Guía del Laboratorio</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Purpose */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-400/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">¿Qué es VitaLab?</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  <strong className="text-white">VitaLab</strong> es un laboratorio virtual donde deberás analizar fórmulas químicas 
                  para identificar vitaminas y minerales. Como un verdadero científico, usarás tu conocimiento de química molecular 
                  para deducir identidades y descubrir sinergias nutricionales poderosas.
                </p>
                <div className="mt-4 bg-black/20 rounded-lg p-4 border border-white/10">
                  <p className="text-blue-200 text-sm">
                    <strong>Desafío Científico:</strong> Desarrollar habilidades de análisis químico molecular para identificar 
                    compuestos por sus fórmulas y descubrir las sinergias bioquímicas que maximizan la biodisponibilidad nutricional.
                  </p>
                </div>
              </motion.div>

              {/* How to Play */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-black/20 rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Play className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">¿Cómo Jugar?</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <div>
                        <h4 className="text-white font-medium">Analiza el Enigma</h4>
                        <p className="text-gray-400 text-sm">Cada episodio presenta compuestos misteriosos que debes identificar y combinar.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                      <div>
                        <h4 className="text-white font-medium">Deduce las Fórmulas</h4>
                        <p className="text-gray-400 text-sm">Analiza las fórmulas químicas (ej: C₆H₈O₆, Fe²⁺) para identificar cada nutriente.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                      <div>
                        <h4 className="text-white font-medium">Combina Sabiamente</h4>
                        <p className="text-gray-400 text-sm">Selecciona exactamente 2 tubos que creas que formarán la sinergia perfecta.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                      <div>
                        <h4 className="text-white font-medium">¡Experimenta!</h4>
                        <p className="text-gray-400 text-sm">Presiona "¡Combinar!" y observa el resultado de tu experimento químico.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                      <div>
                        <h4 className="text-white font-medium">Aprende y Avanza</h4>
                        <p className="text-gray-400 text-sm">Descubre los beneficios de la combinación exitosa y pasa al siguiente episodio.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Scoring System */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-black/20 rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Sistema de Puntuación</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <div className="text-2xl font-bold text-green-400 mb-2">1000</div>
                    <div className="text-white font-medium mb-1">Puntuación Base</div>
                    <div className="text-green-200 text-xs">Por combinación exitosa</div>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <div className="text-2xl font-bold text-blue-400 mb-2">-100</div>
                    <div className="text-white font-medium mb-1">Por Intento Extra</div>
                    <div className="text-blue-200 text-xs">Después del primer intento</div>
                  </div>
                  
                  <div className="text-center p-4 bg-orange-900/20 rounded-lg border border-orange-500/30">
                    <div className="text-2xl font-bold text-orange-400 mb-2">-2</div>
                    <div className="text-white font-medium mb-1">Por Segundo Extra</div>
                    <div className="text-orange-200 text-xs">Después de 30 segundos</div>
                  </div>
                </div>
              </motion.div>

              {/* Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black/20 rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Consejos del Laboratorio</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        <strong className="text-white">Lee el objetivo:</strong> Siempre revisa qué combinación se busca antes de experimentar.
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        <strong className="text-white">Estudia las propiedades:</strong> Haz clic en los tubos para entender cada nutriente.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        <strong className="text-white">Piensa en sinergia:</strong> Busca nutrientes que se complementen entre sí.
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">
                        <strong className="text-white">Velocidad importa:</strong> Resuelve rápido para obtener más puntos.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Ideal Combinations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-xl p-6 border border-green-400/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Sinergias Nutricionales Clave</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  En <strong className="text-white">Vital-lab</strong>, descubrirás que muchos nutrientes trabajan mejor en equipo. 
                  Estas "sinergias" potencian sus efectos en el cuerpo, mejorando la absorción, la utilización o protegiéndose mutuamente.
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
                  <li>
                    <strong className="text-white">Vitamina C + Hierro:</strong> La Vitamina C transforma el hierro no hemo (vegetal) en una forma más fácil de absorber, multiplicando su biodisponibilidad.
                    <p className="text-gray-400 text-sm italic ml-4">¿Cuándo? Consume alimentos ricos en hierro vegetal (lentejas, espinacas) junto con fuentes de Vitamina C (cítricos, pimientos).</p>
                  </li>
                  <li>
                    <strong className="text-white">Vitamina D + Calcio:</strong> La Vitamina D es indispensable para que el calcio se absorba correctamente en el intestino y se fije en los huesos.
                    <p className="text-gray-400 text-sm italic ml-4">¿Cuándo? Asegura una exposición solar adecuada o suplementos de Vitamina D al consumir lácteos o vegetales ricos en calcio.</p>
                  </li>
                  <li>
                    <strong className="text-white">Vitamina E + Vitamina C:</strong> La Vitamina C ayuda a regenerar la Vitamina E oxidada, permitiéndole seguir actuando como un potente antioxidante.
                    <p className="text-gray-400 text-sm italic ml-4">¿Cuándo? Combina frutos secos y aceites vegetales (Vitamina E) con frutas y verduras frescas (Vitamina C).</p>
                  </li>
                  <li>
                    <strong className="text-white">Magnesio + Vitamina B1 (Tiamina):</strong> El magnesio es un cofactor esencial para que la Vitamina B1 cumpla su rol en el metabolismo energético.
                    <p className="text-gray-400 text-sm italic ml-4">¿Cuándo? Incluye cereales integrales (B1) y verduras de hoja verde o frutos secos (Magnesio) en tu dieta.</p>
                  </li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  <strong className="text-white">¿Por qué es importante?</strong> Conocer estas combinaciones te permite optimizar tu nutrición, 
                  asegurando que tu cuerpo aproveche al máximo los nutrientes que consumes y previniendo deficiencias.
                </p>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center pt-4"
              >
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  ¡Comenzar Experimentos!
                </button>
                <p className="text-gray-400 text-sm mt-2">
                  Descubre el fascinante mundo de las sinergias nutricionales
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
