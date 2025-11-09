import { motion } from 'framer-motion';
import { TestTube as TestTubeType } from '@/shared/types';
import { Info } from 'lucide-react';

interface TestTubeProps {
  tube: TestTubeType;
  onSelect: (tubeId: string) => void;
  onShowInfo: (tube: TestTubeType) => void;
  isDisabled?: boolean;
  fillLevel?: number;
}

export default function TestTube({ tube, onSelect, onShowInfo, isDisabled, fillLevel = 70 }: TestTubeProps) {
  const handleClick = () => {
    if (!isDisabled) {
      onSelect(tube.id);
    }
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowInfo(tube);
  };

  return (
    <motion.div
      className={`relative cursor-pointer transition-all duration-300 ${
        tube.isSelected ? 'scale-110' : 'hover:scale-105'
      } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={!isDisabled ? { y: -5 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      onClick={handleClick}
    >
      {/* Test Tube Container */}
      <div className="w-20 h-40 mx-auto relative">
        {/* Test Tube Rim/Top */}
        <div className="w-16 h-4 mx-auto bg-gradient-to-b from-gray-200 to-gray-400 rounded-t-lg border border-gray-400 relative shadow-sm">
          <div className="absolute inset-1 bg-gradient-to-br from-white/60 to-transparent rounded-t-lg" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-500/50 rounded-full" />
        </div>
        
        {/* Main Glass Tube - Cylindrical */}
        <div className="w-14 h-36 mx-auto bg-gradient-to-br from-white/20 to-gray-100/30 border-2 border-gray-300/60 relative overflow-hidden backdrop-blur-sm shadow-xl">
          
          {/* Glass transparency and shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute left-1 top-0 bottom-0 w-2 bg-white/30 rounded-full" />
          
          {/* Bottom rounded part */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-br from-white/20 to-gray-100/30 rounded-b-full border-l-2 border-r-2 border-b-2 border-gray-300/60"></div>
          
          {/* Liquid content */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 relative overflow-hidden rounded-b-full"
            style={{ height: `${fillLevel}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${fillLevel}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Main liquid with metallic fluorescent effect */}
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, 
                  ${tube.color} 0%, 
                  ${tube.color}DD 30%,
                  ${tube.color}AA 60%,
                  ${tube.color}77 100%)`,
                boxShadow: `
                  inset 0 0 20px ${tube.color}99,
                  0 0 25px ${tube.color}66,
                  0 0 35px ${tube.color}44
                `
              }}
            />
            
            {/* Metallic shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
            <div className="absolute left-1 top-0 bottom-0 w-1.5 bg-white/50 rounded-full" />
            
            {/* Fluorescent glow effect */}
            <motion.div
              className="absolute inset-0 opacity-80"
              style={{
                background: `radial-gradient(ellipse at center, 
                  ${tube.color}77 0%, 
                  ${tube.color}44 40%, 
                  transparent 70%)`
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [0.98, 1.02, 0.98]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Surface meniscus effect */}
            <div className="absolute top-0 left-1 right-1 h-1 bg-white/40 rounded-full opacity-80" />
            
            {/* Bubble animation */}
            <motion.div
              className="absolute top-2 left-1/2 w-1 h-1 bg-white/70 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.7, 0.3, 0.7],
                scale: [1, 0.5, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
        
        {/* Selection glow */}
        {tube.isSelected && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-yellow-400"
            style={{
              boxShadow: '0 0 30px rgba(251, 191, 36, 0.8)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              boxShadow: [
                '0 0 20px rgba(251, 191, 36, 0.6)',
                '0 0 40px rgba(251, 191, 36, 0.9)',
                '0 0 20px rgba(251, 191, 36, 0.6)'
              ]
            }}
            transition={{ 
              duration: 0.3,
              boxShadow: { duration: 2, repeat: Infinity }
            }}
          />
        )}

        {/* Info Button */}
        {!isDisabled && (
          <motion.button
            onClick={handleInfoClick}
            className="absolute -top-2 -right-1 w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all z-10"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Info className="w-3 h-3" />
          </motion.button>
        )}
      </div>
      
      {/* Label - Solo fórmula química */}
      <div className="mt-2 text-center">
        <div className="text-lg font-bold text-gray-800 mb-1 font-mono bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/50 shadow-sm">
          {tube.formula}
        </div>
        <div className="text-xs text-gray-600 font-mono bg-gray-50/80 px-2 py-1 rounded border">
          Compuesto {tube.id.slice(-1)}
        </div>
      </div>
      
      {/* Tooltip */}
      {!isDisabled && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900/95 text-white text-xs px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-all duration-300 pointer-events-none z-20 whitespace-nowrap border border-gray-600 shadow-xl backdrop-blur-sm">
          <div className="font-semibold">Fórmula: {tube.formula}</div>
          <div className="text-gray-300 text-[10px] mt-1">Clic para seleccionar • Info para análisis químico</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </motion.div>
  );
}
