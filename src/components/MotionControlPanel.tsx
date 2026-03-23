import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useMotion } from "./MotionProvider";
import { Settings2, Play, Pause, FastForward, Activity, X, ChevronRight } from "lucide-react";

export default function MotionControlPanel() {
  const { speed, setSpeed, intensity, setIntensity, isPaused, setIsPaused } = useMotion();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <m.div
            role="dialog"
            aria-label="Motion Settings"
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="glass-shinkai p-8 w-80 dark:bg-black/80 dark:border-white/10 dark:backdrop-blur-3xl overflow-hidden relative shadow-[0_30px_100px_rgba(0,0,0,0.3)]"
          >
            {/* Decorative Background Glow */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <Settings2 size={18} className="text-blue-500" />
                <h3 className="text-xs font-black tracking-[0.3em] uppercase text-blue-600 dark:text-white/80">Motion Engine</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close motion settings"
                title="Close"
                className="p-2 hover:bg-white/10 rounded-full transition-colors dark:text-white/40 dark:hover:text-white"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-10 relative z-10">
              {/* Play / Pause Toggle */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest">Temporal Flow</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsPaused(!isPaused)}
                    aria-label={isPaused ? "Resume animations" : "Pause animations"}
                    title={isPaused ? "Resume" : "Pause"}
                    className={`flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl transition-all font-black text-xs tracking-widest uppercase border ${
                      isPaused 
                        ? "bg-blue-500 text-white border-blue-400" 
                        : "bg-transparent text-blue-500 border-blue-500/20 hover:border-blue-500/50 dark:text-white dark:border-white/10 dark:hover:bg-white/5"
                    }`}
                  >
                    {isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
                    {isPaused ? "Resume" : "Suspend"}
                  </button>
                </div>
              </div>

              {/* Speed Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest">
                  <span>Flow Speed</span>
                  <span className="text-blue-500 tabular-nums">{speed.toFixed(1)}x</span>
                </div>
                <div className="relative group/slider">
                  <input
                    type="range"
                    min="0.1"
                    max="4"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-blue-100 dark:bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-500 group-hover/slider:h-2 transition-all"
                  />
                  <div className="flex justify-between mt-2 opacity-30 text-[8px] font-black uppercase tracking-tighter dark:text-white">
                    <span>Largo</span>
                    <span>Allegro</span>
                  </div>
                </div>
              </div>

              {/* Intensity Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest">
                  <span>Reality Distortion</span>
                  <span className="text-blue-500 tabular-nums">{Math.round(intensity * 100)}%</span>
                </div>
                <div className="relative group/slider">
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={intensity}
                    onChange={(e) => setIntensity(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-blue-100 dark:bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-500 group-hover/slider:h-2 transition-all"
                  />
                  <div className="flex justify-between mt-2 opacity-30 text-[8px] font-black uppercase tracking-tighter dark:text-white">
                    <span>Subtle</span>
                    <span>Surreal</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-100/50 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Activity size={12} className="text-blue-500 animate-pulse" />
                   <span className="text-[9px] font-black uppercase text-slate-500 dark:text-white/30 tracking-widest">B-Sync Active</span>
                </div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <m.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close motion settings panel" : "Open motion settings panel"}
        title={isOpen ? "Close Settings" : "Motion Settings"}
        className="group relative flex items-center justify-center w-20 h-20 rounded-[2rem] glass-shinkai bg-blue-600 dark:bg-blue-600 text-white shadow-[0_20px_50px_rgba(37,99,235,0.4)] overflow-hidden transition-all duration-500"
      >
        <m.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="relative z-10"
        >
          {isOpen ? <X size={28} /> : <Settings2 size={28} />}
        </m.div>
        
        {/* Animated Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -inset-2 bg-white/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
      </m.button>
    </div>
  );
}
