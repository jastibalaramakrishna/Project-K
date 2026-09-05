import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from '../stores/uiStore';
import { Sparkles, ChevronRight, Activity } from 'lucide-react';

export default function CinematicIntro() {
  const [step, setStep] = useState(0);
  const showIntro = useUiStore((s) => s.showIntro);
  const setShowIntro = useUiStore((s) => s.setShowIntro);

  const handleDismiss = () => {
    setShowIntro(false);
  };

  useEffect(() => {
    if (!showIntro) return;

    const t1 = setTimeout(() => setStep(1), 2200);
    const t2 = setTimeout(() => setStep(2), 4400);
    const t3 = setTimeout(() => setStep(3), 6600);
    const t4 = setTimeout(() => handleDismiss(), 7600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [showIntro]);

  if (!showIntro) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 bg-[#050811] flex flex-col items-center justify-center text-white overflow-hidden select-none"
      >
        {/* Background Subtle Radial Glow & Grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Ambient Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-10 flex items-center gap-2.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-amber-500 tracking-widest"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>OIL INDIA LIMITED · SIH 2026</span>
        </motion.div>

        {/* Cinematic Step Transitions */}
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <AnimatePresence mode="wait">
            {/* Step 0: Baghewala Field */}
            {step === 0 && (
              <motion.div
                key="intro-step-0"
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.06, y: -15 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="space-y-3"
              >
                <div className="text-xs sm:text-sm font-mono tracking-[0.3em] text-slate-400 uppercase">
                  HEAVY OIL RESERVOIR ASSET
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[0.15em] text-slate-100 uppercase">
                  BAGHEWALA FIELD
                </h1>
                <p className="text-xs sm:text-sm font-mono text-amber-500/90 tracking-wider">
                  RAJASTHAN BASIN · HIGH VISCOSITY BITUMEN
                </p>
              </motion.div>
            )}

            {/* Step 1: Digital Twin */}
            {step === 1 && (
              <motion.div
                key="intro-step-1"
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.06, y: -15 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="space-y-3"
              >
                <div className="text-xs sm:text-sm font-mono tracking-[0.3em] text-amber-400 uppercase">
                  SMART AUTOMATION PLATFORM
                </div>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300 uppercase">
                  DIGITAL TWIN
                </h1>
                <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-wider">
                  PHYSICS MODELLING · REAL-TIME KINEMATICS · SIMULATION
                </p>
              </motion.div>
            )}

            {/* Step 2: Well to Surface Optimization */}
            {step === 2 && (
              <motion.div
                key="intro-step-2"
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.06, y: -15 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="space-y-3"
              >
                <div className="text-xs sm:text-sm font-mono tracking-[0.3em] text-cyan-400 uppercase">
                  CSS & SRP INTEGRATED OPERATIONS
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-[0.1em] text-slate-100 uppercase">
                  WELL-TO-SURFACE <br /> OPTIMIZATION
                </h1>
                <p className="text-xs sm:text-sm font-mono text-emerald-400 tracking-wider">
                  THERMAL STIMULATION + MECHANICAL LIFTING
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Cinematic Progress Bar & Skip Button */}
        <div className="absolute bottom-10 inset-x-8 sm:inset-x-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
            <span>INITIALIZING 3D ENGINE...</span>
          </div>

          <button
            onClick={handleDismiss}
            className="group px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-amber-400 text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5"
          >
            <span>SKIP INTRO</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
