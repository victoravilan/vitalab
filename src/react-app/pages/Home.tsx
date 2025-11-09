import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, BookOpen, Beaker, Atom, Sparkles, HelpCircle } from 'lucide-react';
import Game from './Game';
import GameGuide from '@/react-app/components/GameGuide';
import { getEducationalNote } from '@/react-app/data/educationalNotes';

interface LevelProgress {
  level: number;
  completedEpisodes: number;
  totalEpisodes: number;
  bestScore: number;
}

export default function Home() {
  const [currentView, setCurrentView] = useState<'menu' | 'game'>('menu');
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [progress, setProgress] = useState<LevelProgress[]>([]);
  const [showGameGuide, setShowGameGuide] = useState(false);
  const [currentEducationalNote, setCurrentEducationalNote] = useState('');

  useEffect(() => {
    loadProgress();
    updateEducationalNote();
  }, []);

  useEffect(() => {
    updateEducationalNote();
  }, [selectedLevel, selectedEpisode]);

  const updateEducationalNote = () => {
    // Find the most advanced episode the player has reached
    const maxProgress = progress.reduce((max, p) => {
      const totalEpisodes = (p.level - 1) * 7 + p.completedEpisodes;
      return totalEpisodes > max ? totalEpisodes : max;
    }, 0);
    
    // If no progress, show note for level 1 episode 1
    const noteLevel = Math.max(1, Math.ceil((maxProgress + 1) / 7));
    const noteEpisode = Math.max(1, ((maxProgress) % 7) + 1);
    
    setCurrentEducationalNote(getEducationalNote(noteLevel, noteEpisode));
  };

  const loadProgress = () => {
    // Initialize progress for 16 levels
    const initialProgress: LevelProgress[] = Array.from({ length: 16 }, (_, i) => ({
      level: i + 1,
      completedEpisodes: 0,
      totalEpisodes: 7,
      bestScore: 0
    }));
    
    setProgress(initialProgress);
  };

  const handleGameComplete = (score: number) => {
    // Update progress
    setProgress(prev => prev.map(p => {
      if (p.level === selectedLevel) {
        return {
          ...p,
          completedEpisodes: Math.max(p.completedEpisodes, selectedEpisode),
          bestScore: Math.max(p.bestScore, score)
        };
      }
      return p;
    }));

    // Update educational note based on new progress
    setTimeout(() => {
      updateEducationalNote();
    }, 100);

    // Go to next episode or back to menu after a delay
    setTimeout(() => {
      if (selectedEpisode < 7) {
        setSelectedEpisode(prev => prev + 1);
      } else if (selectedLevel < 16) {
        setSelectedLevel(prev => prev + 1);
        setSelectedEpisode(1);
      } else {
        setCurrentView('menu');
      }
    }, 500);
  };

  const startGame = (level: number, episode: number) => {
    setSelectedLevel(level);
    setSelectedEpisode(episode);
    setCurrentView('game');
  };

  if (currentView === 'game') {
    return (
      <Game
        level={selectedLevel}
        episode={selectedEpisode}
        onBack={() => setCurrentView('menu')}
        onComplete={handleGameComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-12 pb-8"
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Atom className="w-16 h-16 text-blue-400" />
            </motion.div>
            
            <button
              onClick={() => setShowGameGuide(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30 text-blue-300 hover:text-white hover:border-blue-400 transition-all"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm font-medium">¿Cómo jugar?</span>
            </button>
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-4 font-orbitron bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            VitaLab
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Descubre las combinaciones químicas de vitaminas y minerales en este emocionante laboratorio virtual
          </p>
        </motion.div>

        {/* Game Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto px-6 mb-8"
        >
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Beaker className="w-8 h-8 text-blue-400 mb-2" />
                <div className="text-2xl font-bold text-white">{progress.reduce((sum, p) => sum + p.completedEpisodes, 0)}</div>
                <div className="text-gray-400 text-sm">Episodios Completados</div>
              </div>
              <div className="flex flex-col items-center">
                <Trophy className="w-8 h-8 text-yellow-400 mb-2" />
                <div className="text-2xl font-bold text-white">{Math.max(...progress.map(p => p.bestScore), 0)}</div>
                <div className="text-gray-400 text-sm">Mejor Puntuación</div>
              </div>
              <div className="flex flex-col items-center">
                <Sparkles className="w-8 h-8 text-purple-400 mb-2" />
                <div className="text-2xl font-bold text-white">{progress.filter(p => p.completedEpisodes === 7).length}</div>
                <div className="text-gray-400 text-sm">Niveles Completados</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Level Selection */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto px-6 pb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8 font-orbitron">
            Selecciona tu Nivel
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {progress.map((levelData) => (
              <motion.div
                key={levelData.level}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div
                  className={`aspect-square rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                    levelData.completedEpisodes > 0
                      ? 'bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-400/50 hover:border-green-400'
                      : 'bg-gradient-to-br from-gray-800/40 to-gray-900/60 border-gray-600/50 hover:border-blue-400/50'
                  }`}
                  onClick={() => startGame(levelData.level, 1)}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <div className="text-lg font-bold text-white mb-1">
                      {levelData.level}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${(levelData.completedEpisodes / levelData.totalEpisodes) * 100}%`
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-300">
                      {levelData.completedEpisodes}/{levelData.totalEpisodes}
                    </div>
                  </div>
                </div>
                
                {/* Completion Badge */}
                {levelData.completedEpisodes === 7 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                  >
                    <Trophy className="w-4 h-4 text-yellow-900" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Quick Start Button */}
          <div className="text-center mt-12">
            <motion.button
              onClick={() => startGame(1, 1)}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <Play className="w-6 h-6" />
              Comenzar Aventura
            </motion.button>
          </div>
        </motion.div>

        {/* Educational Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-4xl mx-auto px-6 pb-8"
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/20">
            <div className="flex items-start gap-4">
              <BookOpen className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">¿Sabías que...?</h3>
                <motion.p 
                  key={currentEducationalNote}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-300 leading-relaxed"
                >
                  {currentEducationalNote || 'Las vitaminas y minerales trabajan en equipo en tu cuerpo. Algunas combinaciones potencian sus efectos beneficiosos, mientras que otras pueden interferir entre sí. ¡Descubre estas fascinantes interacciones químicas jugando!'}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10 py-4 mt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-400 text-sm">
            Creado por Victor M.F. Avilan - Valor Agregado. Todos los derechos reservados
          </p>
        </div>
      </footer>

      {/* Game Guide Modal */}
      <GameGuide
        isOpen={showGameGuide}
        onClose={() => setShowGameGuide(false)}
      />
    </div>
  );
}
